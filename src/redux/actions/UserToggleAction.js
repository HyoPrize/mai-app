const OPEN = "OPEN";
const CLOSE = "CLOSE";

export const openUserToggle = () => {
    return {
        type: OPEN,
    };
};

export const closeUserToggle = () => {
    return {
        type: CLOSE,
    };
};
