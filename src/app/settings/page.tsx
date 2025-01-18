"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const Settings = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const id = formData.get("userId") as string;
    const data = {
      name: formData.get("fullName"),
      email: formData.get("emailAddress"),
      phone: formData.get("phoneNumber"),
    };

    if (!id) {
      alert("User ID is required.");
      return;
    }

    try {
      const response = await fetch(`https://maher-api1.up.railway.app/updateUser/${id}`, {
        method: "PUT", // Ensure it's the correct method (PUT or PATCH)
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Check if the response is not OK and handle the error
        const errorData = await response.json();
        console.error("Error data:", errorData);
        throw new Error(`Failed to update user. ${errorData.message || response.statusText}`);
      }

      const result = await response.json();
      console.log("User updated:", result);
      alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please try again.");
    }
  };

  return (
    <DefaultLayout>
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md rounded border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Update User Information</h3>
          </div>
          <div className="p-7">
            <form onSubmit={handleSubmit}>
              <div className="mb-5.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="userId">
                  User ID
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="text"
                  name="userId"
                  id="userId"
                  placeholder="Enter User ID"
                  required
                />
              </div>

              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full sm:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Full Name"
                  />
                </div>

                <div className="w-full sm:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="phoneNumber">
                    Phone Number
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Phone Number"
                  />
                </div>
              </div>

              <div className="mb-5.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="emailAddress">
                  Email Address
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="email"
                  name="emailAddress"
                  id="emailAddress"
                  placeholder="Email Address"
                />
              </div>

              <button
                type="submit"
                className="mt-4 w-full rounded bg-primary px-6 py-3 text-white hover:bg-primary-dark"
              >
                Update User
              </button>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;
