async function getRecipesData() {
  return fetch("src/data/recipes.json")
    .then((resp) => resp.json())
    .then((data) => {
      return data;
    });
}


async function displayData(recipes) {
  const recipeSection = document.querySelector(".recipes_section");

  recipes.forEach((recipe) => {
    const recipesCard = new Recipe(recipe);
    const card = recipesCard.getRecipesCardDOM();
    recipeSection.appendChild(card);
  });
}


async function init() {
  const { recipes } = await getRecipesData();
  displayData(recipes);
  dropdown(recipes);
  filter();
}

init()