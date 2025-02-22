import React from 'react';
import {useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleAddBookRedirect = () =>{
      navigate('/addbook');
    }

    const handleBookDetailRedirect =() =>{
      navigate('/bookdetail');
    }

    return (

    <div className='container mt-5 mb-5'>
    <div className='row'>
      <div className='col-md-4 mt-1'>
        <div className='card text-center sidebar'>
          <div className='card-body'>
            <img src='/images/personIcon.png' className='rounded-circle' width='150' alt='user icon'/>
            <div className='mt-3 py-4'>
              <h6>User Name</h6>
            <label for="formFileSm" class="form-label">Choose Profile Image</label>
            <input class="form-control form-control-sm" id="formFileSm" type="file"/>
            <button type="button" class="btn btn-primary mt-3">Update Image</button>
            </div>
            <button type="button" class="btn btn-danger mt-3">Logout</button>
          </div>
        </div>
      </div>
      <div className='col-md 8 mt-1'>
        <div className='card mb-3 content'>
          <h1 className='m-3 pt-3'>User's Info</h1>
          <div className='card-body'>
            <div className='row'>
              <div className='col-md-3'>
                <h5>Username:</h5>
              </div>
              <div className='col-md-9 text-secondary'>
                Usersname entered here
              </div>
            </div>
            <hr></hr>
            <div className='row'>
              <div className='col-md-3'>
              <h5>Email:</h5>
              </div>
              <div className='col-md-9 text-secondary'>
                Email entered here
              </div>
            </div>
            <hr></hr>
            <div className='row'>
            <div className='col-md-3'>
              <h5>Member Since:</h5>
              </div>
              <div className='col-md-9 text-secondary'>
                2/19/2025
              </div>
            </div>
            <hr></hr>
            <div className='row'>
            <div className='col-md-3'>
              <h5>Description:</h5>
              </div>
              <div className='col-md-9 text-secondary'>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="2" placeholder='About the user, favorite books, hobbies, etc'></textarea>
              <button type="button" class="btn btn-secondary mt-3">Save Description</button>
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
          <button type="button" class="btn btn-dark" onClick={handleAddBookRedirect}>
            Click Here</button>
          </div>
        </div>
      </div>
      </div>
      <div className='row mt-3'>
      <div className='col-md-12'>
      <h5>My Collection Book</h5>
        <div className='card'>
          <div className='card-body'>
          <button type="button" class="btn btn-dark" onClick={handleBookDetailRedirect}>
            Click Here</button>
          </div>
        </div>
      </div>
    </div>
    </div>

);
};

export default Profile;