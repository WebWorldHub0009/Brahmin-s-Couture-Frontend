import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaStar } from "react-icons/fa";
import api from "../../utils/axiosConfig";
import { toast } from "react-toastify";

const AddressBook = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null); // store address ID, not index
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    addressLine: "",
    city: "",
    state: "",
    country: "India",
    isDefault: false,
  });

  /** Fetch Addresses */
  const fetchAddresses = async () => {
  try {
    setLoading(true);
    const { data } = await api.get("/address"); // ✅ token added automatically
    console.log("Fetched addresses:", data.addresses);
    setAddresses(data.addresses || []);
  } catch (err) {
    console.error("❌ Error fetching addresses", err.response?.data || err);
    toast.error("Failed to load addresses.");
  } finally {
    setLoading(false);
  }
};



  /** Add or Update Address */
  const handleSaveAddress = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Update existing address
        await api.put(`/address/${editId}`, newAddress);
        toast.success("Address updated");
      } else {
        // Add new address
        await api.post("/address", newAddress);
        toast.success("Address added");
      }

      setShowModal(false);
      resetForm();
      fetchAddresses();
    } catch (err) {
      console.error("❌ Error saving address", err);
      toast.error("Failed to save address.");
    }
  };

  /** Delete Address */
  const handleDelete = async (id) => {
    try {
      await api.delete(`/address/${id}`);
      toast.success("Address deleted");
      fetchAddresses();
    } catch (err) {
      console.error("❌ Error deleting address", err);
      toast.error("Failed to delete address.");
    }
  };

  /** Set Default Address */
  const handleSetDefault = async (id) => {
    try {
      await api.patch(`/address/default/${id}`);
      toast.success("Default address updated");
      fetchAddresses();
    } catch (err) {
      console.error("❌ Error setting default address", err);
      toast.error("Failed to set default address.");
    }
  };

  /** Open modal for edit */
  const handleEdit = (address) => {
    setNewAddress({ ...address });
    setEditId(address._id);
    setShowModal(true);
  };

  /** Reset form */
  const resetForm = () => {
    setNewAddress({
      fullName: "",
      phone: "",
      pincode: "",
      addressLine: "",
      city: "",
      state: "",
      country: "India",
      isDefault: false,
    });
    setEditId(null);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">My Addresses</h2>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-gradient-to-r from-black to-gray-800 text-white px-4 py-2 rounded shadow hover:opacity-90 transition"
        >
          <FaPlus /> Add New Address
        </button>
      </div>

      {/* Addresses list */}
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : addresses.length === 0 ? (
        <p className="text-gray-600">No addresses found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              className={`p-5 rounded-xl shadow-md border bg-white hover:shadow-lg transition relative ${
                addr.isDefault ? "border-black" : "border-gray-200"
              }`}
            >
              {addr.isDefault && (
                <span className="absolute top-2 right-2 text-xs px-2 py-1 bg-black text-white rounded-full">
                  Default
                </span>
              )}
              <h3 className="font-semibold text-lg text-gray-900">
                {addr.fullName}
              </h3>
              <p className="text-gray-700 mt-1">
                {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
              </p>
              <p className="text-gray-700">Phone: {addr.phone}</p>
              <p className="text-gray-700">Country: {addr.country}</p>

              <div className="flex gap-4 mt-4 flex-wrap">
                <button
                  onClick={() => handleEdit(addr)}
                  className="flex items-center gap-1 text-blue-600 hover:underline"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(addr._id)}
                  className="flex items-center gap-1 text-red-600 hover:underline"
                >
                  <FaTrash /> Delete
                </button>
                {!addr.isDefault && (
                  <button
                    onClick={() => handleSetDefault(addr._id)}
                    className="flex items-center gap-1 text-yellow-600 hover:underline"
                  >
                    <FaStar /> Set Default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Address Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center px-4">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-500 text-xl font-bold"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">
              {editId ? "Edit Address" : "Add New Address"}
            </h3>
            <form onSubmit={handleSaveAddress} className="grid gap-4">
              <input
                required
                type="text"
                placeholder="Full Name"
                value={newAddress.fullName}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, fullName: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
              <input
                required
                type="text"
                placeholder="Phone"
                value={newAddress.phone}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, phone: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
              <input
                required
                type="text"
                placeholder="Pincode"
                value={newAddress.pincode}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, pincode: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
              <input
                required
                type="text"
                placeholder="Address Line"
                value={newAddress.addressLine}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, addressLine: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
              <input
                required
                type="text"
                placeholder="City"
                value={newAddress.city}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, city: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
              <input
                required
                type="text"
                placeholder="State"
                value={newAddress.state}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, state: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="Country"
                value={newAddress.country}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, country: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
              <label className="inline-flex items-center mt-1 text-sm">
                <input
                  type="checkbox"
                  checked={newAddress.isDefault}
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      isDefault: e.target.checked,
                    })
                  }
                  className="mr-2"
                />
                Set as default address
              </label>

              <button
                type="submit"
                className="bg-black text-white py-2 rounded hover:opacity-90 transition"
              >
                {editId ? "Update Address" : "Save Address"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressBook;
