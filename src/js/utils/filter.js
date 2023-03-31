function filter() {
  const dropdowns = document.querySelectorAll(".dropdown");
  const tagsSection = document.querySelector(".tags_section");
  const searchBar = document.getElementById("search");
  const noRecipes = document.getElementById("no-recipes");


// fonction d'affichage des tags 

  dropdowns.forEach((dropdown) => {
    const dropdownArrows = dropdown.querySelector(".dropdown-arrow");
    const menu = dropdown.querySelector(".dropdown-menu");
    const searchInput = dropdown.querySelector(".dropdown-search");
    const options = dropdown.querySelectorAll(".dropdown-menu li");

    searchInput.addEventListener("click", function (e) {
      menu.classList.add("active");
      dropdown.classList.add("expand");
    });

    dropdownArrows.addEventListener("click", function () {
      menu.classList.add("active");
      dropdown.classList.add("expand");
    });

    document.addEventListener("click", function (e) {
      if (!e.target.hasAttribute("data-toggle")) {
        menu.classList.remove("active");
        dropdown.classList.remove("expand");
      }
    });

    options.forEach(function (option) {
      let cross = document.createElement("i");
      let optionDiv = document.createElement("div");
      option.addEventListener("click", () => {
        cross.classList.add("fas", "fa-times");
        cross.setAttribute("data-toggle", "");
        optionDiv.innerHTML = option.innerHTML;
        optionDiv.setAttribute("data-toggle", "");

        optionDiv.appendChild(cross);
        if (menu.parentNode.classList.contains("ingredients")) {
          tagsSection.appendChild(optionDiv).classList.add("tag", "ingredient");
          checkFilter(optionDiv.innerText.toLowerCase());
        } else if (menu.parentNode.classList.contains("appareils")) {
          tagsSection.appendChild(optionDiv).classList.add("tag", "appareil");
          checkFilter();
        } else if (menu.parentNode.classList.contains("ustensils")) {
          tagsSection.appendChild(optionDiv).classList.add("tag", "ustensil");
          checkFilter();
          
        }
        option.style.display = "none";


        cross.addEventListener("click", () => {
          optionDiv.remove();
          checkFilter();
          option.style.display = "block";
        });
      });
    });
  });

  // fonction qui filtre dans la barre de recherche des subInputs

  const searchBars = document.querySelectorAll(".dropdown-search");
  searchBars.forEach((searchBar) => {
    searchBar.addEventListener("input", function (e) {
      const searchQuery = e.target.value.toLowerCase();
      subFilterData(searchQuery, searchBar);
    });
  });

  // fonction de filtre quand on ajoute un caractère

  searchBar.addEventListener("input", function () {
    checkFilter();
  });

  // Fonction node qui gère les différents cas d'utilisation

  function checkFilter() {
    const tags = document.querySelectorAll(".tag");
    const searchQuery = searchBar.value.toLowerCase();
    const length = searchQuery.length;
    let query = [];

    if ((tags.length === 0) & (length < 3)) {
    } else if ((tags.length >= 1) & (length < 3)) {
      tags.forEach((tag) => {
        query.push(tag.innerText.toLowerCase());
      });
    } else if ((tags.length === 0) & (length >= 3)) {
      query.push(searchQuery);
    } else if ((tags.length >= 1) & (length >= 3)) {
      tags.forEach((tag) => {
        query.push(tag.innerText.toLowerCase());
      });
      query.push(searchQuery);
    }

    filterData(query);
  }

  // Fonction de filtrage principal

  function filterData(searchQuery) {
    const t0 = performance.now();
    
    const allRecipes = Array.from(document.querySelectorAll(".article-container"));
    allRecipes.forEach((recipe) => {
      recipe.setAttribute("data-value", "show");
    });
    noRecipes.style.display = "none";
    let array = [];

    if (searchQuery == undefined || searchQuery.length == 0) {
      allRecipes.filter((recipe) => {
        recipe.setAttribute("data-value", "show");
        recipe.style.display = "block";
      });
      array = allRecipes;
    } else {
      searchQuery.forEach((query) => {
        const recipes = Array.from(document.querySelectorAll(".article-container[data-value='show']"));

        recipes.filter((recipe) => {
          const recipeName = recipe.textContent.toLowerCase();
          if (recipeName.includes(query)) {
            recipe.setAttribute("data-value", "show");
            recipe.style.display = "block";
            array.push(recipe);
          } else {
            recipe.setAttribute("data-value", "hide");
            recipe.style.display = "none";
          }
        });
      });
    }
    if (array.length == 0) {
      noRecipes.style.display = "block";
    }
    filterLi(array);
    const t1 = performance.now();
    console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
    return array;
    
  }

  // Fonction qui filtre les liste des subfilters
  function subFilterData(searchQuery, searchBar) {
    let recipes;

    if (searchBar.parentNode.classList.contains("ingredients")) {
      recipes = Array.from(document.querySelectorAll(".ingredient[data-value='show']"));
    } else if (searchBar.parentNode.classList.contains("appareils")) {
      recipes = Array.from(document.querySelectorAll(".appareil[data-value='show']"));
    } else if (searchBar.parentNode.classList.contains("ustensils")) {
      recipes = Array.from(document.querySelectorAll(".ustensil[data-value='show']"));
    }

    recipes.filter((recipe) => {
      const recipeName = recipe.textContent.toLowerCase();
      if (recipeName.includes(searchQuery)) {
        recipe.style.display = "block";
      } else {
        recipe.style.display = "none";
      }
    });
  }


  // fonctions de filtrages des ingredients/Ustensils/Appareils
  function filterLi(datas) {
    const listes = Array.from(document.querySelectorAll(".dropdown-menu li"));

    listes.forEach((liste) => {
      liste.setAttribute("data-value", "hide");
      liste.style.display = "none";
    });

    datas.forEach((data) => {
      listes.filter((liste) => {
        const listeName = liste.innerText.toLowerCase();
        const dataName = data.innerText.toLowerCase();
        if (dataName.includes(listeName)) {
          liste.setAttribute("data-value", "show");
          liste.style.display = "block";
        }
      });
    });
  }
}
