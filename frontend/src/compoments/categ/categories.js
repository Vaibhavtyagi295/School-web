import React, { useState, useEffect } from 'react';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    fetch('/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Categories</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {categories.map((category) => (
          <div
            key={category._id}
            style={{
              width: '220px', // Adjust the width as per your needs
              border: '1px solid #ccc',
              padding: '10px',
              margin: '10px', // Adjust the spacing around the cards
            }}
          >
            <img
              src={`/images/${category.image}`} // Assuming each category object has an "image" property with the image URL
              alt={category.name}
              style={{
                width: '100%',
                height: 'auto',
                marginBottom: '10px', // Adjust the spacing between the image and text
              }}
            />
            <h3>{category.name}</h3>
            <p>{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
