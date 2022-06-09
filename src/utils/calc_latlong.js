function latlong(val) {
    if (val === null || typeof val === "undefined" || val === "") {
        return "";
    } else if (isNaN(val)) {
        return val;
    } else {
        var data = Math.round(val * 360000);
        var dosu = Math.floor(data / 360000);
        var min = Math.floor(data / 100) % 60;
        var sec = Math.floor(data / 6000) % 60;
        var amari = data % 100;

        return dosu + "˚" + min + "'" + sec + "." + amari + '"';
    }
}

export default latlong;
