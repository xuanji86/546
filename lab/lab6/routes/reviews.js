const express = require('express');
const router = express.Router();
const data = require("../data")
const reviewsData = data.reviews;

//THIS FILE IS FINISHED, NEED TESTING

router.get('/:bookid', async (req, res) => {
    if(!req.params.bookid){
        res.status(400).json({error: "Missing bookid"})
        return;
    }

    try {
      const reviewslist = await reviewsData.getreviewslist(req.params.bookid);
      res.status(200).json(reviewslist)
    } catch (e) {
      res.status(404).send({error: e});
    }
});

router.post('/:bookid', async (req, res) => {
    let req_id = req.params.bookid;
    let req_body = req.body;
    if(!req_id || !req_body || !req_body.title || !req_body.reviewer || !req_body.bookBeingReviewed || !req_body.rating || !req_body.dateOfReview || !req_body.review){
        res.status(400).json({error: "Missing input"});
        return;
    }
    try{
        const {title, reviewer, bookBeingReviewed, rating, dateOfReview, review} = req_body
        const newreview = await reviewsData.create(title, reviewer, bookBeingReviewed, rating, dateOfReview, review)
        res.status(200).json(newreview)
    } catch(e){
        res.status(404).json({error: e})
    }
});


router.get('/:bookid/:reviewid', async(req, res) => {
    let book_id = req.params.bookid
    let review_id = req.params.reviewid

    if(!book_id || !review_id){
        res.status(400).json({error: "Missing id"})
    }
    try{
        const review =  await reviewsData.getOneReview(book_id, review_id); 
        res.status(200).json(review)
    } catch(e){
        res.status(404).json({error: e})
    }
})


router.delete('/:bookid/:reviewid', async (req, res) => {
    let book_id = req.params.bookid
    let review_id = req.params.reviewid

    if(!book_id || !review_id){
        res.status(400).json({error: "Missing id"})
    }
    try{
        const output = await reviewsData.deleteOneReview(book_id, review_id);

        res.status(200).json(output)
    } catch(e){
        res.status(404).json({error: e})
    }
    res.status(501).send();
});


module.exports = router;