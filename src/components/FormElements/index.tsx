"use client";
import { useState } from "react";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const FormElements = () => {
  const [formData, setFormData] = useState({
    userId: "6788077580865c65ee876ab3",
    brand: "",
    model: "",
    color: "",
    fuelType: "",
    discNumber: "",
    licensePlate: "",
    madeYear: "",
    kilometers: "",
    estmara: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://maher-api1.up.railway.app/addCar", formData);
      console.log("Car added successfully:", response.data);
      alert("Car added successfully!");
    } catch (error) {
      console.error("Error adding car:", error);
      alert("Failed to add car. Please try again.");
    }
  };

  return (
    <>
      <Breadcrumb pageName="Add Car" />
      <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md dark:bg-boxdark">
        <h3 className="text-lg font-medium text-black dark:text-white mb-4">Add Car</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-black dark:text-white">Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Enter car brand"
              required
              className="w-full rounded-lg border border-stroke p-3 dark:border-strokedark dark:bg-form-input dark:text-white"
            />
          </div>

          {/* Model */}
          <div>
            <label className="block text-sm font-medium text-black dark:text-white">Model</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              placeholder="Enter car model"
              required
              className="w-full rounded-lg border border-stroke p-3 dark:border-strokedark dark:bg-form-input dark:text-white"
            />
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-black dark:text-white">Color</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="Enter car color"
              required
              className="w-full rounded-lg border border-stroke p-3 dark:border-strokedark dark:bg-form-input dark:text-white"
            />
          </div>

          {/* Fuel Type */}
          <div>
            <label className="block text-sm font-medium text-black dark:text-white">Fuel Type</label>
            <select
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-stroke p-3 dark:border-strokedark dark:bg-form-input dark:text-white"
            >
              <option value="">Select fuel type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* Disc Number */}
          <div>
            <label className="block text-sm font-medium text-black dark:text-white">Disc Number</label>
            <input
              type="text"
              name="discNumber"
              value={formData.discNumber}
              onChange={handleChange}
              placeholder="Enter disc number"
              required
              className="w-full rounded-lg border border-stroke p-3 dark:border-strokedark dark:bg-form-input dark:text-white"
            />
          </div>

          {/* License Plate */}
          <div>
            <label className="block text-sm font-medium text-black dark:text-white">License Plate</label>
            <input
              type="text"
              name="licensePlate"
              value={formData.licensePlate}
              onChange={handleChange}
              placeholder="Enter license plate"
              required
              className="w-full rounded-lg border border-stroke p-3 dark:border-strokedark dark:bg-form-input dark:text-white"
            />
          </div>

          {/* Made Year */}
          <div>
            <label className="block text-sm font-medium text-black dark:text-white">Made Year</label>
            <input
              type="text"
              name="madeYear"
              value={formData.madeYear}
              onChange={handleChange}
              placeholder="Enter made year"
              required
              className="w-full rounded-lg border border-stroke p-3 dark:border-strokedark dark:bg-form-input dark:text-white"
            />
          </div>

          {/* Kilometers */}
          <div>
            <label className="block text-sm font-medium text-black dark:text-white">Kilometers</label>
            <input
              type="text"
              name="kilometers"
              value={formData.kilometers}
              onChange={handleChange}
              placeholder="Enter kilometers driven"
              required
              className="w-full rounded-lg border border-stroke p-3 dark:border-strokedark dark:bg-form-input dark:text-white"
            />
          </div>

          {/* Estmara */}
          <div>
            <label className="block text-sm font-medium text-black dark:text-white">Estmara</label>
            <input
            type="text"
              name="estmara"
              value={formData.estmara}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-stroke p-3 dark:border-strokedark dark:bg-form-input dark:text-white"
            >
              {/* <option value="">Select estmara status</option>
              <option value="Valid">Valid</option>
              <option value="Expired">Expired</option> */}
            </input>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white rounded-lg py-3 font-medium hover:bg-primary-dark transition"
          >
            Add Car
          </button>
        </form>
      </div>
    </>
  );
};

export default FormElements;
