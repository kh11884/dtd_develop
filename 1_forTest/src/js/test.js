$(function () {
    var cookie = "_pk_id.<%=htmlWebpackPlugin.options.params.matomoSiteId %>.ec1a=dc5e844bf07aa3ae.1558519091.0.1558519091..; amlbcookie=01; INGRESSCOOKIE=a7478be3791bcf8477c3c99b5505c272; iPlanetDirectoryPro=AQIC5wM2LY4Sfcw-PeFY3xzKQt-ccH_8F_vQPZMdtERon5Y.*AAJTSQACMDIAAlNLABMxOTkwMTI2OTU1NTk0OTYyNzk1AAJTMQACMDE.*; s7_jwt_refresh=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJzdWIiOiI0MDYiLCJleHAiOjE1NzM0MjI5MTUsImlzcyI6ImludHJhLnM3LmFlcm8iLCJqdGkiOiJzN19qd3RfMzI3NzY5MyJ9.EJRDHaTi2RjeDvjvMvU-l3Q_sPlSPxYN7mjP3Zn-vXx22sutxn72ez-IfEM-BN7HDaRcoYsuC0sa6dagD5cifu4fZ9VPpC0cw8MYNQPe8oo_08a8AHxGnd660I436HHJk4CjSVtQO5dCX8aMcZGnVnhGoiTLKNBTl9jQHBxpWMorc6Owmy8ETvevwfgBub74EmXDP89fgHzPulVOiTGvt2axjcU1L9fWFus6mu-rjXO5Qs435O6EafEl7kWnt96m7iRqbVUSsozF56VnzCBGA7X_SZ22HkcUrIKD7tpxFDHfOIjFbxPvlpNqYU7vqKpeLswKSGrym04mM6bH4kq4Ug; _pk_ref.4.ec1a=%5B%22%22%2C%22%22%2C1573403567%2C%22https%3A%2F%2Fsso.s7.aero%2FOpenAM%2FUI%2FLogin%3Fgoto%3Dhttps%3A%2F%2Fsmi-new.s7.aero%2Fchart%26realm%3DS7%26gx_charset%3DUTF-8%22%5D; _pk_id.4.ec1a=13f0373ae2a1c429.1557129066.91.1573403567.1573403567.; _pk_ses.4.ec1a=*";

    var jsonData = {
         "subscription": "activities_chart",
        "request": {
            "from": 1573257600000,
            "to": 1573516799000,
            "deps": ["PEK"],
            "arrs": [],
            "transits": [],
            "flts": [],
            "acs": [],
            "regs": [],
            "airLineType": "ALL"
        }
    };


    var jqxhr = $.ajax("https://smi-new.s7.aero/rest/init/activities_chart", {
        method: "post",
        contentType: "application/json;charset=utf-8",
        dataType: "application/json; charset=UTF-8",
        data: JSON.stringify(jsonData),

        success: function (response) {
            alert(response.status);
        },
        error: function () {
            alert("error");
        }
    });
    console.log(jqxhr);
});
