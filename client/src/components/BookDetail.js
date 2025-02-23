import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/book-style.css'

const BookDetail = ({ book }) => {
    const navigate = useNavigate();

    const mockBook = {
        id: 1,
        title: "THE HOUSEMAID",
        author: "Freida McFadden",
        description: "The Housemaid by Freida McFadden is a psychological thriller about Millie, a desperate woman who takes a live-in maid job with the wealthy Winchester family, only to discover their dark and twisted secrets. As eerie events unfold and danger lurks within the house, Millie realizes she may not make it out alive..",
        price: "10.99",
        condition: "Like New",
        image: "/images/book3.png",
    };
    const currentBook = book ?? mockBook;

    const handleDelete = () => {
        const isConfirmed = window.confirm("Are you sure you want to delete this book");

        if(isConfirmed){
            console.log('Book with ID $(currentBook.id) deleted');
            navigate('/profile');            
        } else{
            navigate('/profile');
        }
    };

    return (
        <div className="book-detail-container">
            <div className="book-image">
                <img src={(currentBook).image} className='card-img-top' alt={(currentBook).title} />
            </div>
            <div className="book-info">
                <h2>{(currentBook).title}</h2>
                <p><strong>Price:</strong> ${(currentBook).price}</p>
                <p><strong>Description:</strong> {(currentBook).description}</p>
                <p><strong>Condition:</strong> {(currentBook).condition}</p>
                <p><strong>Author:</strong> {(currentBook).author}</p>
                <div className="button-group">
                    <button className="edit-btn" onClick={() => navigate(`/editbook/${(currentBook).id}`)}>Edit</button>
                    <button className="delete-btn"onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};


export default BookDetail;