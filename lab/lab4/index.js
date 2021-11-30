const movies = require('./data/movies');
const connection = require('./config/mongoConnection')

async function main(){
    //1
    let movie_1 = await movies.create("First movie", "plot for the first movie", "PG-18", "1h 30mins", "Anime", ["Jason Wang", "Chris Wu"], {director: "Yuanyi Wong", yearReleased: 2021})
    //2
    console.log(movie_1)
    //3
    let movie_2 = await movies.create("Second Movie", "Plot for the second movie", "PG-13", "1h 2mins", "Anime", ["Leo Zhen", "Yihan Qiu"], {director: "Yuenyi Wong", yearReleased: 2015})
    //4
    console.log(await movies.getAll())
    //5
    let movie_3 = await movies.create("Third Movie", "Plot for the third movie", "PG-8", "2h 30mins", "Anime", ["Bro", "Yo"], {director: "YuenYi Wong", yearReleased: 2018})
    //6
    console.log(movie_3)
    //7
    movie_1 = await movies.rename(movie_1._id.toString(), "New First movie")
    //8
    console.log(movie_1)
    //9
    movies.remove(movie_2._id.toString())
    //10
    console.log(await movies.getAll())
    //11
    try{
        bad_movie = await movies.create()
    } catch (e){
        console.log(e)
    }
    //12
    try{
        bad_remove = await movies.remove(movie_2._id.toString())
    } catch(e){
        console.log(e)
    }
    //13
    try{
        bad_rename = await movies.rename(movie_2._id.toString(), "Bad movie 2 id")
    } catch(e){
        console.log(e)
    }
    //14
    try{
        bad_rename = await movies.rename(movie_1._id.toString(), 38)
    } catch(e){
        console.log(e)
    }
    //15
    try{
        bad_id = await movies.get(movie_2._id.toString(), "fake name")
    } catch(e){
        console.log(e)
    }

    const db = await connection();
    await db.serverConfig.close();
}

main()