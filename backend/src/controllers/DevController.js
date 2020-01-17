const parseStringToArray =  require('../utils/parseStringToArray');
const Dev =  require('../models/Dev');
const axios = require('axios');

module.exports = {

    async index(request, response) {
        response.json(await Dev.find());
    },


    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        const mongoReponse = await Dev.findOne({github_username});


        if(!mongoReponse) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        
            const { name = login, avatar_url, bio } = apiResponse.data;
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
            const arrayTechs = parseStringToArray(techs);
        
            mongoReponse = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: arrayTechs,
                location
            });
        }

        return response.json(mongoReponse);
    }
}