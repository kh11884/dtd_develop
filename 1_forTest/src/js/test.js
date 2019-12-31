var data = JSON.stringify({"subscription":"ind_memo","request":{"from":1577725200000,"to":1578330000000,"deps":["PEK","HKG","PVG","CAN"],"arrs":[],"transits":[],"flts":[],"acs":[],"regs":[],"airLineType":"ALL"}});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        console.log(this.responseText);
    }
});

xhr.open("POST", "https://smi-new.s7.aero/rest/init/activities_chart");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Cookie", "_pk_id.<%=htmlWebpackPlugin.options.params.matomoSiteId %>.ec1a=dc5e844bf07aa3ae.1558519091.0.1558519091..; amlbcookie=01; iPlanetDirectoryPro=AQIC5wM2LY4Sfcyg90o9E_YHig5LcN6o7FiBV6tD_qfDpEQ.*AAJTSQACMDIAAlNLABQtMzc5MzUyMTczMzU4NDkxNDcwNwACUzEAAjAx*; INGRESSCOOKIE=3a9fc0bf7c32ad70f32b99d6442cfc25; s7_jwt_refresh=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJzdWIiOiI0MDYiLCJleHAiOjE1Nzc3MjI5MjQsImlzcyI6ImludHJhLnM3LmFlcm8iLCJqdGkiOiJzN19qd3RfMzkyOTg0NCJ9.fYsO17do_T_b_omoyM8gQHTueMAiuSH1-krux0p4CQl3-O2uyCsRRuk2_iwpgvKDQ6JPqihj1R91iFy8IVHY2ItxkWFegOfC3WBWazdHPdJyV6CcXeRpilZk-2fa7Grh72KusZsDz7eockv2Hz2cv9nWWnW8BGGbKpb3Gbvf0Xva-AdRo-sL7gPrH6ZMqFQrHxmraj7qSiMU_JGpZW3AcAXtgHBKxKb1Y-epKpNL3eeq4nY-0JN55xf8uae-6v17W71FJvrwqML6FR7rgP0DkaIPBLT6aUMjxAGhhN9gMvTXrjVzVvV_-KKrP-vrlmAWDcrAirp3uRLFOYyzhhbKdQ; _pk_ref.4.ec1a=%5B%22%22%2C%22%22%2C1577682005%2C%22https%3A%2F%2Fsso.s7.aero%2FOpenAM%2FUI%2FLogin%3Fgoto%3Dhttps%3A%2F%2Fsmi-new.s7.aero%2Fchart%26realm%3DS7%26gx_charset%3DUTF-8%22%5D; _pk_id.4.ec1a=13f0373ae2a1c429.1557129066.128.1577682005.1577682005.; _pk_ses.4.ec1a=*");
xhr.setRequestHeader("User-Agent", "PostmanRuntime/7.21.0");
xhr.setRequestHeader("Accept", "*/*");
xhr.setRequestHeader("Cache-Control", "no-cache");
xhr.setRequestHeader("Postman-Token", "ccc335c6-0ab4-4682-a8d1-bd710399b915");
xhr.setRequestHeader("Host", "smi-new.s7.aero");
xhr.setRequestHeader("Accept-Encoding", "gzip, deflate");
xhr.setRequestHeader("Content-Length", "185");
xhr.setRequestHeader("Connection", "keep-alive");

xhr.send(data);