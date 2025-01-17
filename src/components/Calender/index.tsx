'use client';

import { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';

interface Car {
  id: string;
  image: string;
  brand: string;
  model: string;
  color: string;
  fuelType: string;
  discNumber: string;
  licensePlate: string;
  madeYear: string;
  kilometers: string;
  estmara: string;
  userName: string;
}

export default function CarList() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch cars
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('https://maher-api1.up.railway.app/show-cars');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCars(data.cars);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Delete car function
  const deleteCar = async (carId: string) => {
    if (!window.confirm('Are you sure you want to delete this car?')) {
      return;
    }

    try {
      const response = await fetch(`https://maher-api1.up.railway.app/deleteCar/${carId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete car');
      }

      alert('Car deleted successfully!');
      // Remove the car from the local state
      setCars((prevCars) => prevCars.filter((car) => car.id !== carId));
    } catch (err) {
      alert((err as Error).message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Car Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map((car) => (
          <div key={car.id} className="border p-4 rounded shadow relative">
            <h2 className="text-xl font-semibold">
              {car.brand} {car.model}
            </h2>
            <p>ID: {car.id}</p>
            <p>Color: {car.color}</p>
            <p>Fuel Type: {car.fuelType}</p>
            <p>License Plate: {car.licensePlate}</p>
            <p>Made Year: {car.madeYear}</p>
            <p>Kilometers: {car.kilometers}</p>
            <p>Estmara: {car.estmara}</p>
            <p>Owner: {car.userName}</p>

            <button
              onClick={() => deleteCar(car.id)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              title="Delete Car"
            >
              <AiFillDelete size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
