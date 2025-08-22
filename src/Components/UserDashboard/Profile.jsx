import React, { useEffect, useState } from "react";
import {
  FaUserEdit,
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaUserShield,
  FaCalendarAlt,
  FaIdBadge,
} from "react-icons/fa";
import api from "../../utils/axiosConfig";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/profile");
        if (res.data.success) {
          setUser(res.data.user);
        } else {
          console.error(res.data.message);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Failed to load profile.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-8 max-w-4xl mx-auto mt-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <FaUserCircle className="text-gray-400 text-7xl" />
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {user.name || "User Profile"}
            </h2>
            <p className="text-gray-600 flex items-center gap-2">
              <FaIdBadge /> ID: {user._id || "N/A"}
            </p>
          </div>
        </div>

        <button className="mt-4 md:mt-0 flex items-center gap-2 bg-gradient-to-r from-black to-gray-700 text-white px-5 py-2 rounded-xl shadow hover:scale-105 transition-transform">
          <FaUserEdit />
          Edit Profile
        </button>
      </div>

      {/* User Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="bg-white rounded-xl p-5 shadow hover:shadow-md transition">
          <div className="flex items-center gap-3 text-gray-700">
            <FaUserCircle className="text-gray-500 text-xl" />
            <div>
              <p className="font-semibold">Full Name</p>
              <p className="text-gray-600 mt-1">{user.name}</p>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="bg-white rounded-xl p-5 shadow hover:shadow-md transition">
          <div className="flex items-center gap-3 text-gray-700">
            <FaEnvelope className="text-blue-500 text-xl" />
            <div>
              <p className="font-semibold">Email</p>
              <p className="text-gray-600 mt-1">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="bg-white rounded-xl p-5 shadow hover:shadow-md transition">
          <div className="flex items-center gap-3 text-gray-700">
            <FaPhone className="text-green-500 text-xl" />
            <div>
              <p className="font-semibold">Phone</p>
              <p className="text-gray-600 mt-1">{user.phone || "Not added"}</p>
            </div>
          </div>
        </div>

        {/* Role */}
        <div className="bg-white rounded-xl p-5 shadow hover:shadow-md transition">
          <div className="flex items-center gap-3 text-gray-700">
            <FaUserShield className="text-purple-500 text-xl" />
            <div>
              <p className="font-semibold">Role</p>
              <p className="text-gray-600 mt-1 capitalize">{user.role}</p>
            </div>
          </div>
        </div>

        {/* Member Since */}
        <div className="bg-white rounded-xl p-5 shadow hover:shadow-md transition sm:col-span-2">
          <div className="flex items-center gap-3 text-gray-700">
            <FaCalendarAlt className="text-red-500 text-xl" />
            <div>
              <p className="font-semibold">Member Since</p>
              <p className="text-gray-600 mt-1">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
