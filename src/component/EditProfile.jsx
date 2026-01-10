import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard.jsx";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { addUser } from "../store/userSlice.js";

const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, photoUrl, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setInterval(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center my-7">
      <UserCard user={{ firstName, lastName, age, gender, photoUrl, about }} />
      <div className="card bg-neutral text-neutral-content w-96 shadow-xl ml-4">
        <div className="card-body p-5">
          <h2 className="card-title justify-center mb-2">Edit Profile</h2>
          <div className="w-full flex flex-col gap-3">
            <div className="flex gap-3 w-full">
              <fieldset className="fieldset w-full m-0">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input input-sm w-full"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input input-sm w-full"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
            </div>
            <div className="flex gap-3 w-full">
              <fieldset className="fieldset w-full m-0">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="number"
                  className="input input-sm w-full"
                  required
                  value={age}
                  min="13"
                  max="100"
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset w-full m-0">
                <legend className="fieldset-legend">Gender</legend>
                <select
                  value={gender || "default"}
                  className="select select-sm w-full"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option disabled={true}>Select an option</option>
                  <option value={"male"}>Male</option>
                  <option value={"female"}>Female</option>
                  <option value={"others"}>Others</option>
                </select>
              </fieldset>
            </div>
            <fieldset className="fieldset w-full m-0">
              <legend className="fieldset-legend">Photo URL</legend>
              <label className="input input-sm w-full flex items-center gap-2">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </g>
                </svg>
                <input
                  type="url"
                  required
                  className="grow"
                  value={photoUrl}
                  pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>
            </fieldset>
            <fieldset className="fieldset w-full m-0">
              <legend className="fieldset-legend">About</legend>
              <textarea
                className="textarea h-20 w-full"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </fieldset>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="card-actions justify-center">
            <button
              className="btn bg-white text-black w-full mt-4"
              onClick={saveProfile}
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
