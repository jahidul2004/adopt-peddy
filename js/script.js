const loadCategories = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/peddy/categories"
    );
    let data = await res.json();
    let categories = data.categories;
    displayCategories(categories);
};

loadCategories();

const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById("category-container");

    for (category of categories) {
        let icon = category.category_icon;
        let name = category.category;
        const categoryDiv = document.createElement("div");

        categoryDiv.innerHTML = `
            <div
                id="${name}"
                onclick="loadPetsByCategory('${name}');activeCategory('${name}');"
                class="category-btn cursor-pointer py-3 px-5 border flex w-full justify-center items-center lg:w-max text-2xl lg:text-3xl font-bold gap-3"
            >
                <img src="${icon}">
                <h1>${name}</h1>
            </div>
        `;
        categoriesContainer.appendChild(categoryDiv);
    }
};

const loadPets = async () => {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/peddy/pets`
    );
    let data = await res.json();
    let pets = data.pets;
    displayPets(pets);
    sort(pets);
};

loadPets();

const displayPets = (pets) => {
    let container = document.getElementById("pets-container");
    container.innerHTML = "";

    if (pets.length == 0) {
        container.innerHTML = `
            <div class="col-span-1 md:col-span-3 gap-3 lg:col-span-3 text-center flex flex-col items-center justify-center">
                <img src="images/error.webp">
                <h1 class="text-3xl font-bold">No Information Available</h1>
                <p class="text-semi-black font-semibold">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
                its layout. The point of using Lorem Ipsum is that it has a.</p>
            </div>
        `;
    }

    for (pet of pets) {
        let name = pet.pet_name;
        let id = pet.petId;

        let breed = pet.breed;
        if (breed == null || breed == undefined) {
            breed = "Breed not Found";
        }

        let image = pet.image;

        let price = pet.price;
        if (price == null || price == undefined) {
            price = "Price not Found";
        }

        let gender = pet.gender;

        let dob = pet.date_of_birth;
        if (dob == null || dob == undefined) {
            dob = "DOB not Found";
        }

        const petDiv = document.createElement("div");
        petDiv.innerHTML = `
            
            <div class="border p-3 rounded-lg">
                <!-- Image -->
                <div>
                    <img
                        class="w-full h-[150px] rounded-lg"
                        src="${image}"
                        alt=""
                    />
                </div>
                <!-- Image end -->

                <!-- Info -->
                <div
                    class="border-b-2 py-3 text-semi-black font-semibold"
                >
                    <h1 class="text-xl text-black font-bold my-2">
                        ${name}
                    </h1>
                    <p>
                        <i class="fa-solid fa-border-all"></i>
                        Breed:${breed}
                    </p>
                    <p>
                        <i class="fa-regular fa-calendar"></i>
                        Birth:${dob}
                    </p>
                    <p>
                        <i class="fa-solid fa-mercury"></i>
                        Gender:${gender}
                    </p>
                    <p>
                        <i class="fa-solid fa-dollar-sign"></i>
                        Price:${price}$
                    </p>
                </div>
                <!-- Info end -->

                <!-- Navigate are -->
                <div class="my-3 flex justify-between">
                    <div
                        onclick="likedPets('${image}')"
                        class="text-xl border w-max py-2 px-4 rounded-lg cursor-pointer"
                    >
                        <i class="fa-regular fa-thumbs-up"></i>
                    </div>
                    <div
                        class="text-xl w-max rounded-lg cursor-pointer"
                    >
                        <button
                            class="btn border text-[#0d7a81] border-[#0d7a81]"
                        >
                            Adopt
                        </button>
                    </div>
                    <div
                        class="text-xl w-max rounded-lg cursor-pointer"
                    >
                        <button
                            onclick="loadDetails(${id})"
                            class="btn border text-[#0d7a81] border-[#0d7a81]"
                        >
                            Details
                        </button>
                    </div>
                </div>
                <!-- Navigate are end -->
            </div>
            <!-- Pet card end -->
        `;
        container.appendChild(petDiv);
    }
};

const loadPetsByCategory = async (category) => {
    let res = await fetch(
        `https://openapi.programming-hero.com/api/peddy/category/${category}`
    );
    let data = await res.json();
    let pets = data.data;
    displayPets(pets);
};

const likedPets = (image) => {
    let container = document.getElementById("liked-pets-container");
    let liked = document.createElement("div");
    liked.innerHTML = `
        <div class="h-max">
            <img
                class="w-full rounded-lg"
                src="${image}"
                alt=""
            />
        </div>
    `;
    container.appendChild(liked);
};

const activeCategory = (id) => {
    let categoryBtns = document.getElementsByClassName("category-btn");

    for (let i = 0; i < categoryBtns.length; i++) {
        categoryBtns[i].classList.remove("bg-semi-primary");
        categoryBtns[i].classList.remove("rounded-full");
        categoryBtns[i].classList.remove("border-2");
        categoryBtns[i].classList.remove("border-[#0d7a81]");
    }

    let active = document.getElementById(id);
    active.classList.remove("rounded-lg");
    active.classList.add(
        "bg-semi-primary",
        "border-2",
        "rounded-full",
        "border-[#0d7a81]"
    );
};

let sortedPets = [];
const sort = (pets) => {
    pets.sort((a, b) => {
        if (a.price === null) return 1;
        if (b.price === null) return -1;
        return a.price - b.price;
    });
    sortedPets = pets;
};

const sortPets = () => {
    displayPets(sortedPets);
};

const loadDetails = async (id) => {
    let res = await fetch(
        `https://openapi.programming-hero.com/api/peddy/pet/${id}`
    );
    let data = await res.json();
    showDetails(data);
};

const showDetails = (pet) => {
    let name = pet.petData.pet_name;
    let breed = pet.petData.breed;
    let dob = pet.petData.date_of_birth;

    let gender = pet.petData.gender;
    let image = pet.petData.image;
    let pet_details = pet.petData.pet_details;
    let price = pet.petData.price;
    let vaccinated_status = pet.petData.vaccinated_status;

    let container = document.getElementById("modal-main");

    let data = document.createElement("div");
    data.innerHTML = `
        <div>
            <img class="rounded-lg w-full h-[250px]" src="${image}" alt="" />
        </div>
        <h1 class="text-xl text-black font-bold my-2">
            ${name}
        </h1>
        <div class="grid grid-cols-2 my-2">
            <p>
                <i class="fa-solid fa-border-all"></i>
                Breed:${breed}
            </p>
            <p>
                <i class="fa-regular fa-calendar"></i>
                Birth:${dob}
            </p>
            <p>
                <i class="fa-solid fa-mercury"></i>
                Gender:${gender}
            </p>
            <p>
                <i class="fa-solid fa-dollar-sign"></i>
                Price:${price}$
            </p>
            <p>
                <i class="fa-solid fa-virus"></i>
                Vaccination Status:${vaccinated_status}
            </p>
        </div>
        <div>
            <h1 class="text-xl font-bold">Details Description</h1>
            <p class="text-semi-black font-semibold">${pet_details}</p>
        </div>
    `;
    container.innerHTML = "";
    container.appendChild(data);
    my_modal_1.showModal();
};
