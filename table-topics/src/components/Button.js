import React from "react";

export default function Button({ className, text, onClick }) {
  const style = className ? className : "";
  return (
    <button
      onClick={onClick}
      className={`bg-teal-700 text-slate-200 px-5 py-1 rounded-full 
      text-2xl font-semibold appearance-none ${style}
      transition-all duration-300`}
    >
      {text}
    </button>
  );
}
