"use client"
import React, { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  verificationCode: string;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://maher-api1.up.railway.app/show");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setUsers(result.users);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p className="text-red-500 text-center mt-4">Error: {error}</p>;
  }

  if (!users.length) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">User List</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white p-4 shadow-md rounded-md border hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-gray-600">
              <span className="font-bold">Email:</span> {user.email}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Phone:</span> {user.phone}
            </p>
            {/* <p className="text-gray-600">
              <span className="font-bold">Verification Code:</span>{" "}
              {user.verificationCode}
            </p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
