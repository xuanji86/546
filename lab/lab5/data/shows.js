const data = require(".");

const axios = require("axios");

async function getAllshows(){
    try{
        const {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
        return data
    } catch (e){
        return e
    }
}

async function getshowById(input_id){
    if(!input_id) throw "Error: No input";
    if(typeof(input_id) !== "string") throw "Error: input is not a string";
    if(isNaN(input_id)) throw "Error: the input string cannot convert to int";
    id_num = parseInt(input_id)
    if(id_num !== Math.floor(id_num)) throw "Error: the input is not a int";
    if(id_num < 0) throw "Error: id has to be bigger then 0";
    try{
        const {data} = await axios.get('http://api.tvmaze.com/shows/' + input_id);
        return data
    } catch(e){
        return e
    }
}

 async function aboutMe(){
    let about_me_info = {"name": "Jiashu Wang",
                         "cwid": "10460690",
                         "biography": "This is Jason Wang.\n My github is 39xdgy",
                         "favoriteShows": ["One Punch man", "SAO"]}
    return about_me_info
}

module.exports = {
    getAllshows,
    getshowById,
    aboutMe
}