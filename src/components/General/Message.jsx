export default function Message(props) {
  const { message, userData } = props;

  return (
    <>
      {userData.id == message.user_id ? (
        <>
          <div className="mt-[4px] flex justify-end items-center">
            <div className="rounded-lg px-[10px] py-[5px] bg-slate-400 text-white">
              {message.content}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mt-[4px] flex items-center justify-start">
            <div className="rounded-lg px-[10px] bg-slate-100 py-[5px] text-slate-700">
              {message.content}
            </div>
          </div>
        </>
      )}
    </>
  );
}
