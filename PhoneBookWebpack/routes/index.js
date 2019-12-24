var express = require('express');
var router = express.Router();

var contacts = [];
var id = 1;

router.get("/getContacts", function (req, res) {
    var term = (req.query.term || "").toUpperCase();
    var result = term === "" ? contacts : contacts.filter(function (contact) {
        return contact.firstName.toUpperCase().includes(term)||
            contact.lastName.toUpperCase().includes(term)||
            contact.phoneNumber.toUpperCase().includes(term)
    });
    res.send(result);
});

router.post("/addContact", function (req, res) {
    var contact = req.body;

    var haveNumber = contacts.some(function (c) {
        return c.phoneNumber === contact.phoneNumber;
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
    var mustBeDeleted = req.body.mustDeleted;
    var wasChanged = false;

    contacts = contacts.filter(function (contact) {
        if (!mustBeDeleted.includes(contact.id)) {
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
