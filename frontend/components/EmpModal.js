import React, { useState } from "react";

export function EmployeeModal({
  closeModal,
  onAdd,
  onUpdate,
  defaultValue,
  errorText,
}) {
  const [employee, setEmployee] = useState(defaultValue || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({ ...prevEmployee, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (defaultValue) {
      onUpdate(employee);
    } else {
      onAdd(employee);
    }
  };

  const inputStyle = {
    width: "100%", // Set to your desired width
    padding: "10px",
    borderRadius: "8px",
    boxSizing: "border-box",
    border: "1px solid #ccc",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[99999]">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">
          {defaultValue ? "Edit Employee" : "Add Employee"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Nama
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={employee.name || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="role"
            >
              Role
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="role"
              name="role"
              value={employee.role || ""}
              onChange={handleChange}
              required
              style={inputStyle}
              disabled={defaultValue ? true : false}
            >
              <option value="" disabled>
                Pilih Role
              </option>
              <option value="Admin">Admin</option>
              <option value="Cashier">Cashier</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              name="username"
              value={employee.username || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              value={employee.password || ""}
              onChange={handleChange}
              required
            />
          </div>
          {errorText && (
            <span className="text-red-500 font-bold">{errorText}</span>
          )}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={closeModal}
              className="mr-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {defaultValue ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
