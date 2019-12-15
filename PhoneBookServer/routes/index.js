var express = require('express');
var router = express.Router();

var contacts = [];
var id = 1;

router.get("/getContacts", function(req, res) {
  var term = (req.query.term || "").toUpperCase();
  var result = term === "" ? contacts : contacts.filter(function (contact) {
    return contact.firstName.toUpperCase().indexOf(term)>=0 ||
        contact.lastName.toUpperCase().indexOf(term)>=0 ||
        contact.phoneNumber.toUpperCase().indexOf(term)>=0
  });
  res.send(result);
});

router.post("/addContact", function(req, res) {
  var contact = req.body;
  contact.id = id;
  id++;

  contacts.push(contact);
  res.send({
    success: true,
    message: null
  });
});

router.post("/deleteContact", function(req, res) {
  var id = req.body.id;

  contacts = contacts.filter(function (contact) {
    return contact.id !== id;
  });

  res.send({
    success: true,
    message: null
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
