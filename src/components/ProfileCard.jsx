import UserPng from "../assets/user.png";

export default function ProfileCard(props) {
  const { userData } = props;
  return (
    <>
      <div className="bg-white rounded-md p-6">
        <div className="flex items-center font-medium text-md text-slate-700 pb-4 border-b-[1px]">
          <img
            className="place-self-center w-14 h-14 rounded-full mr-4"
            src={UserPng}
            alt="Profile"
          />
          <div className="">{userData.name}</div>
        </div>

        <div className="pt-4">{userData.email}</div>
        <div className="pt-2">{userData.email}</div>
        <div className="pt-2">{userData.email}</div>
      </div>
    </>
  );
}
