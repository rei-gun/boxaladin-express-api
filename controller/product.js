const product = require('../models').product;
const firebase = require('firebase')

module.exports = {
  filter(req, res) {
    if (req.query.category == 'all' && req.query.brand == 'all') {
      return product.findAll({
        include: [
          { all: true }
        ]
      })
        .then(data => res.send(data))
        .catch(err => res.status(400).send(err));
    } else if (req.query.brand == 'all') {
      return product.findAll({
        where: {
          categoryId: req.query.category
        },
        include: [
          { all: true }
        ]
      })
        .then(data => res.send(data))
        .catch(err => res.status(400).send(err));
    } else if (req.query.category == 'all') {
      return product.findAll({
        where: {
          brandId: req.query.brand
        },
        include: [
          { all: true }
        ]
      })
        .then(data => res.send(data))
        .catch(err => res.status(400).send(err));
    } else {
      return product.findAll({
        where: {
          categoryId: req.query.category,
          brandId: req.query.brand
        },
        include: [
          { all: true }
        ]
      })
        .then(data => res.send(data))
        .catch(err => res.status(400).send(err));
    }
  },
  list(req, res) {
    return product.findAll({
      include: [
        { all: true }
      ]
    })
      .then(data => res.send(data))
      .catch(err => res.status(400).send(err));
  },
  retrieve(req, res) {
    return product
      .findById(req.params.id)
      .then(data => {
        if (!data) {
          return res.status(404).send({
            message: 'product Not Found',
          });
        }
        return res.status(200).send(data);
      })
      .catch(error => res.status(400).send(error));
  },
  create(req, res) {
    return product
      .create({
        categoryId: req.body.categoryId,
        brandId: req.body.brandId,
        productName: req.body.productName,
        description: req.body.description,
        stock: req.body.stock,
        price: req.body.price,
        aladinPrice: req.body.price
      })
      .then(data => {
        console.log(data);
        product.findOne({
          where: {
            id: data.id
          },
          include: [
            { all: true }
          ]
        })
        .then(result => {
          const productsRef = firebase.database().ref().child('products')
  				productsRef.child(result.id).set({
  					id: result.id,
  					productName: result.productName,
  					price: result.price,
  					aladinPrice: result.aladinPrice,
  					brand: result.brand.brandName,
  					category: result.category.categoryName,
  					brandId: result.brand.id,
  					categoryId: result.category.id
  				})

          res.status(201).send(data)
        })
      })
      .catch(err => res.status(400).send(err));
  },
  update(req, res) {
    return product
      .findById(req.params.id)
      .then(data => {
        if (!data) {
          return res.status(404).send({
            message: 'product Not Found',
          });
        }
        return data
          .update({
            categoryId: req.body.categoryId || data.categoryId,
            brandId: req.body.brandId || data.brandId,
            productName: req.body.productName || data.productName,
            description: req.body.description || data.description,
            stock: req.body.stock || data.stock,
            price: req.body.price || data.price,
            aladinPrice: req.body.price || data.aladinPrice,
          })
          .then(result => {
            // tulis hasil uppdate ke firebase di sini
            //

            res.status(200).send(result)  // Send back the updated data.
          })
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {
    return product
      .findById(req.params.id)
      .then(data => {
        if (!data) {
          return res.status(400).send({
            message: 'product Not Found',
          });
        }
        return data
        .destroy()
        .then(result => {
          // hapus data di firebase sesuai id dari result
          const productsRef = firebase.database().ref().child('products')
  				productsRef.child(req.params.id).remove()

          console.log('ID deleted product:', req.params.id);
          res.status(200).send({ message: 'product deleted successfully.' })
        })
        .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
