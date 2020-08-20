// file to centralize DOM variables

export const DOMelements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResList: document.querySelector('.results__list'),
    searchRes: document.querySelector('.results'),
    searchResPages: document.querySelector('.results__pages')
};

export const elementStrings = {
    loader: '.loader'
};

// loading spinners

export const renderLoaderSpinner = parent => {
    const loader = `
        <div class="loader">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoaderSpinner = () => {
    const loader = document.querySelector(elementStrings.loader);
    if (loader) loader.parentElement.removeChild(loader);
};