const express = require('express');
const router = express.Router()
const data = require("../data")
const showData = data.shows;


router.get('/', async(req, res) => {
    res.render('shows/show_finder', {title:"Show Finders"});
});

router.post('/search', async(req, res) => {
    let name = req.body.show_name
    const show_info = await showData.get_info(name)
    if(show_info.length === 0){
        res.render('shows/searchTerm', {title: "Show Found",shows: show_info, searchTerm: name, zero: true})
        return
    }
    res.render('shows/searchTerm', {title: "Show Found",shows: show_info, searchTerm: name})
})

router.get('/shows/:id', async(req, res) => {
    let input_id = req.params.id

    const show = await showData.get_show(input_id)
    res.render('shows/eachShow', {title: show.name, show: show})
    //res.json(show)
})



module.exports = router;