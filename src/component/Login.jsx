import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice.js";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants.js";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center pt-16">
      <div className="bg-neutral w-[25%] rounded-xl p-8">
        <h1 className="text-2xl font-bold text-center">
          {isLoginForm ? "Login" : "Sign Up"}
        </h1>
        {!isLoginForm && (
          <div className="flex w-full justify-between">
            <fieldset className="fieldset w-[48%]">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                value={firstName}
                className="input"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset w-[48%]">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
                value={lastName}
                className="input"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>
          </div>
        )}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Email</legend>
          <input
            type="email"
            value={email}
            className="input"
            placeholder="Email here..."
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Password</legend>
          <input
            type="password"
            value={password}
            className="input"
            placeholder="Password here..."
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        {error && <p className="text-red-600 mt-4">{error}</p>}
        <button
          className="btn bg-white text-black w-full mt-4"
          onClick={isLoginForm ? handleLogin : handleSignUp}
        >
          {isLoginForm ? "Login" : "Sign Up"}
        </button>
        <p
          className="text-sm mt-2 cursor-pointer"
          onClick={() => setIsLoginForm((value) => !value)}
        >
          {isLoginForm ? "New user? Sign Up" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default Login;
