export const SET_USER_IMAGESRC = "SET_USER_IMAGESRC";

export const setUserImageSrc = (imageSrc) => {
    return {
        type: SET_USER_IMAGESRC,
        payload: imageSrc,
    };
};
