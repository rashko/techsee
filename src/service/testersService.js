import axios from 'axios';

const URL = 'https://test-api.techsee.me/api/ex/';

export default {
    get(query) {
        const { term } = query;
        return axios.get(`${URL}${term}`)
            .then(response => {
                let data;
                if (Array.isArray(response.data)) {
                    data = response.data;
                } else if (response.data === '') {
                    data = [];
                } else {
                    data = [response.data];
                }
                return data;
            })
    }
}