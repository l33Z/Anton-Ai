import "./chatarea.css";
import { useState, useEffect, useContext } from "react";
import { chatLogContext } from "../App";

const ChatArea = () => {
  const { allMessages, seTallMessages, UserPreference, setUserPreference } =
    useContext(chatLogContext);
  const [UserInput, setUserInput] = useState("");
  //   const [allMessages, seTallMessages] = useState([
  //     {
  //       type: "anton",
  //       text: "Hi there! How can I help you?",
  //       id: 515,
  //     },
  //   ]);

  //-------------------------------- Handle Submit --------------------------------
  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (UserInput.length == 0) {
      alert("Enter text first !!");
      return;
    }

    const newUserData = [
      ...allMessages,
      {
        type: "user",
        text: UserInput,
        id: Date.now(),
      },
    ];

    seTallMessages([
      ...allMessages,
      {
        type: "user",
        text: UserInput,
        id: Date.now(),
      },
    ]);

    await setUserPreference({ ...UserPreference, message: UserInput });

    const sendData = { ...UserPreference, message: UserInput };
    setUserInput("");

    console.log(sendData);
    const response = await fetch("https://anton-ai.onrender.com/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(sendData),
      //   body: JSON.stringify({
      //     message: UserInput,
      //   }),
    });

    const data = await response.json();

    if (response.status == 200) {
      seTallMessages([
        ...newUserData,
        {
          type: "anton",
          text: data.trim(),
          id: Date.now(),
        },
      ]);
    } else if (response.status == 500) {
      seTallMessages([
        ...newUserData,
        {
          type: "anton error",
          text: "Smothing went Wrong !!",
          id: Date.now(),
        },
      ]);
    } else {
      seTallMessages([
        ...newUserData,
        {
          type: "anton",
          text: "I'm sorry, but I'm unable to understand your question. Could you please provide more information or clarify what you are asking ?",
          id: Date.now(),
        },
      ]);
      console.log(data);
    }
  };

  return (
    <>
      <div className="ChatArea__Container">
        <div className="ChatArea__Main">
          <div className="Chats">
            {allMessages.map((msg, index) => {
              return (
                <div
                  key={msg.id}
                  className={msg.type == "user" ? "ChatBox user" : "ChatBox"}
                >
                  <div className="box">
                    <div
                      className={msg.type == "user" ? "Avtar user" : "Avtar "}
                    >
                      {msg.type == "user" ? (
                        <img src="./user.png" alt="alt" />
                      ) : (
                        <img src="./robot.png" alt="alt" />
                      )}
                    </div>
                    <div className="Text-Answer">
                      <p
                        style={
                          msg.type == "anton error"
                            ? { color: "red" }
                            : { color: "white" }
                        }
                      >
                        {msg.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <form method="POST" className="TakeInputDiv" onSubmit={HandleSubmit}>
          <input
            type="text"
            className="Userinput"
            value={UserInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <i className="fa-solid fa-paper-plane"></i>
        </form>
      </div>
    </>
  );
};

export default ChatArea;
