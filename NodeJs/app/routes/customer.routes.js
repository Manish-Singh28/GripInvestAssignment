module.exports = app => {
    const Client = require("../controllers/customer.controller.js");
  
    // Create a new Customer
    app.post("/client", Client.create);
  
    // Retrieve all Client
    app.get("/client", Client.findAll);
  
    // Retrieve a single Customer with clientId
    app.get("/client/:clientId", Client.findOne);
  
    // Update a Customer with clientId
    app.put("/client/:clientId", Client.update);
  
    // Delete a Customer with clientId
    app.delete("/client/:clientId", Client.delete);
  
    // Create a new Customer
    app.delete("/client", Client.deleteAll);
  };    