import "./sidenavbar.css";
import { useState, useContext } from "react";
import { chatLogContext } from "../App";

const SideNavbar = () => {
  const { seTallMessages, setUserPreference, UserPreference } =
    useContext(chatLogContext);
  const [Temperature, setTemperature] = useState(0.5);
  const [MaxLength, setMaxLength] = useState(2000);

  //------------- clear chatLog ------------------
  const clearAll = () => {
    seTallMessages([]);
  };

  //------------- Handle Temprature Changes ------------------
  const handleTempratureChanges = async (e) => {
    setTemperature(e.target.value);
    await setUserPreference({
      ...UserPreference,
      utemperature: e.target.value,
    });
  };

  //------------- Handle MaxLength Changes ------------------
  const handleMaxLengthChanges = async (e) => {
    setMaxLength(e.target.value);
    await setUserPreference({
      ...UserPreference,
      maxLength: e.target.value,
    });
  };

  return (
    <>
      <div className="Navbar__Main">
        <h1>
          <span>
            <i className="fa-solid fa-robot"></i>
          </span>
          Anton Ai
        </h1>

        <div className="Navbar__Options">
          <button className="NewChat" onClick={clearAll}>
            <i className="fa-solid fa-plus"></i> New chat
          </button>

          <div className="InfoList">
            <div className="tempInfo">
              <label htmlFor="temprature">Temperature : {Temperature}</label>
              <input
                type="range"
                name="temprature"
                id="temprature"
                min={0}
                max={1}
                step={0.01}
                value={Temperature}
                onChange={(e) => handleTempratureChanges(e)}
              />
            </div>

            <div className="tempInfo">
              <label htmlFor="maxLength">Maximum length : {MaxLength}</label>
              <input
                type="range"
                name="maxLength"
                id="maxLength"
                min={0}
                max={4000}
                step={1}
                value={MaxLength}
                onChange={(e) => handleMaxLengthChanges(e)}
              />
            </div>

            <div className="tempInfo">
              <h3>Temperature : </h3>
              <p>
                Controls randomness: Lowering results in less random
                completions. As the temperature approaches zero, the model will
                become deterministic and repetitive.
              </p>
            </div>

            <div className="tempInfo lastInfoDiv">
              <h3>Maximum length : </h3>
              <p>
                The maximum number of tokens to generate. Requests can use up to
                2,048 or 4,000 tokens shared between prompt and completion. The
                exact limit varies by model. (One token is roughly 4 characters
                for normal English text)
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNavbar;
