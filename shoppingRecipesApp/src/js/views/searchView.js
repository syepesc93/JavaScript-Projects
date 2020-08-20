import { DOMelements } from './base';


export const getInput = () => DOMelements.searchInput.value;

export const clearInput = () => DOMelements.searchInput.value = '';

export const clearResults = () => {
    DOMelements.searchResList.innerHTML = '';
    DOMelements.searchResPages.innerHTML = '';
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

// type can be previus or next
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? page - 1 : page + 1}"></use>
        </svg>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    </button>
`;

const renderButtons = (page, numResults, resultsPerPage) => {
    const pages = Math.ceil(numResults / resultsPerPage);

    let button;
    if (page === 1) {
        // only button tu go to next page
        button = createButton(page, 'next');
    } else if (page < pages) {
        // both buttons
        button = `
            ${createButton(page, 'next')}
            ${createButton(page, 'prev')}
        `;
    } else if (page === pages && pages > 1) {
        // only preview button
        button = createButton(page, 'prev');
    }

    DOMelements.searchResPages.insertAdjacentHTML('afterbegin', button)
};

export const renderResults = (recipesObject, page = 1, resultsPerPage = 10) => {
    // setting items per page on the recipes result list
    const start = (page - 1) * resultsPerPage;
    const end = page * resultsPerPage;

    // console.log(recipesObject);
    recipesObject.slice(start, end).forEach(renderRecipe);
    renderButtons(page, recipesObject.length, resultsPerPage);
};