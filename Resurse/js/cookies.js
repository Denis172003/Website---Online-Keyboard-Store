function setCookie(name, value, expireTime){ // expireTime in milliseconds
    let date = new Date();
    date.setTime(date.getTime() + expireTime);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

function getCookie(name){
    let cookieArray = document.cookie.split(";"); // ["name=value", "name2=value2"]
    for(let cookie of cookieArray){
        let [cookieName, cookieValue] = cookie.trim().split("=");
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}

function deleteCookie(name){
    document.cookie = `${name}=; expires=${(new Date(0)).toUTCString()}; path=/`;
}

window.addEventListener("load", function(){
    if (getCookie("acceptat_banner")) {
        document.getElementById("banner").style.display = "none";
    }

    document.getElementById("ok_cookies").onclick = function(){
        setCookie("acceptat_banner", true, 60000); // Cookie expires in 60 seconds
        document.getElementById("banner").style.display = "none";
    }
});
