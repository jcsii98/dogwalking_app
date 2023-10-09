import React, { useState, useEffect, useRef } from "react";
import Boy from "../../assets/boy.png";
import Woman from "../../assets/woman.png";

import { BiSolidSend } from "react-icons/bi";
import Message from "../General/Message";

export default function BookingChatroom(props) {
  const { apiUrl, bookingChat, bookingDash, userData, fetchChat, onlineUsers } =
    props;

  // variable states
  const [inputValue, setInputValue] = useState("");
  const [localMessages, setLocalMessages] = useState(
    bookingChat.messages || []
  );

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // ui states
  const messagesEndRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");
    const bookingId = bookingDash.booking.id;

    const newMessage = {
      content: inputValue,
      user_id: userData.id,
    };

    setLocalMessages([...localMessages, newMessage]);

    try {
      const response = await fetch(
        `${apiUrl}/bookings/${bookingId}/chatroom/messages`,
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

        setInputValue("");
      } else {
        console.error("Server responded with an error:", data);
        setLocalMessages(localMessages.filter((msg) => msg !== newMessage));
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const isWalkerGirl = bookingDash.booking.user_walker_id % 2 === 0;
  const isOwnerGirl = bookingDash.booking.user_owner_id % 2 === 0;

  // scroll down
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [localMessages]);

  useEffect(() => {
    setLocalMessages(bookingChat.messages);
  }, [bookingChat.messages]);
  return (
    <>
      <div className="flex flex-col justify-between p-6 border-[1px] rounded-md bg-white">
        <div id="one" className="flex flex-col">
          <div className="h-auto bg-white flex items-center pb-4">
            {userData.kind == "2" ? (
              <>
                <div className="bg-slate-400 rounded-full w-16 h-16 flex justify-center items-center">
                  <img
                    src={isWalkerGirl ? Woman : Boy}
                    alt={isWalkerGirl ? "Girl" : "Boy"}
                    className="place-self-center w-14 h-14 rounded-full"
                  />
                </div>
                <div className="pl-4 font-medium text-lg">
                  {bookingDash.booking.user_walker_name}
                </div>
              </>
            ) : (
              <>
                <div className="bg-slate-400 rounded-full w-16 h-16 flex justify-center items-center">
                  <img
                    src={isOwnerGirl ? Woman : Boy}
                    alt={isOwnerGirl ? "Girl" : "Boy"}
                    className="place-self-center w-14 h-14 rounded-full"
                  />
                </div>
                <div className="pl-4">
                  {bookingDash.booking.user_owner_name}
                </div>
              </>
            )}
            <div
              className={
                isOnline
                  ? "rounded-full bg-green-300 w-[10px] h-[10px] ml-2"
                  : "rounded-full bg-red-300 w-[10px] h-[10px] ml-2"
              }
            ></div>
          </div>
          <div className="flex flex-col justify-end h-[300px] flex-grow overflow-y-auto bg-slate-300 rounded-md py-4 px-4 scroll-container">
            <div className="flex flex-col">
              {localMessages &&
                localMessages.map((message) => (
                  <Message
                    userData={userData}
                    message={message}
                    key={message.id}
                  />
                ))}
            </div>

            <div ref={messagesEndRef} />
          </div>
        </div>

        <div id="2" className="mt-4 h-[40px]">
          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              placeholder="Enter message"
              value={inputValue}
              onChange={handleInputChange}
              type="text"
              className="pl-4 py-4 w-full rounded-full focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 h-[40px]"
            ></input>
            <button
              className="ml-[12px] rounded-full p-[8px] border-[1px] bg-slate-400"
              type="submit"
            >
              <BiSolidSend size={25} style={{ color: "White" }} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
