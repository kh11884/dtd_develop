var data = JSON.stringify({"subscription":"ind_memo","request":{"from":1577725200000,"to":1578330000000,"deps":["PEK","HKG","PVG","CAN"],"arrs":[],"transits":[],"flts":[],"acs":[],"regs":[],"airLineType":"ALL"}});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        var res = this.response;
        console.log(res);
    }
});

xhr.open("POST", "https://smi-new.s7.aero/rest/init/activities_chart");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Cookie", "amlbcookie=01; INGRESSCOOKIE=3a9fc0bf7c32ad70f32b99d6442cfc25; iPlanetDirectoryPro=AQIC5wM2LY4SfcxGWG-sowBvNpuD_y1sQ0KjDlXAfd1SvF8.*AAJTSQACMDIAAlNLABQtNzMzOTAwNzIwMTI5MzE5NTI0NAACUzEAAjAx*; _pk_ref.4.ec1a=%5B%22%22%2C%22%22%2C1578276145%2C%22http%3A%2F%2Ffis.s7.aero%2Ffis%2Fapp%2Findex.xhtml%3Fw%3Dd4c033b6-1d34-43d9-8b28-62108e684c46%22%5D; _pk_ses.4.ec1a=*; s7_jwt_access=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJzdWIiOiI0MDYiLCJsbiI6Ilx1MDQyNVx1MDQzZVx1MDQ0MFx1MDQzZVx1MDQ0OFx1MDQ0M1x1MDQzZFx1MDQzZVx1MDQzMiIsImZuIjoiXHUwNDEwXHUwNDNkXHUwNDM0XHUwNDQwXHUwNDM1XHUwNDM5IiwibW4iOiJcdTA0MTJcdTA0MzBcdTA0M2JcdTA0MzVcdTA0NDBcdTA0NGNcdTA0MzVcdTA0MzJcdTA0MzhcdTA0NDciLCJiZCI6IjE5NzgtMDgtMDciLCJlbSI6ImEua2hvcm9zaHVub3ZAczcucnUiLCJhZCI6ImEua2hvcm9zaHVub3ZAZ3JvdXAuczciLCJjZiI6IjMxMzYiLCJleHAiOjE1NzgyNzc5NDksImlzcyI6ImludHJhLnM3LmFlcm8ifQ.kXiEi6r5n0rZvJZPdWp1KmjzpUhOj5Cml-hS8CU7QMDK8R79KSzlj2PL3wIy1QVZmmHWVEyT_ku54aqqkdmgkYXCRj3aaNocHj813kEexoB7lLfOaBk8YYlrxioYXglEJrXJPXf7GEkjLqFAE_RU3muZuNCnuOPJ-_IjxMXio4EohM5G2kl_HG1nghQJFM1y9LUxWfDYEv7uu9PaQ0wzkL-O3d-xWMW6i3mvik6u1L3ztLwjlmMLOCxVrnKgkl_ipqXolRD63CS6yi2-Gt-MeBk3HWZ7TQYClwNX2kVH1DAyhA5_E_A5MJmsTnbAUNPo2DmUUED-aTkbwp1ir0aPCQ; s7_jwt_refresh=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJzdWIiOiI0MDYiLCJleHAiOjE1NzgzMTkzNDksImlzcyI6ImludHJhLnM3LmFlcm8iLCJqdGkiOiJzN19qd3RfNDA5MDExMCJ9.ct0x3ldcc21K1niIqCiO9-J4L7GC4ly177aPCmFH2iMRSHOX9hwAI8ht46qC4LAHSQKZ-VJKu1ssovOMuW0vix3-FANGv8nOBuVHGWpMkMmg6xtOOmD8GMhCKDiwWoeDSfnY4pw1uaWB4RWbGf9fXCY1T08jUAzRsVzxkk1llPOL-TgpP-W5AgafqqbtVkqWvEexYFqPKMjIfZOsotZ6VC2m1h-JvLkOcbfOdMo7FXJ_1xFmAbamPW3E51ziI5QRC3sCYX4ryjHZgva_ItjBLhleGXddqR2xbW5HBIMy8JlkDNNSXyxqEYrQEbL64zUYeOheMdOpyyjazMpQoLN7ug; _pk_id.4.ec1a=13f0373ae2a1c429.1558577286.83.1578276154.1578276145.");
xhr.setRequestHeader("User-Agent", "PostmanRuntime/7.21.0");
xhr.setRequestHeader("Accept", "*/*");
xhr.setRequestHeader("Cache-Control", "no-cache");
xhr.setRequestHeader("Postman-Token", "ccc335c6-0ab4-4682-a8d1-bd710399b915");
xhr.setRequestHeader("Host", "smi-new.s7.aero");
xhr.setRequestHeader("Accept-Encoding", "gzip, deflate");
xhr.setRequestHeader("Content-Length", "185");
xhr.setRequestHeader("Connection", "keep-alive");

xhr.send(data);