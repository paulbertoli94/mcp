import {genericHandler} from '../utils/handler.js';

export default {
    functionDef: {
        type: "function",
        function: {
            name: "get_weather",
            description: "Ottieni le condizioni meteo per una specifica località",
            parameters: {
                type: "object",
                properties: {
                    lat: {
                        type: "number",
                        description: "Latitudine"
                    },
                    lon: {
                        type: "number",
                        description: "Longitudine"
                    }
                },
                required: ["lat", "lon"]
            }
        }
    },

    handler: async ({lat, lon}) => {
        const apiKey = process.env.OPENWEATHER_API_KEY;  // API Key dal .env
        const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&exclude=minutely,alerts&lang=it`;

        // Utilizza il genericHandler per ottenere i dati meteo
        return await genericHandler(url, {lat, lon});
    }
};