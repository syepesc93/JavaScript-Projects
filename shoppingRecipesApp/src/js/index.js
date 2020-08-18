import Search from './models/Search';
import * as searchView from './views/searchView';
import { DOMelements } from './views/base';

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
    const query = searchView.getInput();
    console.log(query);

    if (query) {
        // 2. new search object and add to state
        state.search = new Search(query);

        // 3. prepare UI for results
        searchView.clearInput();
        searchView.clearResults();

        // 4. search for recipes
        await state.search.getResults();

        // 5. render results on UI
        searchView.renderResults(state.search.result);
    }
}

DOMelements.searchForm.addEventListener('submit', e => {
    e.preventDefault(); // stop realoading the page
    controlSearch();
});