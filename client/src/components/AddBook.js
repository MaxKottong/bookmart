import React, { useState } from 'react';
import '../style/addBook.css';
const AddBook = () => {
    // State for the form fields and image preview
    const [bookDetails, setBookDetails] = useState({
        title: '',
        author: '',
        price: '',
        description: '',
        image: null,
    });
    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState(null);

    // Handle form field changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookDetails({ ...bookDetails, [name]: value });
    };

    // Handle image file upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setBookDetails({ ...bookDetails, image: file });

        // Create a preview of the image
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };
    const validateForm = () => {
        let formErrors = {};
        if (!bookDetails.title) formErrors.title = 'Title is required';
        if (!bookDetails.author) formErrors.author = 'Author is required';
        if (!bookDetails.price || bookDetails.price <= 0) formErrors.price = 'Price must be valid';
        if (!bookDetails.description) formErrors.description = 'Description is required';
        if (!bookDetails.image) formErrors.image = 'Image is required';

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Book details submitted:', bookDetails);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Add a New Book</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                {/* Book Title */}
                <div className="form-group">
                    <label htmlFor="title">Book Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={bookDetails.title}
                        onChange={handleInputChange}
                        required
                    /> {errors.title && <p className="text-danger">{errors.title}</p>}
                </div>

                {/* Author */}
                <div className="form-group mt-3">
                    <label htmlFor="author">Author</label>
                    <input
                        type="text"
                        className="form-control"
                        id="author"
                        name="author"
                        value={bookDetails.author}
                        onChange={handleInputChange}
                        required
                    /> {errors.author && <p className="text-danger">{errors.author}</p>}
                </div>

                {/* Price */}
                <div className="form-group mt-3">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={bookDetails.price}
                        onChange={handleInputChange}
                        required
                    />{errors.price && <p className="text-danger">{errors.price}</p>}
                </div>

                {/* Description */}
                <div className="form-group mt-3">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="3"
                        value={bookDetails.description}
                        onChange={handleInputChange}
                        required
                    /> {errors.description && <p className="text-danger">{errors.description}</p>}
                </div>

                {/* Image Upload */}
                <div className="form-group mt-3">
                    <label htmlFor="image">Upload Book Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        onChange={handleImageUpload}
                        accept="image/*"
                    />
                    {errors.image && <p className="text-danger">{errors.image}</p>}
                </div>

                {/* Image Preview */}
                {imagePreview && (
                    <div className="mt-3">
                        <h5>Image Preview:</h5>
                        <img src={imagePreview} alt="Book Preview" className="img-fluid" style={{ maxHeight: '300px', objectFit: 'contain' }} />
                    </div>
                )}

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary mt-4">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddBook;