import { RiDeleteBin6Line } from "react-icons/ri";
import { useState, useEffect } from "react";
export default function Job(props) {
  const { job, fetchJob, apiUrl } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [jobEditFormData, setJobEditFormData] = useState({
    dog_walking_job: {
      wgr1: "",
      wgr2: "",
      wgr3: "",
    },
  });
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setJobEditFormData((prevData) => ({
      ...prevData,
      dog_walking_job: {
        ...prevData.dog_walking_job,
        [name]: value,
      },
    }));
  };
  const toggleIsEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const jobId = job.id;
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");

    try {
      const response = await fetch(`${apiUrl}/dog_walking_jobs/${jobId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          client: client,
          uid: uid,
          "access-token": accessToken,
        },
        body: JSON.stringify(jobEditFormData),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.status == "success") {
          await Promise.all([fetchJob()]);
          setIsEditing(false);
        }
        console.log(data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteJob = async () => {
    const jobId = job.id;
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");

    try {
      const response = await fetch(`${apiUrl}/dog_walking_jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          uid: uid,
          client: client,
          "access-token": accessToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        await Promise.all([fetchJob()]);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  return (
    <>
      <div className="bg-white rounded-md p-6 border-slate-300 border-[1px]">
        <div className="flex items-center justify-between">
          <div className="font-bold text-xl">{job.name}</div>
          <RiDeleteBin6Line
            onClick={handleDeleteJob}
            size={20}
            className="cursor-pointer"
          />
        </div>
        <div className="text-base font-medium text-slate-600">Rates</div>
        {!isEditing && (
          <>
            <div className="pt-2">
              <div className="text-base font-medium text-slate-600">WGR1</div>
              <div className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2">
                {job.wgr1}
              </div>
            </div>
            <div className="pt-2">
              <div className="text-base font-medium text-slate-600">WGR2</div>
              <div className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2">
                {job.wgr2}
              </div>
            </div>
            <div className="pt-2">
              <div className="text-base font-medium text-slate-600">WGR3</div>
              <div className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2">
                {job.wgr3}
              </div>
            </div>
          </>
        )}
        {isEditing && (
          <>
            <div className="pt-2">
              <div className="text-base font-medium text-slate-600">WGR1</div>
              <input
                name="wgr1"
                value={jobEditFormData.dog_walking_job.wgr1}
                type="number"
                className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2"
                placeholder={job.wgr1}
                onChange={handleEditChange}
              ></input>
            </div>
            <div className="pt-2">
              <div className="text-base font-medium text-slate-600">WGR2</div>
              <input
                name="wgr2"
                value={jobEditFormData.dog_walking_job.wgr2}
                type="number"
                className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2"
                placeholder={job.wgr2}
                onChange={handleEditChange}
              ></input>
            </div>
            <div className="pt-2">
              <div className="text-base font-medium text-slate-600">WGR3</div>
              <input
                name="wgr3"
                value={jobEditFormData.dog_walking_job.wgr3}
                type="number"
                className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2"
                placeholder={job.wgr3}
                onChange={handleEditChange}
              ></input>
            </div>
          </>
        )}

        <div className="flex mt-4 border-t-[1px] pt-4">
          <button
            onClick={toggleIsEditing}
            className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 rounded-lg border-black border-[1px] px-4"
            type="button"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
          {isEditing && (
            <>
              <button
                onClick={handleSubmit}
                className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 rounded-lg border-black border-[1px] px-4"
                type="button"
              >
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
