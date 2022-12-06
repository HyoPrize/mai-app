import { useSelector } from "react-redux";

const UserInfoPage = () => {
    const userPageState = useSelector((state) => state.userPageState.userPageState);
    return <div hidden={userPageState !== "userInfo"}>user info</div>;
};

export default UserInfoPage;
