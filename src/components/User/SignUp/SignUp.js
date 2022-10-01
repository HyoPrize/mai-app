import { useSelector } from "react-redux";

const SignUp = () => {
    const userSign = useSelector((state) => state.userSign.userSign);

    return <div hidden={userSign !== "signUp"}> signUp </div>;
};

export default SignUp;
