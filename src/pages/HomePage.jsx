import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import HeaderNav from "../components/HeaderNav";

export default function HomePage() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      {" "}
      <div className="bg-slate-400 w-screen h-screen overflow-hidden">
        <div className="w-full h-full flex flex-col">
          <HeaderNav setShowForm={setShowForm} />
          {showForm && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="z-10">
                <AuthForm setShowForm={setShowForm} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
