import React, { useState } from 'react';

import { FaChevronCircleDown } from "react-icons/fa";

function TopicDropdown({categories, selectedCategory, onCategoryChange}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex mb-3 relative'>
      <span className="text-slate-800 text-2xl font-light me-2">
        Category:
        </span>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-slate-800 text-slate-300 px-5 py-1 rounded-full mx-2 text-xl flex justify-center items-center relative">
        <span>
          {selectedCategory || 'Click to select'}
        </span>
        <FaChevronCircleDown 
          className={`ms-2 
          transform transition ease-in-out duration-150
          ${isOpen ? 'rotate-[180deg]' : 'rotate-0'}`} />
          <div className={`
            absolute z-10 min-w-32 flex flex-col top-[100%] mt-1
            rounded-2xl shadow-sm bg-white
            transition-all ease-in-out duration-300
            ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
            <div className="py-1 overflow-scroll max-h-96" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {categories.map((topic, index) => (
                <button 
                  key={index} 
                  onClick={() => {
                    onCategoryChange(topic);
                    setIsOpen(false);
                  }} 
                  className="w-full py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-2xl" 
                  role="menuitem">
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </button>
      </div>
  )
}

function App() {
  const [category, setCategory] = useState(false);
  const categories = ['Life', 'Work', 'School', 'Family']
  return (
    <div className='bg-slate-800 h-screen w-screen flex flex-col'>
      <header className="w-screen h-16 flex justify-between items-center px-10">
        <span className="text-slate-300 font-light">
          Ghub
        </span>
        <span className="text-slate-300 font-light">
          @davidasix / buy me a coffee
        </span>
        <span className="text-slate-300 font-light">
          theme
        </span>
      </header>
      <div className='flex-1 flex flex-col items-center'>
        <div className="w-screen min-h-40 flex flex-col justify-center items-center px-5 md:px-40">
          <h1 className="text-5xl text-slate-300 font-bold mb-3">
            Table Topics
          </h1>
          <p className=" text-slate-300 text-center font-light">
            Table Topics is a spontaneous speaking activity. Practice thinking on your feet and having fun with words.
            <br />
            Ready to become a better speaker?
          </p>
        </div>
        <div className="flex-1 w-11/12 flex flex-col items-center
          bg-slate-200 rounded-t-[4rem] shadow-2xl">
          <div className="w-full min-h-16 py-3 flex flex-col justify-center items-center">
            <TopicDropdown
              categories={categories}
              selectedCategory={category}
              onCategoryChange={(category) => setCategory(category)}
            />
            <button 
              className="bg-teal-700 text-slate-200 px-5 py-1 rounded-full text-2xl  font-semibold appearance-none">
              Generate New Topic
            </button>
          </div>
          <div className="w-full flex-1 flex flex-col justify-center items-center text-slate-900">
            <span>
              Give a speech about...
            </span>
            <span className='text-5xl font-bold mt-3'>
              TABLE TOPIC
            </span>
          </div>
          <div className="w-full flex-1">
            <span className='text-2xl'>
              TIMING WIDGET
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
