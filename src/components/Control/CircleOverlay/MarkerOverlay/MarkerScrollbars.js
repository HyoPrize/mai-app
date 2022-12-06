const { Scrollbars } = require("react-custom-scrollbars-2");
const { useDispatch } = require("react-redux");
const { setMapZoomable } = require("redux/actions/MapAction");

const MarkerScrollbars = ({ children }) => {
    const dispatch = useDispatch();
    return (
        <Scrollbars
            onMouseEnter={() => dispatch(setMapZoomable(false))}
            onMouseLeave={() => dispatch(setMapZoomable(true))}
            style={{
                position: "absolute",
                width: "86%",
                height: "auto",
                top: "88px",
                bottom: "75px",
                marginLeft: "20px",
            }}
        >
            {children}
        </Scrollbars>
    );
};

export default MarkerScrollbars;
