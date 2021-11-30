const data = require(".")

const axios = require("axios")

async function get_info(name){
    if(!name) throw "Error: no name is given"
    if(typeof(name) !== "string") throw "Error: name is not a string";
    if(name.split(" ").join("") === "") throw "Error: name cannot be empty"; 
    const {data} = await axios.get("http://api.tvmaze.com/search/shows?q=" + name)
    return data
}

async function get_show(input_id){
    const {data} = await axios.get("http://api.tvmaze.com/shows/" + input_id)
    return data
}

module.exports = {
    get_info, get_show
}