import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants.js";
import { addRequests } from "../store/requestSlice.js";
import RequestCard from "./RequestCard.jsx";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    !requests && getRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="text-xl text-center mt-6">No requests found</h1>;

  return (
    requests && (
      <div className="flex justify-center mt-10">
        <ul className="list bg-neutral rounded-box shadow-md w-[30%]">
          <li className="p-2 pb-2 text-2xl text-center">Requests Received</li>
          {requests.map((request) => (
            <li key={request._id} className="list-row w-full mx-auto">
              <RequestCard request={request} />
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default Requests;
