import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NotFound from './NotFound';

const Profile = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (username) {
            fetch(`http://localhost:5000/profile/${username}`)
                .then(response => {
                    if (response.status === 404) {
                        setNotFound(true);
                        return null;
                    }
                    return response.json();
                })
                .then(data => setUserData(data))
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, [username]);

    if (notFound) {
        return <NotFound />;
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container mt-5 mb-5'>
            <div className='row'>
                <div className='col-md-4 mt-1'>
                    <div className='card text-center sidebar'>
                        <div className='card-body'>
                            <img src='/images/personIcon.png' className='rounded-circle' width='150' alt='user icon' />
                            <div className='mt-3 py-4'>
                                <h6>{userData?.username || 'User Name'}</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-8 mt-1'>
                    <div className='card mb-3 content'>
                        <h1 className='m-3 pt-3'>{userData?.username}'s Info</h1>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-md-3'>
                                    <h5>Username:</h5>
                                </div>
                                <div className='col-md-9 text-secondary'>
                                    {userData?.username || 'N/A'}
                                </div>
                            </div>
                            <hr />
                            <div className='row'>
                                <div className='col-md-3'>
                                    <h5>Email:</h5>
                                </div>
                                <div className='col-md-9 text-secondary'>
                                    {userData?.email || 'N/A'}
                                </div>
                            </div>
                            <hr />
                            <div className='row'>
                                <div className='col-md-3'>
                                    <h5>Member Since:</h5>
                                </div>
                                <div className='col-md-9 text-secondary'>
                                    {userData?.created_at ? new Date(userData.created_at).toLocaleDateString() : 'N/A'}
                                </div>
                            </div>
                            <hr />
                            <div className='row'>
                                <div className='col-md-3'>
                                    <h5>About Them:</h5>
                                </div>
                                <div className='col-md-9 text-secondary'>
                                    {userData?.about || 'No About available'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-md-12'>
                    <h5>Owned Books</h5>
                    <div className='row'>
                        {userData?.books?.length > 0 ? (
                            userData.books.map((book) => (
                                <div key={book.book_id} className='col-md-4'>
                                    <div className='card mb-3'>
                                        <img src={book.image || 'https://placehold.co/300x500'} className='card-img-top' alt={book.title} />
                                        <div className='card-body'>
                                            <h5 className='card-title'>{book.title}</h5>
                                            <p className='card-text'>Author: {book.author}</p>
                                            <p className='card-text'>Price: ${book.price}</p>
                                            <p className='card-text'><small className='text-muted'>{book.condition}</small></p>
                                            <button className="btn btn-dark" onClick={() => navigate(`/bookdetail/${book.book_id}`)}>View Details</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No books found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
