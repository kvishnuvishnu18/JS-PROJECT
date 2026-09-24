let search = document.getElementById("search");
// let search = document.getElementById("searchBtn")
let categories = [];


// FETCH CATEGORIES //


fetch("https://www.themealdb.com/api/json/v1/1/categories.php")

    .then(response => response.json())

    .then(data => {

        console.log(data);

        // Get categories from API //
        categories = data.categories;


        
        // HAMBURGER MENU //
       

        let menuOutput = "";

        categories.forEach(category => {

            menuOutput += `
                <div class="menu-category">
                    ${category.strCategory}
                </div>
            `;

        });

        document.getElementById("categories").innerHTML = menuOutput;


       
        // SHOW CATEGORY CARDS //
       

        showCategories(categories);

    })

    // ERROR //


    .catch(error => {

        console.log(error);

        document.getElementById("categories").innerHTML =
            "Failed to load categories";

        document.getElementById("categoryCards").innerHTML =
            "Failed to load categories";

    });


// FUNCTION TO SHOW CARDS //


function showCategories(categoryList) {

    let cardOutput = "";

    categoryList.forEach(category => {

        cardOutput += `
            <div class="food-card">

                <div class="image-container">

                    <a href="">
                        <img
                            src="${category.strCategoryThumb}"
                            alt="${category.strCategory}">
                    </a>

                    <span>
                        ${category.strCategory}
                    </span>

                </div>

            </div>
        `;

    });

    document.getElementById("categoryCards").innerHTML = cardOutput;
}



let mealCards = document.getElementById("mealCards")
let searchBtn = document.getElementById("search-Btn")

searchBtn.addEventListener("click",(e)=>{
    e.preventDefault();

    let value = search.value.trim();

    mealCards.innerHTML=""

    if(value===""){
        return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
    .then((res)=>res.json())
    .then((data)=>{
        if(!data.meals){
            // mealCards.innerHTML="";
        mealCards.innerHTML=`<h2>NO MEALS FOUND</h2>`
        return;
    }

    data.meals.forEach((item)=>{
        mealCards.innerHTML +=`<div class = "mealOne">
        <img src="${item.strMealThumb}">
        <p>${item.strArea}</p>
        <h4>${item.strMeal}</h4>
        </div>`
    })
    })
})