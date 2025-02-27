import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/profile/${user}`)
                .then(response => response.json())
                .then(data => setUserData(data))
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, [user]);

    const handleSaveDescription = () => {
        fetch(`http://localhost:5000/profile/${user}/description`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description: userData.description })
        })
            .then((res) => res.json())
            .then((data) => {
                alert('Description saved successfully');
            })
            .catch((err) => console.error('Error saving description:', err));
    };

    const handleAddBookRedirect = () => navigate('/addbook');
    const handleBookDetailRedirect = () => navigate('/bookdetail');

    return (
        <div className='container mt-5 mb-5'>
            <div className='row'>
                <div className='col-md-4 mt-1'>
                    <div className='card text-center sidebar'>
                        <div className='card-body'>
                            <img src='/images/personIcon.png' className='rounded-circle' width='150' alt='user icon' />
                            <div className='mt-3 py-4'>
                                <h6>{userData?.username || 'User Name'}</h6>
                                <label htmlFor="formFileSm" className="form-label">Choose Profile Image</label>
                                <input className="form-control form-control-sm" id="formFileSm" type="file" />
                                <button type="button" className="btn btn-primary mt-3">Update Image</button>
                            </div>
                            <button type="button" className="btn btn-danger mt-3">Logout</button>
                        </div>
                    </div>
                </div>
                <div className='col-md-8 mt-1'>
                    <div className='card mb-3 content'>
                        <h1 className='m-3 pt-3'>User's Info</h1>
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
                                    <h5>Description:</h5>
                                </div>
                                <div className='col-md-9 text-secondary'>
                                    <textarea
                                        className="form-control"
                                        rows="2"
                                        placeholder='About the user, favorite books, hobbies, etc'
                                        value={userData?.description}
                                        onChange={(e) => setUserData({ ...userData, description: e.target.value })}>
                                    </textarea>
                                    <button type="button" className="btn btn-secondary mt-3" onClick={handleSaveDescription}>Save Description</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-md-12'>
                    <h5>Sell Books</h5>
                    <div className='card'>
                        <div className='card-body'>
                            <p>Add books to start selling!</p>
                            <button type="button" className="btn btn-dark" onClick={handleAddBookRedirect}>Click Here</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-md-12'>
                    <h5>My Collection Book</h5>
                    <div className='card'>
                        <div className='card-body'>
                            <button type="button" className="btn btn-dark" onClick={handleBookDetailRedirect}>Click Here</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
