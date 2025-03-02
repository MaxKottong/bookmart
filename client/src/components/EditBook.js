import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../style/book-style.css'

const EditBook = () => {
    const navigate = useNavigate();
    const { bookId } = useParams();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
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
    const [userId, setUserId] = useState(null);
    const [bookOwner, setBookOwner] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await fetch(`http://localhost:5000/userid/${user}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setUserId(data.user_id);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserId();
    }, [user]);

    useEffect(() => {
        const fetchBookDetail = async () => {
            try {
                const response = await fetch(`http://localhost:5000/bookdetail/${bookId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch book details');
                }
                const data = await response.json();
                setFormData(data);
                setBookOwner(data.owner);
                if (data.image) {
                    setImagePreview(data.image);
                } else {
                    setImagePreview('https://placehold.co/300x500');
                }

            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetail();
    }, [bookId]);

    useEffect(() => {
        if (userId !== null && bookOwner !== null) {
            if (userId !== bookOwner) {
                navigate('/profile');
            }
        }
    }, [userId, bookOwner, navigate]);

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
        if (!formData.category) formErrors.category = 'Category is required';
        if (!formData.condition) formErrors.condition = 'Condition is required';

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await fetch(`http://localhost:5000/editbook/${bookId}/${user}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, username: user.username })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            alert('Book updated successfully');
            navigate(`/bookdetail/${bookId}`);
        } catch (error) {
            console.error('Error updating book:', error);
            alert('An error occurred while updating the book. Please try again.');
        }
    };

    return (
        <div className="edit-book-container">
            <h2>Edit Book</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Book Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                    {errors.title && <p className="text-danger">{errors.title}</p>}
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="author">Author</label>
                    <input
                        type="text"
                        className="form-control"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                    />
                    {errors.author && <p className="text-danger">{errors.author}</p>}
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                    {errors.price && <p className="text-danger">{errors.price}</p>}
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                    {errors.description && <p className="text-danger">{errors.description}</p>}
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="Mystery">Mystery</option>
                        <option value="Horror">Horror</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Non Fiction">Non Fiction</option>
                    </select>
                    {errors.category && <p className="text-danger">{errors.category}</p>}
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="condition">Condition*</label>
                    <select
                        id="condition"
                        name="condition"
                        value={formData.condition}
                        onChange={handleChange}
                        required
                    >
                        <option value="Like New">Like New</option>
                        <option value="Very Good">Very Good</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                        <option value="Poor">Poor</option>
                    </select>
                    {errors.condition && <p className="text-danger">{errors.condition}</p>}
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="image">Upload Book Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                    {errors.image && <p className="text-danger">{errors.image}</p>}
                </div>

                {imagePreview && (
                    <div className="mt-3">
                        <h5>Image Preview:</h5>
                        <img src={imagePreview || 'https://placehold.co/300x500'} alt="Book Preview" className="img-fluid" style={{ maxHeight: '300px', objectFit: 'contain' }} />
                    </div>
                )}

                <div className="button-group">
                    <button className="save-btn" type="submit">Save</button>
                    <button className="cancel-btn" onClick={() => navigate(`/bookdetail/${bookId}`)}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditBook;