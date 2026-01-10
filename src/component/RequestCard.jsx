import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants.js";
import { useDispatch } from "react-redux";
import { removeRequests } from "../store/requestSlice.js";

const RequestCard = ({ request }) => {
  const dispatch = useDispatch();
  const requestId = request._id;
  const { firstName, lastName, age, gender, photoUrl, about } =
    request.fromUserId;

  const reviewRequest = async (status, requestId) => {
    const res = await axios.post(
      BASE_URL + "/request/review/" + status + "/" + requestId,
      {},
      { withCredentials: true }
    );
    dispatch(removeRequests(request));
  };

  return (
    <div className="flex justify-between items-center w-full">
      <div>
        <img className="size-16 rounded-box ml-1" src={photoUrl} />
      </div>
      <div className="text-left px-4">
        <div className="text-xl">{firstName + " " + lastName}</div>
        {age && gender && (
          <div className="text-xs uppercase font-semibold opacity-60">
            {age + ", " + gender}
          </div>
        )}
        <p className="list-col-wrap text-xs">{about}</p>
      </div>
      <div className="flex items-center">
        <button
          className="btn btn-primary mx-2"
          onClick={() => reviewRequest("rejected", requestId)}
        >
          Reject
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => reviewRequest("accepted", requestId)}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
