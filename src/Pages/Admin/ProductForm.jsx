import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/axiosConfig";
import {
  FaSpinner,
  FaCloudUploadAlt,
  FaTag,
  FaRupeeSign,
  FaWarehouse,
  FaListAlt,
  FaTshirt,
  FaAlignLeft,
  FaExpandArrowsAlt,
  FaTags,
  FaImage,
  FaRegStar,
} from "react-icons/fa";

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

  const [images, setImages] = useState([]); // ✅ will hold { public_id, url }
  const [previewURLs, setPreviewURLs] = useState([]);
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
        setImages(product.images || []); // load existing images
        setPreviewURLs((product.images || []).map((img) => img.url));
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

  // ✅ Upload to Cloudinary directly
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    setLoading(true);
    setMessage("Uploading images...");

    const uploadedImages = [];
    const previewLinks = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET); // set in .env
      formData.append("folder", "brahmani-couture");

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        if (data.secure_url) {
          uploadedImages.push({
            public_id: data.public_id,
            url: data.secure_url,
          });
          previewLinks.push(data.secure_url);
        }
      } catch (err) {
        console.error("❌ Cloudinary upload failed:", err);
        setMessage("Image upload failed.");
      }
    }

    setImages((prev) => [...prev, ...uploadedImages]);
    setPreviewURLs((prev) => [...prev, ...previewLinks]);
    setLoading(false);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!form.name || !form.price || !form.category || !form.stock) {
      return setMessage("Please fill all required fields.");
    }

    const payload = {
      ...form,
      sizes: form.sizes
        ? form.sizes.split(",").map((s) => s.trim())
        : [],
      tags: form.tags
        ? form.tags.split(",").map((t) => t.trim())
        : [],
      images,
    };

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const url = isEditMode
        ? `/products/update/${id}`
        : "/products/create";

      const res = await api[isEditMode ? "put" : "post"](url, payload, config);

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
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#B02E0C] text-center tracking-wide flex items-center justify-center gap-2">
        <FaRegStar className="text-[#B02E0C]" />
        Let’s Add Some Glamour to Your Collection!
      </h1>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        {isEditMode ? "Edit Product" : "Create Product"}
      </h2>

      {message && (
        <div className="mb-4 text-sm px-3 py-2 rounded bg-red-100 text-red-700 border border-red-300">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 text-sm">
        {/* Name & Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1 flex items-center gap-2">
              <FaTag /> Product Name *
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-1.5 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-medium mb-1 flex items-center gap-2">
              <FaRupeeSign /> Price *
            </label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="w-full border rounded px-3 py-1.5 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Stock & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1 flex items-center gap-2">
              <FaWarehouse /> Stock *
            </label>
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              className="w-full border rounded px-3 py-1.5 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-medium mb-1 flex items-center gap-2">
              <FaListAlt /> Category *
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-1.5 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="saree">Saree</option>
              <option value="kidswear">Kidswear</option>
              <option value="accessories">Accessories</option>
              <option value="family combo">Family Combo</option>
              <option value="customised combo">Customised Combo</option>
            </select>
          </div>
        </div>

        {/* Saree Type */}
        {form.category === "saree" && (
          <div>
            <label className="block font-medium mb-1 flex items-center gap-2">
              <FaTshirt /> Saree Type
            </label>
            <select
              name="sareeType"
              value={form.sareeType}
              onChange={handleChange}
              className="w-full border rounded px-3 py-1.5 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="pattu">Pattu</option>
              <option value="handloom">Handloom</option>
              <option value="customised">Customised</option>
            </select>
          </div>
        )}

        {/* Description */}
        <div>
          <label className="block font-medium mb-1 flex items-center gap-2">
            <FaAlignLeft /> Description
          </label>
          <textarea
            name="description"
            rows={2}
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-1.5 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Sizes & Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1 flex items-center gap-2">
              <FaExpandArrowsAlt /> Sizes
              <span className="text-xs text-gray-500">(comma separated)</span>
            </label>
            <input
              name="sizes"
              value={form.sizes}
              onChange={handleChange}
              placeholder="e.g. S, M, L"
              className="w-full border rounded px-3 py-1.5 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-medium mb-1 flex items-center gap-2">
              <FaTags /> Tags
              <span className="text-xs text-gray-500">(comma separated)</span>
            </label>
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="e.g. trending, wedding"
              className="w-full border rounded px-3 py-1.5 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium mb-1 flex items-center gap-2">
            <FaImage /> {isEditMode ? "Update Images (optional)" : "Images *"}
          </label>
          <div className="border border-dashed border-blue-400 rounded-md px-4 py-6 text-center hover:shadow transition bg-gray-50">
            <label className="cursor-pointer text-blue-600 hover:underline inline-flex items-center gap-2">
              <FaCloudUploadAlt />
              <span>Click to upload</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {previewURLs.length > 0 && (
              <div className="flex flex-wrap justify-start mt-4 gap-3">
                {previewURLs.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`Preview ${i}`}
                    className="h-20 w-20 object-cover rounded border shadow-sm"
                  />
                ))}
              </div>
            )}
          </div>
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
