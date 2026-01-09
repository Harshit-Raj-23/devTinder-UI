import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./component/Body.jsx";
import Feed from "./component/Feed.jsx";
import Login from "./component/Login.jsx";
import Profile from "./component/Profile.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
