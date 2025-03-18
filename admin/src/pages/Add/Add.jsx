import React, { useState } from 'react'; 
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({url}) => {


  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Desserts',
    price: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Please upload an image.');
      return;
    }

    // Prepare form data with image and other fields
    const data = new FormData();
    data.append('image', image);
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('price', formData.price);

    try {
      const response = await axios.post(`${url}/api/food/add`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setFormData({
          name: '',
          description: '',
          category: 'Desserts',
          price: '',
        });
        setImage(null);
        toast.success('Product added successfully');
       
      } else {
        alert('Product not added');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('An error occurred while adding the product.');
      
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Uploaded Preview"
              style={{ maxWidth: '200px', maxHeight: '200px' }}
            />
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            id="image"
            accept="image/*"
            hidden
            required
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            name="description"
            rows="6"
            placeholder="Write content here"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Category</p>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="Desserts">Desserts</option>
              <option value="Savory">Savory</option>
              <option value="Rasam">Rasam</option>
              <option value="Veg">Veg</option>
              <option value="Non Veg">Non Veg</option>
              <option value="Paneer">Paneer</option>
              <option value="Rice">Rice</option>
              <option value="Greens">Greens</option>
            </select>
          </div>
          <div className="add-category-price flex-col">
            <p>Price</p>
            <input
              type="number"
              name="price"
              placeholder="$20"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="add-button">
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
