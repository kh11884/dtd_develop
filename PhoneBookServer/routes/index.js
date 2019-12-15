var express = require('express');
var router = express.Router();

var contacts = [];
var id = 1;

router.get("/getContacts", function (req, res) {
    var term = (req.query.term || "").toUpperCase();
    var result = term === "" ? contacts : contacts.filter(function (contact) {
        return contact.firstName.toUpperCase().indexOf(term) >= 0 ||
            contact.lastName.toUpperCase().indexOf(term) >= 0 ||
            contact.phoneNumber.toUpperCase().indexOf(term) >= 0
    });
    res.send(result);
});

router.post("/addContact", function (req, res) {
    var contact = req.body;

    var haveNumber = false;
    contacts.forEach(function (c) {
        if (c.phoneNumber === contact.phoneNumber) {
            haveNumber = true;
        }
    });

    if (haveNumber) {
        res.send({
            success: false,
            message: "Такой номер уже есть в базе"
        });
        return;
    }

    contact.id = id;
    id++;

    contacts.push(contact);
    res.send({
        success: true,
        message: null
    });
});

router.post("/deleteContact", function (req, res) {
    var id = req.body.id;

    contacts = contacts.filter(function (contact) {
        return contact.id !== id;
    });

    res.send({
        success: true,
        message: null
    });
});

router.post("/deleteCheckedContacts", function (req, res) {
    var mustBeDeleted = req.body.iDs;
    var wasChanged = false;

    contacts = contacts.filter(function (contact) {
        if (mustBeDeleted.indexOf(contact.id) < 0) {
            return true;
        } else {
            wasChanged = true;
        }
    });

    if (wasChanged) {
        res.send({
            success: true,
            message: null
        });
    } else {
        res.send({
            success: false,
            message: "Что-то пошло не так. Ни одна запись не удалена."
        });
    }
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Телефонная книга'});
});

module.exports = router;
