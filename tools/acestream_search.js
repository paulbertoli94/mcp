import {genericHandler} from "../utils/handler.js";

export default {
    functionDef: {
        type: "function",
        function: {
            name: "acestream_search",
            description: "Cerca link AceStream per un evento sportivo",
            parameters: {
                type: "object",
                properties: {
                    term: {
                        type: "string",
                        description: "Termine di ricerca (es: juventus, barcellona)"
                    },
                    prompt: {
                        type: "string",
                        description: "Prompt personalizzato per formattare la risposta"
                    }
                },
                required: ["term"]
            }
        }
    },

    handler: async ({term}) => {
        const url = `https://acestream.duckdns.org/acestream?term=${encodeURIComponent(term)}`;

        return await genericHandler(url, term);
    }
};
