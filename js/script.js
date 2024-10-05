const loadCategories = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/peddy/categories"
    );
    let data = await res.json();
    let categories = data.categories;
    console.log(categories);
    displayCategories(categories);
};

loadCategories();

const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById("category-container");

    for (category of categories) {
        let icon = category.category_icon;
        let name = category.category;
        const categoryDiv = document.createElement("div");
        console.log(icon);
        console.log(name);

        categoryDiv.innerHTML = `
            <div
                class="py-3 px-5 border flex w-full justify-center items-center lg:w-max rounded-lg text-2xl lg:text-3xl font-bold gap-3"
            >
                <img src="${icon}">
                <h1>${name}</h1>
            </div>
        `;
        categoriesContainer.appendChild(categoryDiv);
    }
};
