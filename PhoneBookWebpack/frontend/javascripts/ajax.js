import $ from "jquery";

export default {
    post: function post(url, data) {
        return $.post({
            url: url,
            data: JSON.stringify(data),
            contentType: "application/json"
        });
    },

    get: function get(url, data) {
        return $.get(url, data);
    }
}



