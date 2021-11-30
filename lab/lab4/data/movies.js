const { ObjectID } = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movies;

async function create(title, plot, rating, runtime, genre, cast, info) {

    if(!title || !plot || !rating || !runtime || !genre || !cast || !info) throw "Error: Missing input";
    if(typeof(title) !== "string") throw "Error: title is not a string";
    if(typeof(plot) !== "string") throw "Error: plot is not a string";
    if(typeof(rating) !== "string") throw "Error: rating is not a string";
    if(typeof(runtime) !== "string") throw "Error: runtime is not a string";
    if(typeof(genre) !== "string") throw "Error: genre is not a string";
    if(!Array.isArray(cast)) throw "Error: cast is not an array";
    if(typeof(info) !== "object" || Array.isArray(info)) throw "Error: info is not an object";

    if(!title.replace(' ', '') || !plot.replace(' ', '') || !rating.replace(' ', '') || !runtime.replace(' ', '') || !genre.replace(' ', '')) throw "Error: input is/are empty";
    if(cast.length === 0) throw "Error: cast have no value inside Array";
    let flag_string = false
    let true_cast = []
    cast.forEach((value) => {
        if(typeof(value) !== "string"){
            throw "Error: cast contain non string input";
            true_cast.append(value)
            flag_string = true;
        }
    })
    //if(!flag_string) throw "Error: cast has no correct value";
    let info_keys = Object.keys(info);
    if(!info_keys.includes('director') || !info_keys.includes('yearReleased')) throw "Error: format for info is not correct";
    if(typeof(info["director"]) !== "string" || info["director"].replace(' ', '') === '') throw "Error: info.direcctor is not valid";
    if(typeof(info['yearReleased']) !== "number") throw "Error: info.yearReleased is not an number";
    let year = info['yearReleased'];

    if(year < 1930 || year > (new Date().getFullYear() + 5)) throw "Error: year are not reasonable";

    const movieCollection = await movies();

    let newMovie = {
        title, plot, rating, runtime, genre, cast, info
    };

    const insertInfo = await movieCollection.insertOne(newMovie);
    if (insertInfo.insertedCount === 0) throw 'Could not add Movie';

    const newId = insertInfo.insertedId;
    const movie_info = await get(newId.toString());
    return movie_info;

}

async function getAll(){
    const moiveCollection = await movies();

    const moiveList = await moiveCollection.find({}).toArray();

    return moiveList;
}

async function get(id){
    if(!id) throw 'You must provide an id to search for';
    
    Obj_id = myDBfunction(id);
    const movieCollection = await movies();
    const movie_info = await movieCollection.findOne({_id: Obj_id});
    if(movie_info === null) throw 'No movie with that id';

    return movie_info;

};

async function remove(id){
    if(!id) throw 'You must provide an id to search for';
    Obj_id = myDBfunction(id);
    const movieCollection = await movies();
    const deletionInfo = await movieCollection.deleteOne({_id: Obj_id});

    if(deletionInfo.deletedCount === 0) throw `Counld not delete movie with id of ${id}`;
    return {deleted: true};

};

async function rename(id, newTitle){
    if(!id) throw 'you must provide an id to search for'
    if(!newTitle) throw 'You must provide a name for your movie'
    if(typeof(newTitle) !== "string") throw 'newTitle must be a string'
    if(newTitle.replace(' ', '') === '') throw 'You must provide a name for your movie'
    const movieCollection = await movies();
    Obj_id = myDBfunction(id);
    let updateMovie = {
        title: newTitle
    };
    const updatedInfo = await movieCollection.updateOne(
        {_id: Obj_id}, 
        { $set: updateMovie}
    )
    if(updatedInfo.modifiedCount === 0) throw 'could not update movie successfully';

    return await get(id)
};

function myDBfunction(id) {
    let { ObjectId } = require('mongodb');

    //check to make sure we have input at all
    if (!id) throw 'Id parameter must be supplied';
  
  
    //check to make sure it's a string
    if (typeof id !== 'string') throw "Id must be a string";

    //Now we check if it's a valid ObjectId so we attempt to convert a value to a valid object ID,
    //if it fails, it will throw an error (you do not have to throw the error, it does it automatically and the catch where you call the function will catch the error just as it catches your other errors).

    let parsedId = ObjectId(id);

    //this console.log will not get executed if Object(id) fails, as it will throw an error
    return parsedId;
  }

module.exports = {
    create, getAll, get, remove, rename
}

async function main(){
    const connection = require('../config/mongoConnection');
    let billAndTed = null;
    let new_movie = null;
    try{
        billAndTed = await create("Bill and Ted Face the Music","Once told they'd save the universe during a time-traveling adventure, 2 would-be rockers from San Dimas, California find themselves as middle-aged dads still trying to crank out a hit song and fulfill their destiny.","PG-13", "1hr 31min","Comedy",["Keanu Reeves","Alex Winter"],{director: "Dean Parisot", yearReleased: 2020});
        console.log(billAndTed);
    } catch(e){
        console.log(e)
    }
    
    try{
        new_movie = await create("Next hot movie","Once told they'd save the universe during a time-traveling adventure, 2 would-be rockers from San Dimas, California find themselves as middle-aged dads still trying to crank out a hit song and fulfill their destiny.","PG-18", "2hr 31min","Anime",["yo","bro"],{director: "gong", yearReleased: 2011});
        console.log(new_movie)
    } catch(e){
        console.log(e);
    }
    
    try{
        let changed_info = await rename(billAndTed._id.toString(), "Ted show");
        console.log(changed_info);
    } catch(e){
        console.log(e)
    }

    try{
        let remove_info = await remove(new_movie._id.toString());
        console.log(remove_info)
    } catch(e){
        console.log(e)
    }

    const db = await connection();
    await db.serverConfig.close();
}

