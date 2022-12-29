import ChatArea from "./components/ChatArea";
import SideNavbar from "./components/SideNavbar";
import { createContext, useState } from "react";

export const chatLogContext = createContext();

function App() {
  const [allMessages, seTallMessages] = useState([]);
  const [UserPreference, setUserPreference] = useState({
    message: "",
    utemperature: 0.5,
    maxLength: 2000,
  });

  return (
    <>
      <chatLogContext.Provider
        value={{
          allMessages,
          seTallMessages,
          UserPreference,
          setUserPreference,
        }}
      >
        <SideNavbar />
        <ChatArea />
      </chatLogContext.Provider>
    </>
  );
}

export default App;
