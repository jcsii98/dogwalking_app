import Dog3 from "../../assets/dog3.png";

export default function ResourceRestricted(props) {
  const { resource } = props;
  return (
    <>
      <div className="bg-white rounded-md p-6 border-slate-300 border-[1px] flex justify-center items-center">
        {resource == false && (
          <>
            <div className="flex items-center flex-col justify-center space-y-8">
              <div className="text-4xl font-black text-slate-500 text-center">
                Your account is still pending approval!
              </div>
              <img src={Dog3} className="h-20 w-20" />

              <div className="">
                To unlock full access and ensure a seamless experience, please
                complete your profile information for verification by our team.
              </div>
            </div>
          </>
        )}
        {resource == true && (
          <>
            <div className="flex items-center space-x-10">
              <div className="flex flex-col justify-center items-center">
                <div className="pb-6 text-6xl font-black text-slate-500">
                  Oops!
                </div>
                <img src={Dog3} className="h-20 w-20" />
              </div>
              <div className="flex flex-col space-y-4">
                <div className="">
                  This resource is exclusively available to verified members.
                </div>
                <div className="">
                  Your account is pending approval. To unlock full access and
                  ensure a seamless experience, please complete your profile
                  information for verification by our team.
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
