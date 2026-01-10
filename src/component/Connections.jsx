import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../store/connectionSlice.js";
import { useEffect } from "react";
import ConnectionCard from "./ConnectionCard.jsx";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const getConnections = async () => {
    const res = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });
    dispatch(addConnections(res?.data?.data));
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return <h1 className="text-xl text-center mt-6">No connections found</h1>;

  return (
    connections && (
      <div className="flex justify-center mt-10">
        <ul className="list bg-neutral rounded-box shadow-md w-1/3">
          <li className="p-4 pb-2 text-2xl text-center">My Connections</li>
          {connections.map((connection) => (
            <li key={connection._id} className="list-row">
              <ConnectionCard connection={connection} />
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default Connections;
