export const searchableKeywords = [
    { value: 0, label: "카페" },
    { value: 1, label: "맛집" },
    { value: 2, label: "치킨" },
];

export const getSearchableKeywordLabel = (value) => {
    return searchableKeywords.filter((keyword) => keyword.value === value)[0].label;
};
