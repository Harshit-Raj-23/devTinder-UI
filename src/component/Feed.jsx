import axios from "axios";
import UserCard from "./UserCard.jsx";
import { BASE_URL } from "../utils/constants.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice.js";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (feed) return;
    const res = await axios.get(BASE_URL + "/user/feed", {
      withCredentials: true,
    });
    dispatch(addFeed(res?.data?.data));
  };

  useEffect(() => {
    getFeed();
  }, []);

  return <div>{feed && <UserCard user={feed[0]} />}</div>;
};

export default Feed;
