class Recipe {
  constructor(data) {
    const { name, servings, id, ingredients, time, ustensils, description, appliance } = data;
    this.id = id;
    this.name = name;
    this.servings = servings;
    this.ingredients = ingredients;
    this.time = time;
    this.ustensils = ustensils;
    this.description = description;
    this.appliance = appliance;
  }

  getRecipesCardDOM() {
    const article = document.createElement("article");

    const listeIngredients = this.ingredients
      .map((ingredient) => {
        const quantite = ingredient.quantity ? ` : ${ingredient.quantity}` : "";
        const unit = ingredient.unit ? `  ${ingredient.unit}` : "";
        return `<li><span>${ingredient.ingredient}</span>${quantite}${unit}</li>`;
      })
      .join("");

    article.classList.add("article-container");
    article.setAttribute("data-value", "show");
    article.innerHTML = `
      <div class="img-container">
        <div class="picture"></div>
      </div>
      <div class="info-container">
    <div class="info-header">
        <h2>${this.name}</h2>
        <div class= "info-subheader">
        <img src="src/assets/clock.png" alt="clock icon">
        <span>${this.time} min</span>
        </div>
        
    </div>
    <div class="info-text">
        <ul>
            ${listeIngredients}
        </ul>
        <span>${this.description}</span>
    </div>
</div>
  `;
    return article;
  }
}
