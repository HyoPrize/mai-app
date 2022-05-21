import styled from "styled-components";

const MenuPageDiv = styled("div")`
    position: absolute;
    left: 250px;
    top: 0px;
    width: 500px;
    height: 100%;
    z-index: 1;
    border-left: 2px solid grey;
    border-right: 2px solid grey;

    background-color: #fffded95;
`;

function MenuPage(props) {
    return (
        <div>
            {props.menuLevel === 2 ? (
                <MenuPageDiv {...props}>
                    <ul>{props.children}</ul>
                </MenuPageDiv>
            ) : null}
        </div>
    );
}

export default MenuPage;
