import { useSelector } from "react-redux";

const SignIn = (props) => {
    const userSign = useSelector((state) => state.userSign.userSign);

    return <div hidden={userSign !== "signIn"}> signIn </div>;
};

export default SignIn;
