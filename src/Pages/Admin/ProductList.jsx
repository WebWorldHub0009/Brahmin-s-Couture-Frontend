/* --------------------------------------- */
/*  Admin • Product List                   */
/* --------------------------------------- */
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axiosConfig";
import {
  FaSearch,
  FaTrashAlt,
  FaEdit,
  FaBoxOpen,
  FaTag,
  FaBoxes,
} from "react-icons/fa";

const ProductList = () => {
  const navigate = useNavigate();

  // ── State ──────────────────────────────────────────────────────
  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [query, setQuery]         = useState("");
  const [category, setCategory]   = useState("all");

  /* ▾ Fetch products ----------------------------------------------------------------- */
  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products/getAll");
      if (data.success) setProducts(data.products);
    } catch (err) {
      console.error("❌ Error fetching products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ▾ Derived list after search & filter --------------------------------------------- */
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery =
        p.name.toLowerCase().includes(query.toLowerCase().trim());
      const matchesCategory =
        category === "all" ? true : p.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [products, query, category]);

  /* ▾ Delete ------------------------------------------------------------------------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const token = localStorage.getItem("token");
      const { data } = await api.delete(`/products/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        alert(data.message || "Failed to delete");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  /* ▾ Edit --------------------------------------------------------------------------- */
  const handleEdit = (id) => navigate(`/admin/products/edit/${id}`);

  /* ── UI ───────────────────────────────────────────────────────── */
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* Page Title */}
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <FaBoxes className="text-blue-600" /> Products
          <span className="text-sm font-normal text-gray-500">
            ({products.length})
          </span>
        </h1>

        {/* Search + Filter */}
        <div className="flex gap-3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              placeholder="Search…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-3 py-2 rounded-md border w-40 sm:w-56 md:w-64 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <select
            className="border rounded-md px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All categories</option>
            {Array.from(new Set(products.map((p) => p.category))).map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        {loading ? (
          <p className="p-6">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="p-6">No products match your search.</p>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left hidden md:table-cell">Category</th>
                <th className="p-3 text-left hidden sm:table-cell">Stock</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p, i) => (
                <tr
                  key={p._id}
                  className={i % 2 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}
                >
                  <td className="p-3">
                    <span className="font-medium">{p.name}</span>
                    <div className="md:hidden text-xs text-gray-500 flex gap-2 mt-1">
                      <span className="flex items-center gap-1">
                        <FaTag /> {p.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaBoxOpen /> Stock: {p.stock}
                      </span>
                    </div>
                  </td>

                  <td className="p-3">₹{p.price}</td>

                  <td className="p-3 capitalize hidden md:table-cell">
                    {p.category}
                  </td>

                  {/* Stock badge */}
                  <td className="p-3 hidden sm:table-cell">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        p.stock === 0
                          ? "bg-red-100 text-red-600"
                          : p.stock < 5
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {p.stock}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-3 text-center space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(p._id)}
                      title="Edit"
                      className="inline-flex items-center justify-center p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      title="Delete"
                      className="inline-flex items-center justify-center p-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductList;
