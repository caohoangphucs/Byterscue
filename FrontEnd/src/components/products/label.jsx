import { useState } from "react";

const ProductsLable = ({
  isOpen,
  setIsOpen,
  PRODUCT_DATA,
  setPRODUCT_DATA,
}) => {
  const [isName, setIsName] = useState("");
  const [iscategory, setIscategory] = useState("");
  const [isprice, setIsprice] = useState("");
  const [isstock, setIsstock] = useState("");
  const [issales, setIssales] = useState("");

  const handleAddProduct = () => {
    if (!isName || !iscategory || !isprice || !isstock || !issales) {
      // Kiểm tra nếu các trường nhập liệu còn thiếu
      alert("Vui lòng điền đầy đủ thông tin sản phẩm!");
      return;
    }

    const newProduct = {
      name: isName,
      category: iscategory,
      price: isprice,
      stock: isstock,
      sales: issales,
    };

    // Thêm sản phẩm vào PRODUCT_DATA bằng setPRODUCT_DATA
    setPRODUCT_DATA([...PRODUCT_DATA, newProduct]);

    // Đóng modal sau khi thêm sản phẩm
    setIsOpen(false);
  };

  return (
    <div className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-gray-900 p-6 rounded-2xl shadow-2xl w-96 border border-gray-700 text-white">
        <h2 className="text-2xl font-semibold mb-4 text-gray-100">
          Add Product
        </h2>
        <div>
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mb-4"
            onChange={(e) => setIsName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Category"
            className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mb-4"
            onChange={(e) => setIscategory(e.target.value)}
          />
          <input
            type="text"
            placeholder="Price"
            className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mb-4"
            onChange={(e) => setIsprice(e.target.value)}
          />
          <input
            type="text"
            placeholder="Stock"
            className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mb-4"
            onChange={(e) => setIsstock(e.target.value)}
          />
          <input
            type="text"
            placeholder="Sales"
            className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mb-4"
            onChange={(e) => setIssales(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
          <button
            className="z-20 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            onClick={handleAddProduct} // Thêm sản phẩm và đóng modal
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsLable;
