import Search from './models/Search';

/* 
First of all we need to install NPM 
from the terimanl and in your project folder type: npm init
then install dependencies as follow: 
    npm install 'package name' --save --> for dependcies
    npm install 'package name' --save-dev --> for developer tools (packages could be unistall by using the uninstall keyword)
*/

/*
GLOBAL STATE OF THE APP
- search object
- current recipes object
- shopping list object
- liked recipes
*/

const state = {};

const controlSearch = async() => {
    // 1. get query from view
    const query = 'pizza'

    if (query) {
        // 2. new search object and add to state
        state.search = new Search(query);

        // 3. prepare UI for results

        // 4. search for recipes
        await state.search.getResults();

        // 5. render results on UI
        console.log(state.search.result);
    }
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault(); // stop realoading the page
    controlSearch();
});