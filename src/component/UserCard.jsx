import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, photoUrl, about } = user;
  return (
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
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
