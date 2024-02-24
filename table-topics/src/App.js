import React, { useState } from "react";

import DropDown from "./components/DropDown";
import Button from "./components/Button";

function App() {
  const [category, setCategory] = useState(false);
  const categories = ["Life", "Work", "School", "Family"];
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
              onClick={() => alert("Generating new topic...")}
            />
          </div>

          <div className="w-full flex-1 flex flex-col justify-center items-center text-slate-900">
            <span>Give a speech about...</span>
            <span className="text-5xl font-bold mt-3">TABLE TOPIC</span>
          </div>

          <div className="w-full flex-1 flex">
            <span className="text-2xl">TIMING WIDGET</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
