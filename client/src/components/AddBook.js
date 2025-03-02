import React, { useState } from 'react';
import '../style/addBook.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const AddBook = () => {
    // State for the form fields and image preview
    const navigate = useNavigate();
    const { user } = useAuth();

    const [bookDetails, setBookDetails] = useState({
        id: 0,
        title: '',
        author: '',
        price: '',
        description: '',
        category: '',
        condition: 'Like New',
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
        if (!bookDetails.category) formErrors.category = 'Category is required';
        if (!bookDetails.condition) formErrors.condition = 'Condition is required';
        if (!bookDetails.image) formErrors.image = 'Image is required';

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const response = await fetch(`http://localhost:5000/addbook/${user}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bookDetails })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            const data = await response.json();

            setBookDetails(prevDetails => {
                const updatedDetails = { ...prevDetails, id: data.bookId?.book_id };
                return updatedDetails;
            });

            alert('Book added successfully');
            navigate(`/bookdetail/${data.bookId?.book_id}`);
        } catch (error) {
            console.error('Error adding book:', error);
            alert('An error occurred while adding the book. Please try again.');
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

                <div className="form-group mt-3">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={bookDetails.category}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="Mystery">Mystery</option>
                        <option value="Horror">Horror</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Non Fiction">Non Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Poetry">Poetry</option>
                        <option value="Science Fiction">Science Fiction</option>
                        <option value="Crime">Crime</option>
                        <option value="Young Adult">Young Adult</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Classics">Classics</option>
                        <option value="Autobiography">Autobiography</option>
                        <option value="Fiction & Literature">Fiction & Literature</option>
                        <option value="Humor">Humor</option>
                        <option value="Health & Fitness">Health & Fitness</option>
                        <option value="History">History</option>
                        <option value="Coming-of-age">Coming-of-age</option>
                        <option value="Drama">Drama</option>
                        <option value="Fairytale">Fairytale</option>
                        <option value="Short Story">Short Story</option>
                        <option value="Graphic Novel">Graphic Novel</option>
                        <option value="New Adult">New Adult</option>
                        <option value="Guide/How-to">Guide/How-to</option>
                    </select>
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="condition">Condition*</label>
                    <select
                        id="condition"
                        name="condition"
                        value={bookDetails.condition}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="Like New">Like New</option>
                        <option value="Very Good">Very Good</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                        <option value="Poor">Poor</option>
                    </select>
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