import Link from "next/link";

const AuthorCard = ({ creator }) => {
  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm p-5 flex flex-row items-center gap-4 my-6">
      <img
        src={creator.photo}
        alt={creator.name}
        className="w-16 h-16 rounded-full ring ring-primary ring-offset-2"
      />
      <div className="flex-1">
        <h3 className="font-bold">{creator.name}</h3>
        <p className="text-sm text-base-content/60">{creator.lessonsCount} lessons created</p>
      </div>
      <Link href={`/profile/${creator.id}`} className="btn btn-sm btn-outline btn-primary">
        View Profile
      </Link>
    </div>
  );
};

export default AuthorCard;