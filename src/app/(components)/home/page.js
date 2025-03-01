"use client";
import { useEffect, useState } from 'react';

export default function Home() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await fetch('/api/home');
      const data = await res.json();
      setProperties(data[0]);
    };

    fetchProperties();
  }, []);

  // Inside your JSX code:
  return (
    <div>
      <h1>Properties</h1>
      <ul>
        {properties.map((property) => (
          <li key={property.id}> {/* Apply the key to the <li> element */}
            <h2>{property.name}</h2>
            <p>{property.description}</p>
            <p>Price: ${property.price}</p>
            <p>Category ID: {property.category_id}</p>
            <p>{property.is_premium ? 'Premium' : 'Regular'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
