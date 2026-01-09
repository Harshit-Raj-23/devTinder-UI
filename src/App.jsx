import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./component/Body.jsx";
import Feed from "./component/Feed.jsx";
import Login from "./component/Login.jsx";
import Profile from "./component/Profile.jsx";
import { Provider } from "react-redux";
import appStore from "./store/appStore.js";

const App = () => {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
