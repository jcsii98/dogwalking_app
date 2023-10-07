import React, { useState, useEffect, useRef } from "react";
import Boy from "../assets/boy.png";
import Woman from "../assets/woman.png";
import Paper from "../assets/paper.png";
import Message from "./Message";
import cable from "../services/cable";

export default function BookingChatroom(props) {
  const { bookingDetails, messages, userData, fetchChat } = props;
  const [inputValue, setInputValue] = useState("");

  const messagesEndRef = useRef(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");
    const bookingId = bookingDetails.id;

    try {
      const response = await fetch(
        `https://dogwalking-api.onrender.com/bookings/${bookingId}/chatroom/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            uid: uid,
            client: client,
            "access-token": accessToken,
          },
          body: JSON.stringify({ message: { content: inputValue } }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        fetchChat();
        setInputValue("");
      } else {
        console.error("Server responded with an error:", data);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const isWalkerGirl = bookingDetails.user_walker_id % 2 === 0;
  const isOwnerGirl = bookingDetails.user_owner_id % 2 === 0;
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const subscription = cable.subscriptions.create(
      { channel: "ChatroomChannel", id: bookingDetails.id },
      {
        connected() {
          console.log("Connected to ChatroomChannel!");
        },
        received(data) {
          console.log("Received new message:", data);
          fetchChat();
        },
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [bookingDetails.id]);

  return (
    <>
      <div className="h-full flex flex-col justify-between">
        <div className="flex flex-col">
          <div className="h-[75px] bg-white flex items-center pb-4 border-b-[1px]">
            {userData.kind == "2" ? (
              <>
                <img
                  src={isWalkerGirl ? Woman : Boy}
                  alt={isWalkerGirl ? "Girl" : "Boy"}
                  className="place-self-center w-14 h-14 rounded-full"
                />
                <div className="">{bookingDetails.user_walker_name}</div>
              </>
            ) : (
              <>
                <img
                  src={isOwnerGirl ? Woman : Boy}
                  alt={isOwnerGirl ? "Girl" : "Boy"}
                  className="place-self-center w-14 h-14 rounded-full"
                />
                <div className="">{bookingDetails.user_owner_name}</div>
              </>
            )}
          </div>
          <div className="max-h-[290px] flex-grow overflow-y-auto bg-slate-100 rounded-md px-2">
            {messages &&
              messages.map((message) => (
                <>
                  <Message userData={userData} message={message} />
                </>
              ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="mt-4 h-[40px]">
          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              value={inputValue}
              onChange={handleInputChange}
              type="text"
              className="pl-4 py-4 w-full rounded-full focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 h-[40px]"
            ></input>
            <button className="ml-6" type="submit">
              <img className="w-8 h-8" src={Paper}></img>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
