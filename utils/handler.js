import {getApiData} from './fetch.js';

export const genericHandler = async (apiUrl, params = {}) => {
    try {
        return await getApiData(apiUrl, params)
    } catch (err) {
        return {
            message: `⚠️ Errore nella chiamata API: ${err.message}`
        };
    }
};
