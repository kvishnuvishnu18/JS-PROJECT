let search = document.getElementById("search");

let categories = [];

let categoriesContainer = document.getElementById("categories");
let categoryCards = document.getElementById("categoryCards");

let mealCards = document.getElementById("mealCards");
let searchBtn = document.getElementById("search-Btn");
let mealTitle = document.querySelector(".mealTitle");



// FETCH CATEGORIES


fetch("https://www.themealdb.com/api/json/v1/1/categories.php")

    .then(response => response.json())

    .then(data => {

        console.log(data);

        categories = data.categories;


        
        // HAMBURGER MENU
        

        let menuOutput = "";

        categories.forEach(category => {

            menuOutput += `
                <a
                     href="second.html?category=${encodeURIComponent(category.strCategory)}"
                     class="menu-category"
                >
                     ${category.strCategory}
                </a>
            `;

        });

        categoriesContainer.innerHTML = menuOutput;


        
        // SHOW CATEGORY CARDS
        

        showCategories(categories);

    })

    .catch(error => {

        console.log(error);

        categoriesContainer.innerHTML =
            "Failed to load categories";

        categoryCards.innerHTML =
            "Failed to load categories";

    });



// SHOW CATEGORY CARDS


function showCategories(categoryList) {

    let cardOutput = "";

    categoryList.forEach(category => {

        cardOutput += `
            
            <div class="food-card">

                <div class="image-container">

                    <a href="second.html?category=${encodeURIComponent(category.strCategory)}">

                        <img
                            src="${category.strCategoryThumb}"
                            alt="${category.strCategory}"
                        >

                    </a>

                    <span class="one">
                        ${category.strCategory}
                    </span>

                </div>

            </div>

        `;

    });

    categoryCards.innerHTML = cardOutput;
}



// SEARCH MEALS


searchBtn.addEventListener("click", (e) => {

    e.preventDefault();

    let value = search.value.trim();


    // Clear previous results

    mealCards.innerHTML = "";
    mealTitle.innerHTML = "";


    // Empty search

    if (value === "") {
        return;
    }


    // SEARCH API
 

    fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(value)}`
    )

        .then(res => res.json())

        .then(data => {


            // NO MEALS FOUND
           

            if (!data.meals) {

                mealCards.innerHTML = `
                    <h2>NO MEALS FOUND</h2>
                `;

                return;
            }


           
            // MEALS TITLE
           

            mealTitle.innerHTML = `
                <h1>MEALS</h1>

                <div class="meal-line"></div>
            `;


            // DISPLAY MEALS
           

            data.meals.forEach(item => {

                mealCards.innerHTML += `

                    <a href="third.html?id=${item.idMeal}" class="itemCheck">

                        <div class="mealOne">

                            <img
                                src="${item.strMealThumb}"
                                alt="${item.strMeal}"
                            >

                            <p>
                                ${item.strArea}
                            </p>

                            <h5>
                                ${item.strMeal}
                            </h5>

                            <span class="meal-category">
                                ${item.strCategory}
                            </span>

                        </div>

                    </a>

                `;

            });

        })

        .catch(error => {

            console.log(error);

            mealCards.innerHTML = `
                <h2>Something went wrong</h2>
            `;

        });

});
