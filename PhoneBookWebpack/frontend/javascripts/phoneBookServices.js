import Ajax from "./ajax";

export default {
    addContact:function (contact) {
        return Ajax.post("/addContact", contact);
    },
    getContacts: function (term) {
        var data = {
            term: term
        };

        return Ajax.get("/getContacts", data);
    },
    deleteContact: function (contact) {
        var data = {
            id: contact.id
        };

        return Ajax.post("/deleteContact", data);
    },
    deleteCheckedContacts: function (mustBeDeleted) {
        var data = {
            mustDeleted: mustBeDeleted
        };

        return Ajax.post("/deleteCheckedContacts", data);
    }
}