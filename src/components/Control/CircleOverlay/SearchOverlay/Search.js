import styled from "styled-components";
import Select from "react-select";
import { searchableKeywords } from "utils/publicData";

const SearchDiv = styled("div")`
    position: absolute;
    top: 35px;
    left: 10px;
    width: 190px;
`;

const Search = (props) => {
    const onChangeSelect = (value) => {
        props.setKeywordValue(value.value);
    };
    return (
        <SearchDiv>
            <Select
                defaultValue={searchableKeywords.filter((keyword) => keyword.value === props.keywordValue)}
                options={searchableKeywords}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        primary25: "#FFB17A90",
                        primary: "#FFB17A",
                    },
                })}
                onChange={onChangeSelect}
            ></Select>
        </SearchDiv>
    );
};

export default Search;
