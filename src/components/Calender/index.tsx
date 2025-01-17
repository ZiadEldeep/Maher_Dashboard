'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
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

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('https://maher-api1.up.railway.app/show-cars'); // Adjust the API endpoint as needed
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCars(data.cars); // Ensure the API response has a `cars` field
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Car Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map((car) => (
          <div key={car.id} className="border p-4 rounded shadow">
            <Image
  src={car.image || '/placeholder-icon.png'}
  alt={`${car.brand} ${car.model}`}
  className="w-full h-40 object-cover mb-4"
  width={300}
  height={160}
/>

            <h2 className="text-xl font-semibold">{car.brand} {car.model}</h2>
            <p>Color: {car.color}</p>
            <p>Fuel Type: {car.fuelType}</p>
            <p>License Plate: {car.licensePlate}</p>
            <p>Made Year: {car.madeYear}</p>
            <p>Kilometers: {car.kilometers}</p>
            <p>Estmara: {car.estmara}</p>
            <p>Owner: {car.userName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
