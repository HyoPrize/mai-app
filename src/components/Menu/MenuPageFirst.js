import styled from "styled-components";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Typography, Box, Tabs, Tab, TextField } from "@mui/material";
import { useState } from "react";
import Favorite from "components/Menu/Favorite/Favorite";
import History from "components/Menu/History/History";
import Share from "components/Menu/Share/Share";
import SearchBar from "./SearchBar/SearchBar";
import useMUIStyles from "styles/MUIStyles";

const MenuPageFirstDiv = styled("div")`
    position: absolute;

    top: 0px;
    width: 400px;
    height: 100%;
    z-index: 1;
    background-color: #fffded95;
    border-right: 2px solid grey;
    ul {
        list-style: none;
        padding-left: 0px;
        margin-top: 0px;
    }

    transition: all 500ms cubic-bezier(0.25, 0.1, 0.25, 1);
    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
`;

function TabPanel(props) {
    return (
        <div
            role="tabpanel"
            hidden={props.value !== props.index}
            id={`simple-tabpanel-${props.index}`}
            aria-labelledby={`simple-tab-${props.index}`}
            {...props}
        >
            {props.value === props.index && (
                <Box>
                    <Typography component={"div"}>{props.children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

function MenuPageFirst(props) {
    const { menuLevel } = useSelector((state) => state.menuLevel);
    const [tabValue, setTabValue] = useState(0);
    const classes = useMUIStyles();

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const getPixelFromMenuLevel = () => {
        switch (menuLevel) {
            case 0:
            case 3:
                return "-402px";
            case 1:
                return "0px";
            default:
                return "0px";
        }
    };

    return (
        <Box>
            <MenuPageFirstDiv style={{ left: getPixelFromMenuLevel() }}>
                MUI
                <SearchBar></SearchBar>
                <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    TabIndicatorProps={{
                        style: { background: "#ffb17a" },
                    }}
                    classes={{ textColor: classes.customStyleOnTab }}
                >
                    <Tab
                        style={{ minWidth: "0px", padding: "0", display: "flex", flex: "1" }}
                        label={
                            <span className={tabValue === 0 ? classes.activeTab : classes.customStyleOnTab}>
                                즐겨찾기
                            </span>
                        }
                        {...a11yProps(0)}
                    />
                    <Tab
                        style={{ minWidth: "0px", padding: "0", display: "flex", flex: "1" }}
                        label={
                            <span className={tabValue === 1 ? classes.activeTab : classes.customStyleOnTab}>
                                검색기록
                            </span>
                        }
                        {...a11yProps(1)}
                    />
                    <Tab
                        style={{ minWidth: "0px", padding: "0", display: "flex", flex: "1" }}
                        label={
                            <span className={tabValue === 2 ? classes.activeTab : classes.customStyleOnTab}>공유</span>
                        }
                        {...a11yProps(2)}
                    />
                </Tabs>
                <TabPanel value={tabValue} index={0}>
                    <Favorite />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <History />
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    <Share />
                    Item Three
                </TabPanel>
            </MenuPageFirstDiv>
        </Box>
        // <StyledMenuList style={{ left: getPixelFromMenuLevel() }}>
        //     <ul>{props.children}</ul>
        // </StyledMenuList>
        // <div>
        //     <MenuListNav style={{ left: getPixelFromMenuLevel() }} {...props}>
        //         <ul>{props.children}</ul>
        //     </MenuListNav>
        // </div>
    );
}

export default MenuPageFirst;
