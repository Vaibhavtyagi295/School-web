import React, { useState } from 'react';
import './admincreateproduct.css';

function CreateProductForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send the form data including the image
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const response = await fetch('/categories', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Product created successfully');
        // Reset the form fields
        setName('');
        setDescription('');
        setImage(null);
      } else {
        console.error('Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="create-product-container">
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" onChange={handleImageChange} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateProductForm;
