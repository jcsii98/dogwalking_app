import { useState } from "react";

export default function JobForm(props) {
  const { userData, fetchJob, apiUrl } = props;
  const [activeTab, setActiveTab] = useState(1);

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
        await Promise.all([fetchJob()]);
      }
      console.log(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center">
        {" "}
        {activeTab == 1 && (
          <>
            <button
              onClick={handleBegin}
              className="font-medium hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
            >
              Add Job
            </button>
          </>
        )}
        {activeTab == 2 && (
          <>
            <form className="flex flex-col">
              <div className="font-medium pb-2 text-slate-700">Rates</div>
              <div className="pb-4">
                <div className="font-medium pb-2 text-slate-700">WGR1</div>
                <input
                  value={jobFormData.dog_walking_job.wgr1}
                  name="wgr1"
                  onChange={handleJobChange}
                  type="number"
                  className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2"
                ></input>
              </div>
              <div className="pb-4">
                <div className="font-medium pb-2 text-slate-700">WGR2</div>
                <input
                  value={jobFormData.dog_walking_job.wgr2}
                  name="wgr2"
                  onChange={handleJobChange}
                  type="number"
                  className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2"
                ></input>
              </div>
              <div className="pb-4">
                <div className="font-medium pb-2 text-slate-700">WGR3</div>
                <input
                  value={jobFormData.dog_walking_job.wgr3}
                  name="wgr3"
                  onChange={handleJobChange}
                  type="number"
                  className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2"
                ></input>
              </div>

              <div className="w-full">
                <button
                  onClick={handleSubmit}
                  className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                  type="submit"
                >
                  Save Job
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
}
