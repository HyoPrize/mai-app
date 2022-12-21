const { kakao } = window;
const geocoder = new kakao.maps.services.Geocoder();

export const coord2Str = (val) => {
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
};

const coord2AddrPromise = (lat, lon) => {
    return new Promise((resolve, reject) => {
        geocoder.coord2Address(lon, lat, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
                resolve(result[0].address.address_name);
            } else {
                reject("kakao error");
            }
        });
    });
};

export const coord2Addr = async (lat, lon) => {
    const coord = new kakao.maps.LatLng(lat, lon);
    return await coord2AddrPromise(coord.getLat(), coord.getLng());
};

export const placeSearchInRadius = async (keyword, lat, lon, distance) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await fetch(
        `http://localhost:5001/places/search?keyword=${keyword}&lat=${lat}&lon=${lon}&distance=${distance}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: token,
            },
        }
    );
    const data = await response.json();
    return data.placeIdList;
};
