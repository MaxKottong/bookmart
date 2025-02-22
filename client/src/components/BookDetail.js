import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/book-style.css'; // Import the shared styles

const BookDetail = ({ book }) => {
    const navigate = useNavigate();

    if (!book) {
        return <p>You have not add a book yet!.</p>;
    }

    return (
        <div className="book-detail-container">
            <div className="book-image">
                <img src={book.image} alt={book.title} />
            </div>
            <div className="book-info">
                <h2>{book.title}</h2>
                <p><strong>Price:</strong> ${book.price}</p>
                <p><strong>Description:</strong> {book.description}</p>
                <p><strong>Condition:</strong> {book.condition}</p>
                <p><strong>Author:</strong> {book.author}</p>
                <div className="button-group">
                    <button className="edit-btn" onClick={() => navigate(`/editbook/${book.id}`)}>Edit</button>
                    <button className="delete-btn">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;