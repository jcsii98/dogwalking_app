export default function DashPage(props) {
  const { userData } = props;
  return (
    <>
      <div className="w-[1400px] h-full flex">
        <div className="">
          <div className="bg-white rounded-md">
            <div className="">{userData.name}</div>
            <div className="">{userData.name}</div>
            <div className="">{userData.name}</div>
            <div className="">{userData.name}</div>
          </div>
        </div>
        <div className="">
          <div className="bg-white"></div>
        </div>
      </div>
    </>
  );
}
