const { kakao } = window;
const geocoder = new kakao.maps.services.Geocoder();
const ps = new kakao.maps.services.Places();

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

export const placeSearchPromise = (keyword, searchOption) => {
    return new Promise((resolve, reject) => {
        const placeIdList = [];
        ps.keywordSearch(
            keyword,
            (data, status, pagination) => {
                if (pagination && pagination.totalCount > 0 && pagination.current < pagination.last) {
                    searchOption["page"] = pagination.current + 1;
                    ps.keywordSearch(
                        keyword,
                        (data, status, pagination) => {
                            if (pagination && pagination.totalCount > 0 && pagination.current < pagination.last) {
                                searchOption["page"] = pagination.current + 1;
                                ps.keywordSearch(
                                    keyword,
                                    (data, status, pagination) => {
                                        if (
                                            pagination &&
                                            pagination.totalCount > 0 &&
                                            pagination.current < pagination.last
                                        ) {
                                            searchOption["page"] = pagination.current + 1;
                                            ps.keywordSearch(
                                                keyword,
                                                (data, status, pagination) => {
                                                    if (status === kakao.maps.services.Status.OK) {
                                                        for (var i = 0; i < data.length; i++) {
                                                            placeIdList.push(data[i].id);
                                                        }
                                                    } else {
                                                        resolve(placeIdList);
                                                    }
                                                },
                                                searchOption
                                            );
                                        } else {
                                            resolve(placeIdList);
                                        }
                                        if (status === kakao.maps.services.Status.OK) {
                                            for (var i = 0; i < data.length; i++) {
                                                placeIdList.push(data[i].id);
                                            }
                                        }
                                    },
                                    searchOption
                                );
                            } else {
                                resolve(placeIdList);
                            }
                            if (status === kakao.maps.services.Status.OK) {
                                for (var i = 0; i < data.length; i++) {
                                    placeIdList.push(data[i].id);
                                }
                            }
                        },
                        searchOption
                    );
                } else {
                    resolve(placeIdList);
                }
                if (status === kakao.maps.services.Status.OK) {
                    for (var i = 0; i < data.length; i++) {
                        placeIdList.push(data[i].id);
                    }
                }
            },
            searchOption
        );
    });
};

export const placeSearch = async (keyword, lat, lon, distance) => {
    const searchOption = {
        location: new kakao.maps.LatLng(lat, lon),
        radius: distance,
        sort: kakao.maps.services.SortBy.DISANCE,
        page: 1,
    };
    return await placeSearchPromise(keyword, searchOption);
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
