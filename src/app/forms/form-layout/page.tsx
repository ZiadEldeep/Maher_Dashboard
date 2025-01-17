"use client"
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


const FormLayout = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs before sending
    if (!name || !email || !phone) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    // Prepare data
    const data = { name, email, phone };

    try {
      const response = await fetch("https://maher-api1.up.railway.app/registerApi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Registration successful!");
      } else {
        setError(result.message || "An error occurred.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Register Form" />

      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md">
          <div className="rounded-lg border border-stroke bg-white shadow-xl dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-semibold text-2xl text-primary dark:text-white">
                Register Form
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5 space-y-6">
                {/* Name Input */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-gray-800 dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border-2 border-stroke bg-transparent px-5 py-3 text-gray-800 placeholder-gray-400 transition focus:outline-none focus:ring-2 focus:ring-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:ring-primary"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-gray-800 dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border-2 border-stroke bg-transparent px-5 py-3 text-gray-800 placeholder-gray-400 transition focus:outline-none focus:ring-2 focus:ring-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:ring-primary"
                  />
                </div>

                {/* Phone Input */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-gray-800 dark:text-white">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-lg border-2 border-stroke bg-transparent px-5 py-3 text-gray-800 placeholder-gray-400 transition focus:outline-none focus:ring-2 focus:ring-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:ring-primary"
                  />
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500 text-sm">{error}</p>}

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`w-full py-3 rounded-lg bg-primary text-white font-medium transition transform hover:bg-opacity-90 hover:scale-105 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Register"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FormLayout;
