const data = require(".");
const mongoCollections = require('../config/mongoCollections');
const books = mongoCollections.books;
//const reviewsData = require('./reviews');

async function create(title, author, genre, datePublished, summary, reviews){
    if(!title || !author || !genre || !datePublished || !summary || !reviews) throw "Error: Missing input";

    if(typeof(title) !== "string") throw "Error: title is not a string";

    if(typeof(author) !== "object" || Array.isArray(author)) throw "Error: author is not a object"
    if(!Object.keys(author).includes('authorFirstName') || !Object.keys(author).includes('authorLastName')) throw "Error: Missing value in author"

    if(!Array.isArray(genre)) throw "Error: genre is not an array";
    

    if(typeof(datePublished) !== "string") throw "Error: datePublished is not string"
    let date_arr = datePublished.split("/")
    let flag = date_arr[2]
    date_arr[2] = date_arr[1]
    date_arr[1] = date_arr[0]
    date_arr[0] = flag
    let curr_date = new Date(date_arr.join("/"))
    if(!curr_date.getTime()) throw "Error: datePublished is not in date format"


    if(typeof(summary) !== "string") throw "Error: summary is not a string";
    if(!Array.isArray(reviews)) throw "Error: reviews is not an array";
    reviews = [];
    
    const booksCollection = await books();

    let newbook = {
        title, author, genre, datePublished, summary, reviews
    };
    
    let insertInfo = await booksCollection.insertOne(newbook)
    if(insertInfo.insertCount === 0) throw "Error: could not add movie";

    const newId = insertInfo.insertedId;
    const book_info = await getbookById(newId.toString());
    return book_info
}


async function getAllbooks(){
    try{
        const booksCollection = await books();
        const booksList = await booksCollection.find({}, {projection: {"_id": 1, "title": 1, }}).toArray();

        return booksList
    } catch(e){
        return e;
    }
}

async function getbookById(input_id){
    if(!input_id) throw "Error: No input";
    if(typeof(input_id) !== "string") throw "Error: input is not a string";
    Obj_id = myDBfunction(input_id);
    try{
        const booksCollection = await books();
        const books_info = await booksCollection.findOne({_id: Obj_id});
    
        if(books_info === null) throw 'No books with that id';
        return books_info;
    } catch(e){
        return e
    }
}


async function updatebookById(input_id, changeing_body){
    const {title, author, genre, datePublished, summary, reviews} = changeing_body;
    if(!input_id || !title || !author || !genre || !datePublished || !summary || !reviews) throw "Error: Missing input";

    if(typeof(input_id) !== "string") throw "Error: id is not a string";

    if(typeof(title) !== "string") throw "Error: title is not a string";

    if(typeof(author) !== "object" || Array.isArray(author)) throw "Error: author is not a object"
    if(!Object.keys(author).includes('authorFirstName') || !Object.keys(author).includes('authorLastName')) throw "Error: Missing value in author"

    if(!Array.isArray(genre)) throw "Error: genre is not an array";
    
    if(!typeof(datePublished) !== "string") throw "Error: datePublished is not string"
    let date_arr = datePublished.split("/")
    let flag = date_arr[2]
    date_arr[2] = date_arr[0]
    date_arr[0] = flag
    let curr_date = new Date(date_arr.join("/"))
    if(!curr_date.getTime()) throw "Error: datePublished is not in date format"

    
    if(typeof(summary) !== "string") throw "Error: summary is not a string";
    if(!Array.isArray(reviews)) throw "Error: reviews is not an array";

    Obj_id = myDBfunction(input_id);
    
    
    try{
        const booksCollection = await books();

        let newbook = {
            title, author, genre, datePublished, summary, reviews
        }
        await booksCollection.updateOne({_id: Obj_id}, {$set: newbook})

        return await getbookById(input_id);
    } catch(e){
        return e
    }
}

async function patchbookById(input_id, changeing_body){
    const booksCollection = await books();
    const patchbookInfo = {}
    if(!input_id) throw "Error: missing id";
    const book = await this.getbookById(input_id)
    if(changeing_body.title){
        if(changeing_body.title !== book.title) patchbookInfo.title = changeing_body.title
    } 
    if(changeing_body.author){
        new_author = changeing_body.author
        old_author = book.author
        if(changeing_body.author["authorFirstName"] !== book.author["authorFirstName"] || changeing_body.author["authorLastName"] !== book.author["authorLastName"]) {
            patchbookInfo.author = changeing_body.author
        }
    } 
    if(changeing_body.genre){
        if(changeing_body.genre.length !== book.genre.length) patchbookInfo.genre = changeing_body.genre
        else{
            if(!changeing_body.genre.every(function(element, index){
                return element === book.genre[index];
            })){
                patchbookInfo.genre = changeing_body.genre
            }
        }
    } 
    if(changeing_body.datePublished){
        if(changeing_body.datePublished !== book.datePublished) patchbookInfo.datePublished = changeing_body.datePublished
    } 
    if(changeing_body.summary){
        if(changeing_body.summary !== book.summary) patchbookInfo.summary = changeing_body.summary
    } 
    if(changeing_body.reviews){
        if(changeing_body.reviews.length !== book.reviews.length) patchbookInfo.reviews = changeing_body.reviews
        else{
            if(!changeing_body.reviews.every(function(element, index){
                return element === book.reviews[index];
            })){
                patchbookInfo.reviews = changeing_body.reviews
            }
        }
    } 
    if(Object.keys(patchbookInfo).length === 0) throw "Error: Nothing need to be changed"
    Obj_id = myDBfunction(input_id);
    
    
    await booksCollection.updateOne({_id: Obj_id}, {$set: patchbookInfo});

    return await this.getbookById(input_id)

}

async function deletebookById(input_id){
    const reviewsData = require('./reviews');
    const booksCollection = await books();
    Obj_id = myDBfunction(input_id)
    let book = await this.getbookById(input_id);
    const deleteInfo = await booksCollection.removeOne({_id: Obj_id});
    if(deleteInfo.deletedCount === 0){
        throw `Could not delete book with id of ${id}`;
    }
    for (review_id in book.reviews){
        //console.log(book.reviews[review_id])
        await reviewsData.deleteReview_no_patch(input_id, book.reviews[review_id]);
    }
    console.log("yo")
    /*
    book.reviews.forEach((review_id) => {
        await reviewsData.deleteOneReview(input_id, review_id);
    });
    */
    return {"bookId": input_id, "deleted": true};
}


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
      create, getAllbooks, getbookById, updatebookById, patchbookById, deletebookById
  };