let categoryList = document.getElementById("categoryList");

let mealCard = document.getElementById("meal-card");

let mealTitle = document.querySelector(".mealTitle");

let mealDes = document.getElementById("mealDes");


// ======================================
// GET CATEGORY FROM URL
// ======================================

const urlParams = new URLSearchParams(window.location.search);

const categoryName = urlParams.get("category");

console.log("Category:", categoryName);


// ======================================
// LOAD ALL CATEGORIES
// ======================================

fetch("https://www.themealdb.com/api/json/v1/1/categories.php")

    .then((res) => res.json())

    .then((data) => {

        console.log("Categories:", data);


        // ======================================
        // CREATE HAMBURGER MENU
        // ======================================

        categoryList.innerHTML = "";

        data.categories.forEach((category) => {

            categoryList.innerHTML += `

                <a
                    href="second.html?category=${encodeURIComponent(category.strCategory)}"
                    class="menu-category"
                >
                    ${category.strCategory}
                </a>

            `;

        });


        // ======================================
        // FIND SELECTED CATEGORY
        // ======================================

        const selectedCategory = data.categories.find(
            (category) =>
                category.strCategory === categoryName
        );


        // ======================================
        // SHOW CATEGORY DESCRIPTION
        // ======================================

        if (selectedCategory) {

            mealDes.innerHTML = `

                <div class="category-description">

                    <h2>
                        ${selectedCategory.strCategory}
                    </h2>

                    <p>
                        ${selectedCategory.strCategoryDescription}
                    </p>

                </div>

            `;

        } else {

            mealDes.innerHTML = `
                <div class="category-description">
                    <h2>Category not found</h2>
                </div>
            `;

        }

    })

    .catch((error) => {

        console.log(error);

        mealDes.innerHTML = `
            <h2>Failed to load category</h2>
        `;

    });


// ======================================
// GET MEALS FOR SELECTED CATEGORY
// ======================================

if (categoryName) {

    fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(categoryName)}`
    )

        .then((res) => res.json())

        .then((data) => {

            console.log("Meals:", data);


            // ======================================
            // MEALS TITLE
            // ======================================

            mealTitle.innerHTML = `

                <h1>MEALS</h1>

                <div class="meal-line"></div>

            `;


            // ======================================
            // CLEAR OLD MEALS
            // ======================================

            mealCard.innerHTML = "";


            // ======================================
            // NO MEALS
            // ======================================

            if (!data.meals) {

                mealCard.innerHTML = `

                    <div class="noMeal">

                        <h2>
                            No meals found
                        </h2>

                    </div>

                `;

                return;
            }


            // ======================================
            // DISPLAY MEALS
            // ======================================

            data.meals.forEach((meal) => {

                mealCard.innerHTML += `

                    <div class="meal">

                        <img
                            src="${meal.strMealThumb}"
                            alt="${meal.strMeal}"
                        >

                        <h3>
                            ${meal.strMeal}
                        </h3>

                    </div>

                `;

            });

        })

        .catch((error) => {

            console.log(error);

            mealCard.innerHTML = `
                <h2>Failed to load meals</h2>
            `;

        });

}
