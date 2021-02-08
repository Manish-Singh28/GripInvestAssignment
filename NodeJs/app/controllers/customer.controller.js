const Customer = require("../models/customer.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
     // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const customer = new Customer({
    email: req.body.email,
    userName: req.body.userName,
    userId: req.body.userId,    
    phone: req.body.phone,
    active: req.body.active
  });

  // Save Customer in the database
  Customer.create(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
  
};

// Retrieve all Client from the database.
exports.findAll = (req, res) => {
    Customer.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Client."
        });
      else res.send(data);
    });
  
};

// Find a single Client with a clientId
exports.findOne = (req, res) => {
  
    Customer.findById(req.params.clientId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.clientId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Customer with id " + req.params.clientId
            });
          }
        } else res.send(data);
      });
};

// Update a Customer identified by the clientId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Customer.updateById(
      req.params.clientId,
      new Customer(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.clientId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Customer with id " + req.params.clientId
            });
          }
        } else res.send(data);
      }
    );
  
};

// Delete a Customer with the specified clientId in the request
exports.delete = (req, res) => {
    Customer.remove(req.params.clientId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.clientId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Customer with id " + req.params.clientId
          });
        }
      } else res.send({ message: `Customer was deleted successfully!` });
    });
  
};

// Delete all Client from the database.
exports.deleteAll = (req, res) => {
    Customer.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Client."
        });
      else res.send({ message: `All Client were deleted successfully!` });
    });
  
};