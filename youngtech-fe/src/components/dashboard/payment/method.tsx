import React from "react";

const Method = ({
  title,
  description,
  icon
}: {
  title: string;
  description: string;
  icon: JSX.Element;
}) => {
  return (
    <div className="border border-white/20 rounded-xl p-4">
      <div>
        <h2 className="text-[1rem] text-white/60">{title}</h2>
        <span>{icon}</span>
      </div>
      <p className="text-sm mt-3 text-white/40">{description}</p>
    </div>
  );
};

export default Method;
