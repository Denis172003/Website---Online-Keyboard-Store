// JavaScript (cookies.js)
function setCookie(name, value, expirySeconds) {
    var d = new Date();
    d.setTime(d.getTime() + (expirySeconds * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookies = decodedCookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(name + "=") == 0) {
            return cookie.substring(name.length + 1, cookie.length);
        }
    }
    return "";
}

function deleteCookie(name) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        deleteCookie(name);
    }
}

window.addEventListener("load", function () {
    setCookie("ultima_pagina_accesata", document.URL.split("/").pop(), 60);

    var okCookiesButton = document.getElementById("ok_cookies");
    if (okCookiesButton) {
        okCookiesButton.onclick = function () {
            setCookie("acceptat_banner", true, 60);
            var banner = document.getElementById("banner");
            if (banner) {
                banner.style.display = "none";
            }
        };
    }

    document.getElementById("ultima-pagina-accesata").innerHTML = getCookie("ultima_pagina_accesata");
});

window.addEventListener("DOMContentLoaded", function () {
    var banner = document.getElementById("banner");
    if (!getCookie("acceptat_banner")) {
        if (banner) {
            banner.style.display = "flex";
        }
    }
});