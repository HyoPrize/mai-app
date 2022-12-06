import styled from "styled-components";
import { useEffect, useState } from "react";
import { coord2Addr, coord2Str } from "utils/kakaoUtil";

const PositionLabelDiv = styled("div")`
    position: absolute;
    top: 80px;
    left: 10px;
    width: 225px;
    height: 36px;

    display: flex;
    align-items: center;
    cursor: pointer;
`;

const PositionLabelTextDiv = styled("div")`
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;

    :hover {
        overflow: visible;
    }
`;

const PositionLabel = (props) => {
    const [isAddress, setIsAddress] = useState(false);
    const [address, setAddress] = useState("");

    const onClickButton = () => {
        setIsAddress((current) => !current);
    };

    useEffect(() => {
        const setAddressFromCoord2Addr = async () => {
            const data = await coord2Addr(props.lat, props.lon);
            setAddress(data);
        };
        setAddressFromCoord2Addr();
    }, []);

    return (
        <PositionLabelDiv className="clickable-text">
            {isAddress ? (
                <>
                    <div className="clickable-text-hover" onClick={onClickButton} style={{ padding: "8px" }}>
                        경위도
                    </div>
                    <div>
                        {coord2Str(props.lon)} <br></br> {coord2Str(props.lat)}
                    </div>
                </>
            ) : (
                <>
                    <div className="clickable-text-hover" onClick={onClickButton} style={{ padding: "15px" }}>
                        주소
                    </div>
                    <PositionLabelTextDiv>{address}</PositionLabelTextDiv>
                </>
            )}
        </PositionLabelDiv>
    );
};

export default PositionLabel;
