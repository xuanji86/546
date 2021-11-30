const express = require('express');
const router = express.Router();
const data = require("../data");
const booksData = data.books;

//THIS FILE IS FINISHED, NEED TESTING

router.get('/', async (req, res) => {
    try {
      const booksList = await booksData.getAllbooks();
      res.status(200).json(booksList);
    } catch (e) {
        res.status(404).json({message: e});
    }
});

router.post('/', async (req, res) => {
    let req_body = req.body;
    if(!req_body || !req_body.title || !req_body.author || !req_body.genre || !req_body.datePublished || !req_body.summary || !req_body.reviews){
        res.status(400).json({ error: 'Missing input' });
        return;
    }
    try{
        const {title, author, genre, datePublished, summary, reviews} = req_body;
        const newBook = await booksData.create(title, author, genre, datePublished, summary, reviews)
        res.status(200).json(newBook);
    } catch(e){
        res.status(404).json({message: e});
    }
    
    
});

router.get('/:id', async(req, res) => {
    const book_id = req.params.id
    if(!book_id){
        res.status(400).json({error: "Error on the id"})
        return
    }
    try{
        const book = await booksData.getbookById(book_id);
        res.status(200).json(book);
    } catch(e){
        res.status(404).json({message: e})
    }
})


router.put('/:id', async(req, res) => {
    const id = req.params.id;
    const req_body = req.body;
    if(!id || !req_body || !req_body.title || !req_body.author || !req_body.genre || !req_body.datePublished || !req_body.summary || !req_body.reviews){
        res.status(400).json({ error: 'Missing input' });
        return;
    }

    try{
        await booksData.getbookById(req.params.id)
    } catch(e){
        res.status(404).json({error: "book not found"})
    }
    
    try{
        const updatebook = await booksData.updatebookById(id, req_body);
        res.status(200).json(updatebook);
    } catch(e){
        res.status(404).json({message: e})
    }

})

router.patch('/:id', async(req, res) => {
    const id = req.params.id;
    const req_body = req.body;

    if(!id || !req_body){
        res.status(404).json({error: 'Missing input'});
        return;
    }

    try{
        await booksData.getbookById(req.params.id)
    } catch(e){
        res.status(404).json({error: "book not found"})
    }

    try{
        const updatebook = await booksData.patchbookById(id, req_body);
        res.json(updatebook);
    } catch(e){
        res.status(404).json({message: e});
    }

})

router.delete('/:id', async (req, res) => {
    
    if(!req.params.id){
        res.status(400).json({error: "missing id"})
        return;
    }
    
    try{
        await booksData.getbookById(req.params.id)
    } catch(e){
        res.status(404).json({error: "book not found"})
    }
    
    try{
        const output = await booksData.deletebookById(req.params.id)
        res.sendStatus(200).json(output);
    } catch (e){
        res.status(500).json({error: "error"});
    }
});

module.exports = router;