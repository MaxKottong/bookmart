import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../style/book-style.css';

const BookDetail = () => {
    const navigate = useNavigate();
    const { bookId } = useParams();
    const { user } = useAuth();
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

    const handleDelete = async () => {
        const isConfirmed = window.confirm("Are you sure you want to delete this book");
        console.log(user);
        console.log(bookId);

        if (isConfirmed) {
            try {
                const response = await fetch(`http://localhost:5000/deletebook/${book.book_id}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: user})
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText);
                }

                alert('Book deleted successfully');
                navigate('/profile');
            } catch (error) {
                console.error('Error deleting book:', error);
                alert('An error occurred while deleting the book. Please try again.');
            }
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
                    <button className="edit-btn" onClick={() => navigate(`/editbook/${book.book_id}`)}>Edit</button>
                    <button className="delete-btn" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;