import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../store/feedSlice.js";

const UserCard = ({ user }) => {
  if (!user) return;
  const dispatch = useDispatch();
  const { _id, firstName, lastName, age, gender, photoUrl, about } = user;

  const handleSendRequest = async (status, userId) => {
    const res = await axios.post(
      BASE_URL + "/request/send/" + status + "/" + userId,
      {},
      { withCredentials: true }
    );
    dispatch(removeUserFromFeed(user._id));
  };

  return (
    user && (
      <div className="card bg-neutral w-72 shadow-sm">
        <figure>
          <img src={photoUrl} alt={firstName} />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-2xl">
            {firstName} {lastName}
          </h2>
          <p>{age + ", " + gender}</p>
          <p>{about}</p>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", user._id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", user._id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default UserCard;
