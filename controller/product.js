const product = require('../models').product;

module.exports = {
  list(req, res) {
    return product.findAll()
      .then(data => res.status(201).send(data))
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
      .then(data => res.status(201).send(data))
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
          .then(() => res.status(200).send(data))  // Send back the updated data.
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
        .then(() => res.status(200).send({ message: 'product deleted successfully.' }))
        .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
