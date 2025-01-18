'use client';

import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';

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
        const response = await fetch('https://maher-api1.up.railway.app/show');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setUsers(result.users);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const response = await fetch(`https://maher-api1.up.railway.app/deleteUser/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      const data = await response.json(); // Optional: If the API returns a response body
      console.log('Response from API:', data);

      alert('User deleted successfully!');
      // Remove the user from the local state
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

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
            className="bg-white p-4 shadow-md rounded-md border hover:shadow-lg transition-shadow duration-300 relative"
          >
            <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-gray-600">
              <span className="font-bold">Email:</span> {user.email}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Phone:</span> {user.phone}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">id:</span> {user.id}
            </p>

            {/* Delete Icon */}
            <button
              onClick={() => deleteUser(user.id)} // Deleting using the `id`
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              title="Delete User"
            >
              <AiFillDelete size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
