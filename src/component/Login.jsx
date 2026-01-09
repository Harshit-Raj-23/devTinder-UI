import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice.js";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants.js";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("harshit@gmail.com");
  const [password, setPassword] = useState("Harshit@23");
  const [error, setError] = useState("");

  const handleLogin = async (params) => {
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

  return (
    <div className="flex justify-center items-center pt-16">
      <div className="bg-neutral w-[25%] rounded-xl p-8">
        <h1 className="text-2xl font-bold text-center">Login</h1>
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
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
