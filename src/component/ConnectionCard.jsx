import { Link } from "react-router-dom";

const ConnectionCard = ({ connection }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;
  return (
    <div className="flex flex-row">
      <img className="flex-1 size-16 rounded-box" src={photoUrl} />
      <div className="flex-2 ml-6">
        <div className="text-xl">{firstName + " " + lastName}</div>
        {age && gender && (
          <div className="text-xs uppercase font-semibold opacity-60">
            {age + ", " + gender}
          </div>
        )}
        <p className="mt-2 opacity-80">{about}</p>
      </div>
      <div className="flex-3 ">
        <Link to={"/chat/" + _id} className="btn btn-primary">
          Chat
        </Link>
      </div>
    </div>
  );
};

export default ConnectionCard;
