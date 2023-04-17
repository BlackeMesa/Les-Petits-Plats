 function dropdown(datas) {

    
    const ingredientsMenu = document.querySelector("#ingredients ~ .dropdown-menu");
    const appareilsMenu = document.querySelector("#appareils ~ .dropdown-menu");
    const ustensilsMenu = document.querySelector("#ustensils ~ .dropdown-menu");
    let allIngredient = [];
    let allAppareils = [];
    let allUstensils = [];
  
  datas.forEach(function (data) {

    for (let i = 0; i < data.ingredients.length; i++) {
  const obj = data.ingredients[i];
  allIngredient.push(obj.ingredient);
    }
   
  allAppareils.push(data.appliance);

  for (let i = 0; i < data.ustensils.length; i++) {
    const obj = data.ustensils[i];
    allUstensils.push(obj);
  }


  });

  
const uniqueIngredients = allIngredient.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });

  const uniqueAppareils = allAppareils.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });
  const uniqueUstensils = allUstensils.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });

  
uniqueIngredients.forEach((ingredient) => {
const li = document.createElement("li");
li.setAttribute("data-value", "show");
li.setAttribute("data-toggle",'');

li.textContent = ingredient;
li.classList.add("ingredient")
ingredientsMenu.appendChild(li);
  
})
uniqueAppareils.forEach((appareil) => {
  const li = document.createElement("li");
  li.setAttribute("data-value", "show");
  li.setAttribute("data-toggle", "");
  li.textContent = appareil;
  li.classList.add("appareil");
  appareilsMenu.appendChild(li);
});
uniqueUstensils.forEach((ustensil) => {
  const li = document.createElement("li");
  li.setAttribute("data-value", "show");
  li.setAttribute("data-toggle", "");
  li.textContent = ustensil;
  li.classList.add("ustensil");
  ustensilsMenu.appendChild(li);
});
}




 
