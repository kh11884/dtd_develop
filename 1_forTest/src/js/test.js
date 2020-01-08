//TODO: добавить первый запрос с авторизацией на странице.

var data = JSON.stringify({"subscription":"ind_memo","request":{"from":1546275600000, "to": 1546448400000,"deps":["PEK","HKG","PVG","CAN"],"arrs":[],"transits":[],"flts":[],"acs":[],"regs":[],"airLineType":"ALL"}});

var xhr = new XMLHttpRequest();
xhr.crossDomain = true;
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        var res = this.response;
        console.log(res);
    }
});

xhr.open("POST", "https://smi-new.s7.aero/rest/init/activities_chart");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Cookie", "INGRESSCOOKIE=921bfb650e3b8e26de3031b9db6e5ac5; s7_jwt_refresh=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJzdWIiOiI0MDYiLCJleHAiOjE1Nzg0MjU4ODIsImlzcyI6ImludHJhLnM3LmFlcm8iLCJqdGkiOiJzN19qd3RfNDEwODQwOSJ9.Hoc0LPBVUQN-mqUV_1V-fIVF5ui5ZmZYb2lF-ZZ_om8EE4T2LzbP356DNLPXx3SAm47nmZ2-VQR7OggdH_UP4zeJlK_7-4iV27kslyERwuVbxhRP37PFSvQpaxOfDGpWPLQDAzOX8aUGE0u2-dxgiY-x-0-HlcBjF5KEa7i0heIonXconhU3JeOFHbjzLva5T087r8IUU_ebzlKF5XdJVXVBZIOwyE3Ko1g4M_Ki34CsZdnVdsv3iWeHo8qkcSv6VlJn98nofc04qeiBuBAUYYiSVruxo7t0_pJcOdQ9hkH9TUIhar6lREBhYWj1kXLWFWWuikhGbbRPTh2sf7NhfQ; _pk_ref.4.ec1a=%5B%22%22%2C%22%22%2C1578390860%2C%22http%3A%2F%2Ffis.s7.aero%2Ffis%2F%3Fw%3D5bcb1539-36c5-4d92-9625-d92de243bbfc%22%5D; _pk_ses.4.ec1a=*; s7_jwt_access=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJzdWIiOiI0MDYiLCJsbiI6Ilx1MDQyNVx1MDQzZVx1MDQ0MFx1MDQzZVx1MDQ0OFx1MDQ0M1x1MDQzZFx1MDQzZVx1MDQzMiIsImZuIjoiXHUwNDEwXHUwNDNkXHUwNDM0XHUwNDQwXHUwNDM1XHUwNDM5IiwibW4iOiJcdTA0MTJcdTA0MzBcdTA0M2JcdTA0MzVcdTA0NDBcdTA0NGNcdTA0MzVcdTA0MzJcdTA0MzhcdTA0NDciLCJiZCI6IjE5NzgtMDgtMDciLCJlbSI6ImEua2hvcm9zaHVub3ZAczcucnUiLCJhZCI6ImEua2hvcm9zaHVub3ZAZ3JvdXAuczciLCJjZiI6IjMxMzYiLCJleHAiOjE1NzgzOTI2NjQsImlzcyI6ImludHJhLnM3LmFlcm8ifQ.nbHMuXZH1XaVNof3uXC0c2nPvnZZyJZGjVlNcDNO12l_Kgooi3uvfIY_XSVNWGYmsAWWHBmm-z01hsCdt7p1FP2ZyH0FeSWN7N4psN6B102KiQpZrS_tEFkDYOcHxqTWjxQFJGBVAOzkUpWHr3Jfxb_3uSnX4ODP4qlDX9Y6mzSw1rrJkW6rqEoYIWxMyIbWw2C3fGnILq82yjeh6Yy4cjFmmPhvWLiNBs6mp-SLl038wHNFHG3-ByCsJWN_gUadYy_WOsmJLwZrCRZi-AczbFjlghjZ96RlZJege70CrOtWsxbZV3A_87wmckgZjz66hdQNXr35O1l2NEltgMiDMg; amlbcookie=01; iPlanetDirectoryPro=AQIC5wM2LY4Sfcy0Qaz6RM-zqjw4Lch8ZzcbtOWVtnI74L0.*AAJTSQACMDIAAlNLABQtNzgxNDAwNDI4MTE1NjM0NTU0MwACUzEAAjAx*; _pk_id.4.ec1a=13f0373ae2a1c429.1558577286.86.1578392173.1578390860.");
//xhr.setRequestHeader("User-Agent", "PostmanRuntime/7.21.0");
xhr.setRequestHeader("Accept", "*/*");
xhr.setRequestHeader("Cache-Control", "no-cache");
xhr.setRequestHeader("Postman-Token", "ccc335c6-0ab4-4682-a8d1-bd710399b915");
//xhr.setRequestHeader("Host", "smi-new.s7.aero");
//xhr.setRequestHeader("Accept-Encoding", "gzip, deflate");
//xhr.setRequestHeader("Content-Length", "185");
//xhr.setRequestHeader("Connection", "keep-alive");

xhr.send(data);