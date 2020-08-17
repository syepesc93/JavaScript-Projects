import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getResults(query) {
        const proxy = ''; // this is the url from the web that we request data from
        const key = '';
        try {
            // this is the url for the website and the api key
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
            this.result = res.data.recipes;
            // console.log(recipes);
        } catch (error) {
            alert(error);
        }
    }
}