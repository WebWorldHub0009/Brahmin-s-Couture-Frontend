import React from "react";
import { FaUserEdit } from "react-icons/fa";

const Profile = () => {
  const user = {
    name: "Mohd Shuaib Anwar",
    email: "shuaib@example.com",
    phone: "+91 9876543210",
    gender: "Male",
    joined: "January 2024",
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 max-w-3xl mx-auto mt-10">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Profile Picture */}
        <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-gray-200">
          <img
            src="https://i.pravatar.cc/300"
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Info */}
        <div className="flex-1 w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Profile</h2>
            <button className="flex items-center gap-2 bg-gradient-to-r from-black to-gray-700 text-white px-4 py-2 rounded-md shadow hover:opacity-90 transition">
              <FaUserEdit />
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <div>
              <p className="font-medium text-sm text-gray-500">Full Name</p>
              <p>{user.name}</p>
            </div>
            <div>
              <p className="font-medium text-sm text-gray-500">Email</p>
              <p>{user.email}</p>
            </div>
            <div>
              <p className="font-medium text-sm text-gray-500">Phone</p>
              <p>{user.phone}</p>
            </div>
            <div>
              <p className="font-medium text-sm text-gray-500">Gender</p>
              <p>{user.gender}</p>
            </div>
            <div>
              <p className="font-medium text-sm text-gray-500">Member Since</p>
              <p>{user.joined}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
