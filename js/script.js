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
        console.log("Category is:", name);
        const categoryDiv = document.createElement("div");

        categoryDiv.innerHTML = `
            <div
                onclick="loadPetsByCategory('${name}')"
                class="cursor-pointer py-3 px-5 border flex w-full justify-center items-center lg:w-max rounded-lg text-2xl lg:text-3xl font-bold gap-3"
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
};

loadPets();

const displayPets = (pets) => {
    let container = document.getElementById("pets-container");
    container.innerHTML = "";

    for (pet of pets) {
        let name = pet.pet_name;

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
