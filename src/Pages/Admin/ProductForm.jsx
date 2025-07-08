import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/axiosConfig";
import { FaSpinner } from "react-icons/fa";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    sareeType: "",
    stock: "",
    sizes: "",
    tags: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/products/getOne/${id}`);
      if (data.success) {
        const product = data.product;
        setForm({
          name: product.name,
          description: product.description || "",
          price: product.price,
          category: product.category,
          sareeType: product.sareeType || "",
          stock: product.stock,
          sizes: (product.sizes || []).join(", "),
          tags: (product.tags || []).join(", "),
        });
      } else {
        setMessage(data.message || "Unable to fetch product.");
      }
    } catch (err) {
      console.error("❌ Error loading product:", err);
      setMessage("Error loading product.");
    }
  };

  useEffect(() => {
    if (isEditMode) fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!form.name || !form.price || !form.category || !form.stock) {
      return setMessage("Please fill all required fields.");
    }

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (["sizes", "tags"].includes(key)) {
        value
          .split(",")
          .map((v) => v.trim())
          .forEach((v) => formData.append(key, v));
      } else {
        formData.append(key, value);
      }
    });

    images.forEach((img) => formData.append("images", img));

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const url = isEditMode
        ? `/products/update/${id}`
        : "/products/create";

      const res = await api[isEditMode ? "put" : "post"](url, formData, config);

      setMessage(res.data.message || "Success");

      if (res.data.success) {
        navigate("/admin/products");
      }
    } catch (err) {
      console.error("❌ Submit error:", err);
      setMessage(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {isEditMode ? "Edit Product" : "Create Product"}
      </h2>

      {message && (
        <div className="mb-4 text-sm px-4 py-2 rounded bg-red-100 text-red-700 border border-red-300">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block font-medium text-sm mb-1">Product Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-sm mb-1">Description</label>
          <textarea
            name="description"
            rows={3}
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-sm mb-1">Price *</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium text-sm mb-1">Stock *</label>
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium text-sm mb-1">Category *</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="saree">Saree</option>
            <option value="kidswear">Kidswear</option>
            <option value="accessories">Accessories</option>
            <option value="family combo">Family Combo</option>
            <option value="customised combo">Customised Combo</option>
          </select>
        </div>

        {/* Saree Type (conditional) */}
        {form.category === "saree" && (
          <div>
            <label className="block font-medium text-sm mb-1">Saree Type</label>
            <select
              name="sareeType"
              value={form.sareeType}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="pattu">Pattu</option>
              <option value="handloom">Handloom</option>
              <option value="customised">Customised</option>
            </select>
          </div>
        )}

        {/* Sizes */}
        <div>
          <label className="block font-medium text-sm mb-1">
            Sizes <span className="text-xs text-gray-500">(comma separated)</span>
          </label>
          <input
            name="sizes"
            value={form.sizes}
            onChange={handleChange}
            placeholder="e.g. S, M, L"
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block font-medium text-sm mb-1">
            Tags <span className="text-xs text-gray-500">(comma separated)</span>
          </label>
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="e.g. trending, wedding"
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Images */}
        <div>
          <label className="block font-medium text-sm mb-1">
            {isEditMode ? "Update Images (optional)" : "Images *"}
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading && <FaSpinner className="animate-spin" />}
          {loading
            ? "Submitting..."
            : isEditMode
            ? "Update Product"
            : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
