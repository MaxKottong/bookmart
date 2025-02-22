import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/book-style.css'

const EditBook = ({ book }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(book);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.title) formErrors.title = 'Title is required';
        if (!formData.author) formErrors.author = 'Author is required';
        if (!formData.price || formData.price <= 0) formErrors.price = 'Price must be valid';
        if (!formData.description) formErrors.description = 'Description is required';
        if (!formData.condition) formErrors.condition = 'Condition is required';
    
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
          console.log('Updated Book Details:', formData);
          navigate(`/bookdetail/${book.id}`);
        }
      };

      return (
        <div className="edit-book-container">
          <h2>Edit Book</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Book Title" />
            {errors.title && <p className="text-danger">{errors.title}</p>}
    
            <input type="text" name="author" value={formData.author} onChange={handleChange} placeholder="Author" />
            {errors.author && <p className="text-danger">{errors.author}</p>}
    
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description"></textarea>
            {errors.description && <p className="text-danger">{errors.description}</p>}
    
            <input type="text" name="condition" value={formData.condition} onChange={handleChange} placeholder="Condition (New, Used, etc.)" />
            {errors.condition && <p className="text-danger">{errors.condition}</p>}
    
            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
            {errors.price && <p className="text-danger">{errors.price}</p>}
    
            <input type="file" onChange={handleFileChange} />
            {formData.image && <img src={URL.createObjectURL(formData.image)} alt="Preview" />}
                <div className="button-group">
                    <button className="save-btn" type="submit">Save</button>
                    <button className="cancel-btn" onClick={() => navigate(`/bookdetail/${book.id}`)}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditBook;