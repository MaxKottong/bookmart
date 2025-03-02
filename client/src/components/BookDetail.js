import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/book-style.css';

const BookDetail = () => {
    const navigate = useNavigate();
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookDetail = async () => {
            try {
                const response = await fetch(`http://localhost:5000/bookdetail/${bookId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch book details');
                }
                const data = await response.json();
                setBook(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetail();
    }, [bookId]);

    const handleDelete = () => {
        const isConfirmed = window.confirm("Are you sure you want to delete this book");

        if (isConfirmed) {
            console.log(`Book with ID ${book.id} deleted`);
            navigate('/profile');
        } else {
            navigate('/profile');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!book) {
        return <div>No book found</div>;
    }

    return (
        <div className="book-detail-container">
            <div className="book-image">
                <img src={book.image} className='card-img-top' alt={book.title} />
            </div>
            <div className="book-info">
                <h2>{book.title}</h2>
                <p><strong>Price:</strong> ${book.price}</p>
                <p><strong>Description:</strong> {book.description}</p>
                <p><strong>Condition:</strong> {book.condition}</p>
                <p><strong>Author:</strong> {book.author}</p>
                <div className="button-group">
                    <button className="edit-btn" onClick={() => navigate(`/editbook/${book.id}`)}>Edit</button>
                    <button className="delete-btn" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;