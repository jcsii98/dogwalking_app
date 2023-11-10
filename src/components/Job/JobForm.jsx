import { useState } from "react";

export default function JobForm(props) {
  const { userData, fetchJob, apiUrl } = props;
  const [activeTab, setActiveTab] = useState(1);
  const [jobPosted, setJobPosted] = useState(false);
  const [jobSaved, setJobSaved] = useState(false);
  const [jobFormData, setJobFormData] = useState({
    dog_walking_job: {
      name: `${userData.name}'s Dog-walking Job`,
      wgr1: "",
      wgr2: "",
      wgr3: "",
    },
  });
  const handleBegin = () => {
    setActiveTab(2);
  };

  const handleCancel = () => {
    setActiveTab(1);
  };

  const handleJobChange = (e) => {
    const { name, value } = e.target;
    setJobFormData((prevData) => ({
      ...prevData,
      dog_walking_job: {
        ...prevData.dog_walking_job,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");

    try {
      const response = await fetch(`${apiUrl}/dog_walking_jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          uid: uid,
          client: client,
          "access-token": accessToken,
        },
        body: JSON.stringify(jobFormData),
      });
      const data = await response.json();
      if (!data.id) {
        console.log("Error", data);
      } else {
        // handle successful response
        setJobPosted(true);
        await Promise.all([fetchJob()]);
        setJobSaved(true);
      }
      console.log(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  return (
    <>
      <div className="w-full">
        {" "}
        {activeTab == 1 && (
          <>
            <div className="flex flex-col justify-center">
              <div className="pb-4">
                <p className="font-bold text-slate-500 text-3xl">
                  There is no dog-walking job associated with this account.
                </p>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-slate-500 text-xl font-medium pb-4">
                  Set up your own dog-walking job to begin!
                </p>
                <button
                  onClick={handleBegin}
                  className="hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-slate-600 py-2 my-2 rounded-lg border-slate-600 border-[1px] px-4"
                >
                  Add Job
                </button>
              </div>
            </div>
          </>
        )}
        {activeTab == 2 && (
          <>
            <form className="flex flex-col">
              <div className="font-medium pb-2 text-slate-700">Rates</div>
              <div className="pb-4">
                <div className="font-medium pb-2 text-slate-700">
                  {"<"} 20 lbs
                </div>
                <input
                  value={jobFormData.dog_walking_job.wgr1}
                  name="wgr1"
                  onChange={handleJobChange}
                  type="number"
                  className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2"
                ></input>
              </div>
              <div className="pb-4">
                <div className="font-medium pb-2 text-slate-700">
                  {"<"} 60 lbs
                </div>
                <input
                  value={jobFormData.dog_walking_job.wgr2}
                  name="wgr2"
                  onChange={handleJobChange}
                  type="number"
                  className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2"
                ></input>
              </div>
              <div className="pb-4">
                <div className="font-medium pb-2 text-slate-700">
                  {">"} 60 lbs
                </div>
                <input
                  value={jobFormData.dog_walking_job.wgr3}
                  name="wgr3"
                  onChange={handleJobChange}
                  type="number"
                  className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2"
                ></input>
              </div>
              {!jobPosted && (
                <>
                  <div className="w-full flex space-x-4">
                    <button
                      onClick={handleCancel}
                      className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                      type="submit"
                    >
                      Post Job
                    </button>
                  </div>
                </>
              )}
            </form>
          </>
        )}
      </div>
    </>
  );
}
