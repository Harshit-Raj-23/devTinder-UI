import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("harshit@gmail.com");
  const [password, setPassword] = useState("Harshit@23");

  const handleLogin = async (params) => {
    const res = await axios.post(
      "http://localhost:7777/login",
      { email, password },
      { withCredentials: true }
    );
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
