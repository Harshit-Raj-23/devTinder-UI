const ConnectionCard = ({ connection }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = connection;
  return (
    <div className="flex">
      <div>
        <img className="size-16 rounded-box" src={photoUrl} />
      </div>
      <div className="ml-6">
        <div className="text-xl">{firstName + " " + lastName}</div>
        {age && gender && (
          <div className="text-xs uppercase font-semibold opacity-60">
            {age + ", " + gender}
          </div>
        )}
        <p className="mt-2 opacity-80">{about}</p>
      </div>
    </div>
  );
};

export default ConnectionCard;
