"use client";
import { useEffect, useState } from 'react';

export default function categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data[0]);
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h1>Categories</h1>
        {categories?.map((category,index) => (
          <a key={index}>{category.name}</a>
        ))}
    </div>

  );
}
