import React, { useState } from "react";

import DropDown from "./components/DropDown";
import Button from "./components/Button";

function App() {
  const [category, setCategory] = useState(false);
  const [green, setGreen] = useState("1:00");
  const [yellow, setYellow] = useState("1:30");
  const [red, setRed] = useState("2:00");
  const categories = ["Life", "Work", "School", "Family"];
  const timingOptions = [
    "0:15",
    "0:30",
    "0:45",
    "1:00",
    "1:15",
    "1:30",
    "1:45",
    "2:00",
  ];
  return (
    <div className="bg-slate-800 h-screen w-screen flex flex-col">
      <header className="w-screen h-16 flex justify-between items-center px-10">
        <span className="text-slate-300 font-light">Ghub</span>
        <span className="text-slate-300 font-light">
          @davidasix / buy me a coffee
        </span>
        <span className="text-slate-300 font-light">theme</span>
      </header>
      <div className="flex-1 flex flex-col items-center">
        <div className="w-screen min-h-40 flex flex-col justify-center items-center px-5 md:px-40">
          <h1 className="text-5xl text-slate-300 font-bold mb-3">
            Table Topics
          </h1>
          <p className=" text-slate-300 text-center font-light">
            Table Topics is a spontaneous speaking activity. Practice thinking
            on your feet and having fun with words.
            <br />
            Ready to become a better speaker?
          </p>
        </div>
        <div
          className="flex-1 w-11/12 flex flex-col items-center
          bg-slate-200 rounded-t-[4rem] shadow-2xl"
        >
          <div className="w-full min-h-16 py-3 flex flex-col justify-center items-center">
            <DropDown
              text="Category:"
              options={categories}
              selectedOption={category}
              onOptionChange={(category) => setCategory(category)}
            />
            <Button
              text="Generate New Topic"
              className="mt-3"
              onClick={() => alert("Generating new topic...")}
            />
          </div>

          <div className="w-full flex-1 flex flex-col justify-center items-center text-slate-900">
            <span>Give a speech about...</span>
            <span className="text-5xl font-bold mt-3">TABLE TOPIC</span>
          </div>

          <div className="w-full flex-1 flex flex-col">
            <div className="w-full min-h-16 py-3 flex flex-col md:flex-row justify-center items-center border border-red-500">
              <DropDown
                className={'mb-3 md:mb-0'}
                text="Green"
                options={timingOptions}
                selectedOption={green}
                onOptionChange={(value) => setGreen(value)}
              />
              <DropDown
                className={'mb-3 md:mb-0'}
                text="Yellow"
                options={timingOptions.filter((val, i) => val > green)}
                selectedOption={yellow}
                onOptionChange={(value) => setYellow(value)}
              />
              <DropDown
                className={'mb-3 md:mb-0'}
                text="Red"
                options={timingOptions.filter((val, i) => val > yellow)}
                selectedOption={red}
                onOptionChange={(value) => setRed(value)}
              />
            </div>
            <span className="text-2xl">TIMING WIDGET</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
