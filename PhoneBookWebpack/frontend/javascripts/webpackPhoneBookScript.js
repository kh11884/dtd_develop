import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/style.scss";
import Vue from "vue";
import "bootstrap";
import PhoneBook from "./phoneBook.vue";

new Vue({
    el: "#app",
    components: {
        "phone-book": PhoneBook
    }
});

