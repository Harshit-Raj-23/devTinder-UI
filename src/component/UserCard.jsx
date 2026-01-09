import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="flex justify-center items-center mt-24">
      <div className="card card-side bg-neutral shadow-sm p-4 w-[40%]">
        <figure>
          <img src={user?.photoUrl} alt={user?.firstName} />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-2xl">
            {user?.firstName} {user?.lastName}
          </h2>
          <p>{user?.about}</p>
          <p>{user?.age + ", " + user?.gender}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-secondary">Ignore</button>
            <button className="btn btn-primary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
