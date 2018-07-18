const db = require('../models')
const jwt = require('jsonwebtoken')

module.exports = {
  increaseOpen (req, res) {
    let decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
    //add 1 coin to user for using a key
    db.user.findOne({
      where: {
        id: decoded.id,
      }
    })
    .then((userRow) => {
      //increase coins and reduce keys
      db.user.update({
        coin: userRow.dataValues.coin + 1,
        aladinKeys: userRow.dataValues.aladinKeys - 1,
      }, {
        where: {
          id: decoded.id,
        }
      });
    });
    //update opened column in product
    db.product.findOne({
      where:{
        id: req.body.productId
      }
    })
    .then(product =>{
      db.product.update({
        opened: product.opened + 1
      },  {
        where:{
          id: req.body.productId
        }
      })
      res.send('open 1')
    })
    .catch(err => res.send(err))
  },

  increaseSold (req, res) {
    db.product.findOne({
      where:{
        id: req.body.productId
      }
    })
    .then(product =>{
      db.product.update({
        sold: product.sold + 1
      },  {
        where:{
          id: req.body.productId
        }
      })
      res.send('sold 1')
    })
    .catch(err => res.send(err))
  },

  logBid(req, res) {
    let decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
    db.aladinkeyLog.create({
      userId: decoded.id,
      productId: req.body.productId,
      priceAfter: req.body.priceAfter,
      priceBefore: req.body.priceBefore
    })
    //sending null so frontend isn't stuck waiting
    res.send('log')
  }
}
