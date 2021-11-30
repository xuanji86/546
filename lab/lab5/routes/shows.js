const express = require('express');
const router = express.Router()
const data = require("../data")
const showData = data.shows;

router.get('/shows/:id', async(req, res) => {
    try{
        if(!req.params.id) {
            res.status(404).json({"Route Error message": "get /shows/:id missing inputs"});
            return
        }
        const show = await showData.getshowById(req.params.id);
        res.status(200).json(show);
    } catch(e){
        res.status(404).json({message: e});
    }
});

router.get('/shows', async(req, res) => {
    try{
        const showList = await showData.getAllshows();
        res.json(showList);
    } catch(e){
        res.status(500).json({message: e});
    }
});

router.get('/aboutme', async(req, res) => {
    try {
        const about_me_info = await showData.aboutMe()
        res.json(about_me_info);
    } catch(e){
        res.status(404).json({message: e});
    }
  });

module.exports = router;