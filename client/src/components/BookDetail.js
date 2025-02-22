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

    return (
        <div className="book-detail-container">
            <div className="book-image">
                <img src={(book ?? mockBook).image} className='card-img-top' alt={(book ?? mockBook).title} />
            </div>
            <div className="book-info">
                <h2>{(book ?? mockBook).title}</h2>
                <p><strong>Price:</strong> ${(book ?? mockBook).price}</p>
                <p><strong>Description:</strong> {(book ?? mockBook).description}</p>
                <p><strong>Condition:</strong> {(book ?? mockBook).condition}</p>
                <p><strong>Author:</strong> {(book ?? mockBook).author}</p>
                <div className="button-group">
                    <button className="edit-btn" onClick={() => navigate(`/editbook/${(book ?? mockBook).id}`)}>Edit</button>
                    <button className="delete-btn">Delete</button>
                </div>
            </div>
        </div>
    );
};


export default BookDetail;