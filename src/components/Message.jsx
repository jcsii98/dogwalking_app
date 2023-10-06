export default function Message(props) {
  const { message, userData } = props;

  return (
    <>
      {userData.id == message.user_id ? (
        <>
          <div className="my-2 flex justify-end items-center">
            <div className="rounded-full px-[10px] py-[5px] bg-slate-400 text-white">
              <div className=""></div>
              {message.content}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="my-2 flex items-center justify-start">
            <div className="bg-white rounded-full px-[10px] py-[5px] text-slate-700">
              <div className=""></div>
              {message.content}
            </div>
          </div>
        </>
      )}
    </>
  );
}
