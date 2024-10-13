import React from "react";

const SentMessage = ({ name, message }) => {
  return (
    <div className="flex flex-col font-[family-name:var(--font-satoshi-medium)] gap-2 items-end">
      <h1 className="text-right">{name}</h1>
      <div className="bg-red rounded-2xl text-white w-fit p-2">{message}</div>
    </div>
  );
};

export default SentMessage;
