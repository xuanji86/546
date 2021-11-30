const data = require(".");
const mongoCollections = require('../config/mongoCollections');
const reviews = mongoCollections.reviews;
const booksData = require('./books');

async function create(title, reviewer, bookBeingReviewed, rating, dateOfReview, review){
    
    if(!title || !reviewer || !bookBeingReviewed || !rating || !dateOfReview || !review) throw "Error: Missing input";
    if(typeof(title) !== "string") throw "Error: title is not a string";
    if(typeof(reviewer) !== "string") throw "Error: reviewer is not a string"
    if(typeof(bookBeingReviewed) !== "string") throw "Error: bookBeingReviewed is not a string"
    myDBfunction(bookBeingReviewed)
    let book = await booksData.getbookById(bookBeingReviewed);
    if(typeof(rating) !== "number") throw "Error: rating is not a number"
    if(typeof(dateOfReview) !== "string") throw "Error: dateOfReview is not a string"
    
    let date_arr = dateOfReview.split("/")
    let flag = date_arr[2]
    date_arr[2] = date_arr[0]
    date_arr[0] = flag
    let curr_date = new Date(date_arr.join("/"))
    if(!curr_date.getTime()) throw "Error: dateOfReview is not in date format"
    
    


    if(typeof(review) !== "string") throw "Error: review is not a string"
    const reviewCollection = await reviews()
    let newreview = {
        title, reviewer, bookBeingReviewed, rating, dateOfReview, review
    }
    let insertInfo = await reviewCollection.insertOne(newreview)
    if(insertInfo.insertCount === 0) throw "Error: could not add review";
    const newId = insertInfo.insertedId;
    let review_arr = book.reviews
    review_arr.push(newId.toString())
    let patch_info = {"reviews": review_arr}
    await booksData.patchbookById(bookBeingReviewed, patch_info)
    
    const review_info = await this.getOneReview(bookBeingReviewed, newId.toString())
    return review_info;
}

async function getreviewslist(input_id){
    if(!input_id) throw "Error: missing id"
    myDBfunction(input_id)
    let book = await booksData.getbookById(input_id);
    const reviewsCollection = await reviews()
    const reviewslist = await reviewsCollection.find({ 'bookBeingReviewed': input_id}).toArray();

    if(reviewslist.length === 0) throw "Can not find anything";
    return reviewslist;
}

async function getOneReview(book_id, review_id){
    if(!book_id || !review_id) throw "Error: missing input"
    myDBfunction(book_id)
    obj_id = myDBfunction(review_id)
    let book = await booksData.getbookById(book_id);
    const reviewsCollection = await reviews()
    const review  = await reviewsCollection.find({ 'bookBeingReviewed': book_id, '_id': obj_id}).toArray();
    if (review === null) throw "Error: No review with this id"
    return review

}

async function deleteOneReview(book_id, review_id){
    if(!book_id || !review_id) throw "Error: missing input"
    obj_id = myDBfunction(review_id)
    myDBfunction(book_id)
    let book = await booksData.getbookById(book_id);
    await this.getOneReview(book_id, review_id);
    const reviewsCollection = await reviews()
    const deleteInfo = await reviewsCollection.removeOne({ _id: obj_id, 'bookBeingReviewed': book_id});
    if(deleteInfo.deletedCount === 0) throw `Counld not delete review with id of ${review_id}`;
    let arr = book.reviews
    arr.splice(arr.indexOf(review_id), 1)
    let patch_info = {"reviews": arr}
    await booksData.patchbookById(book_id, patch_info)

    return {"reveiwId": review_id, "deleted": true};
}

async function deleteReview_no_patch(book_id, review_id){
    if(!book_id || !review_id) throw "Error: missing input"
    obj_id = myDBfunction(review_id)
    const reviewsCollection = await reviews()
    const deleteInfo = await reviewsCollection.removeOne({ _id: obj_id, 'bookBeingReviewed': book_id});
    if(deleteInfo.deletedCount === 0) throw `Counld not delete review with id of ${review_id}`;


    return {"reveiwId": review_id, "deleted": true};
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
    create, getreviewslist, getOneReview, deleteOneReview, deleteReview_no_patch
}