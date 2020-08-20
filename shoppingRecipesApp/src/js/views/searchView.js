import { DOMelements } from './base';


export const getInput = () => DOMelements.searchInput.value;

export const clearInput = () => DOMelements.searchInput.value = '';

export const clearResults = () => {
    DOMelements.searchResList.innerHTML = '';
};

const renderRecipe = recipe => {
    // HTML chunk of code to be rendered on the recipes list
    const renderListElement = `
    <li>
        <a class="results__link results__link--active" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${recipe.title}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    DOMelements.searchResList.insertAdjacentHTML('beforeend', renderListElement);
};

export const renderResults = recipesObject => {
    console.log(recipesObject);
    recipesObject.forEach(renderRecipe);
};