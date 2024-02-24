import React from "react";

export default function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-teal-700 text-slate-200 px-5 py-1 rounded-full text-2xl  font-semibold appearance-none"
    >
      {text}
    </button>
  );
}
