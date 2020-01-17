import Ajax from "./ajax";

export default {
    addContact(contact) {
        return Ajax.post("/addContact", contact);
    },
    getContacts(term) {
        var data = {
            term: term
        };

        return Ajax.get("/getContacts", data);
    },
    deleteContact(contact) {
        var data = {
            id: contact.id
        };

        return Ajax.post("/deleteContact", data);
    },
    deleteCheckedContacts(mustBeDeleted) {
        var data = {
            mustDeleted: mustBeDeleted
        };

        return Ajax.post("/deleteCheckedContacts", data);
    }
}