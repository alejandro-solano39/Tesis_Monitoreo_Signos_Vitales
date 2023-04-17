import React from "react";

const PersonalCard = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <img
        className="w-20 h-20 rounded-full object-cover"
        src="https://source.unsplash.com/random/200x200"
        alt="profile"
      />
      <div className="text-center mt-2">
        <h2 className="text-lg font-semibold">John Doe</h2>
        <p className="text-gray-500">Software Engineer</p>
        <p className="text-gray-500">johndoe@example.com</p>
        <p className="text-gray-500">123 Main St, Anytown USA</p>
      </div>
    </div>
  );
};

export default PersonalCard;