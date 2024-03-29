const brand = require('../models').brand;

module.exports = {
  list(req, res) {
    return brand.findAll({
      order: [['id', 'ASC']],
    })
      .then(data => res.status(201).send(data))
      .catch(err => res.status(400).send(err));
  },
  retrieve(req, res) {
    return brand
      .findById(req.params.id)
      .then(data => {
        if (!data) {
          return res.status(404).send({
            message: 'Brand Not Found',
          });
        }
        return res.status(200).send(data);
      })
      .catch(error => res.status(400).send(error));
  },  
  create(req, res) {
    return brand
      .create({
        brandName: req.body.brandName,
      })
      .then(data => res.status(201).send(data))
      .catch(err => res.status(400).send(err));
  },
  update(req, res) {
    return brand
      .findById(req.params.id)
      .then(data => {
        if (!data) {
          return res.status(404).send({
            message: 'Brand Not Found',
          });
        }
        return data
          .update({
            brandName: req.body.brandName || data.brandName,
          })
          .then(() => res.status(200).send(data))  // Send back the updated data.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {
    return brand
      .findById(req.params.id)
      .then(data => {
        if (!data) {
          return res.status(400).send({
            message: 'Brand Not Found',
          });
        }
        return data
        .destroy()
        .then(() => res.status(200).send({ message: 'Brand deleted successfully.' }))
        .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
