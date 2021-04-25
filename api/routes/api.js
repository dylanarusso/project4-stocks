var express = require('express');
var router = express.Router();
const { Portfolio, Wallet } = require('../lib/models');



//GET  /search/:symbol -> http://localhost:3000/api/v1/search/AAPL
// yahoo-stock-prices - npm package

//POST  /portfolio -> http://localhost:3000/api/v1/portfolio
//DELETE  /portfolio/:id -> http://localhost:3000/api/v1/portfolio/23
//GET  /wallet -> http://localhost:3000/api/v1/wallet

router.get('/search/:symbol', async (req, res) => {
    console.log('req.params is', req.params);
    res.json(item)

router.post('/portfolio', async (req, res) => {
    console.log('req.body is', req.body);
    let item = await Portfolio.create(req.body);
    res.json(item)
})

router.delete('/portfolio/:id', async (req, res) => {
    console.log('req.params is', req.params);
    let item = await Portfolio.destroy({where: {id: req.params.id}});
    res.json(item)
})

router.get('/wallet', async (req, res) => {
    //console.log('req.params is', req.params);
    let item = await Wallet.findOne({})
    res.json(item)
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;