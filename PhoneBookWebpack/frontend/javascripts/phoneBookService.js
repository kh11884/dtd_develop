import Ajax from "./ajax";

export default {
    addContact(contact) {
        return Ajax.post("/addContact", contact);
    },
    getContacts(term) {
        const data = {
            term: term
        };
        return Ajax.get("/getContacts", data);
    },
    deleteContact(contact) {
        const data = {
            id: contact.id
        };
        return Ajax.post("/deleteContact", data);
    },
    deleteCheckedContacts(mustBeDeleted) {
        const data = {
            mustDeleted: mustBeDeleted
        };
        return Ajax.post("/deleteCheckedContacts", data);
    }
}