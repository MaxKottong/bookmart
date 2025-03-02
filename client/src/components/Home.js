import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../style/home.css';
import bgImage from '../assets/bookBackground.png'


const Home = () => {
    const { user } = useAuth();

    return (
        <>
        <div className='custom-home text-center' style={{ backgroundImage: `url(${bgImage})` }}>
            <h1>Welcome to BookMart</h1>
            <h3>Your one-stop solution for book selling and buying.</h3>
            <Link to={user ? "/profile" : "/login"} className="btn btn-primary btn-lg">
            {user ? "Go to Profile" : "Get Started"}
            </Link>
        </div>
        <div className='padding'>
                <div className='container'>
                    <div className='row align-items-center'>
                        <div className='col-md-6'>
                            <img src='/images/buyBookOnline.png' className='img-fluid' alt='buy books online'/>
                            </div>
                        <div className='col-md-6 text-center'>
                            <h2>Buy Books with Ease</h2>
                            <p className='lead'>Discover your next great read with ease! Browse a vast collection of books across all genres, from bestsellers to hidden gems. Whether you're looking for brand-new releases or affordable pre-owned books, our platform connects you with a diverse selection at competitive prices. Enjoy a seamless shopping experience with secure transactions and easy browsing—because finding your next favorite book should be as enjoyable as reading it!</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='padding'>
                <div className='container'>
                    <div className='row align-items-center'>
                    <div className='col-md-6'>
                            <h2>Sell Books Effortlessly</h2>
                            <p className='lead'>Give your books a new home with ease! Our platform makes it simple to list books you no longer need and connect with readers who will appreciate them. Whether you're making space on your shelves or sharing stories with others, you can easily upload your listings, set details, and find interested buyers. With a smooth and user-friendly process, passing your books along has never been more convenient.</p>
                        </div>
                        <div className='col-md-6'>
                            <img src='/images/sellingBooks.png' className='img-fluid' alt='sell books online'/>
                            </div>            
                    </div>
                </div>
            </div>
            <h2 className='text-center py-5'>Discover a Wide Range of Books</h2>
            <div className='container'>
            <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3'>
               
                <div className='col mb-4'>
                    <div className='card'>
                        <img src= '/images/book1.png' className='card-img-top' alt=''/>
                        <div className='card-body'>
                            <h5 className='card-title'>Wonder</h5>
                            <p className='card-text'>Condition: Used</p>
                            <p className='card-text'>Price: 10.99</p>
                            <p className='card-text'>Author: R. J. Palacio</p>
                            <Link className="btn btn-primary" to="#">Buy Now</Link>
                        </div>
                    </div>
                </div>
                <div className='col mb-4'>
                    <div className='card'>
                        <img src= '/images/book2.png' className='card-img-top' alt=''/>
                        <div className='card-body'>
                            <h5 className='card-title'>Harry Potter and the Philosopher's Stone</h5>
                            <p className='card-text'>Condition: New</p>
                            <p className='card-text'>Price: 12.99</p>
                            <p className='card-text'>Author: J.K. Rowling</p>
                            <Link className="btn btn-primary" to="#">Buy Now</Link>
                        </div>
                    </div>
                </div>
                <div className='col mb-4'>
                    <div className='card'>
                        <img src= '/images/book3.png' className='card-img-top' alt=''/>
                        <div className='card-body'>
                            <h5 className='card-title'>The HouseMaid</h5>
                            <p className='card-text'>Condition: Used</p>
                            <p className='card-text'>Price: 11.99</p>
                            <p className='card-text'>Author: Freida McFadden</p>

                            <Link className="btn btn-primary" to="#">Buy Now</Link>
                        </div>
                    </div>
                </div>
                <div className='col mb-4'>
                    <div className='card'>
                        <img src= '/images/book4.png' className='card-img-top' alt=''/>
                        <div className='card-body'>
                            <h5 className='card-title'>The Great Gatsby</h5>
                            <p className='card-text'>Condition: New</p>
                            <p className='card-text'>Price: 13.99</p>
                            <p className='card-text'>Author: Francis Scott Fitzgerald</p>
                            <Link className="btn btn-primary" to="#">Buy Now</Link>
                        </div>
                    </div>
                </div>
                <div className='col mb-4'>
                    <div className='card'>
                        <img src= '/images/book5.png' className='card-img-top' alt=''/>
                        <div className='card-body'>
                            <h5 className='card-title'>The Book Theif</h5>
                            <p className='card-text'>Condition: Used</p>
                            <p className='card-text'>Price: 10.99</p>
                            <p className='card-text'>Author: Markus Zusak</p>
                            <Link className="btn btn-primary" to="#">Buy Now</Link>
                        </div>
                    </div>
                </div>
                <div className='col mb-4'>
                    <div className='card'>
                        <img src= '/images/book6.png' className='card-img-top' alt=''/>
                        <div className='card-body'>
                            <h5 className='card-title'>The Love Hypothesis</h5>
                            <p className='card-text'>Condition: New</p>
                            <p className='card-text'>Price: 9.15</p>
                            <p className='card-text'>Author: Ali Hazelwood</p>
                            <Link className="btn btn-primary" to="#">Buy Now</Link>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className='padding'>
                <div className='container'>
                    <div className='row align-items-center'>
                        <div className='col-md-6'>
                            <img src='/images/forumDiscussion.png' className='img-fluid' alt='discuss books online'/>
                            </div>
                        <div className='col-md-6 text-center'>
                            <h2>Join the Community</h2>
                            <p className='lead'>Books are meant to be shared! Engage with fellow readers through our discussion forum, where you can create posts, rate books, and share your thoughts on the latest reads. Ask for recommendations, debate plot twists, and connect with book enthusiasts from all over.</p>
                        </div>
                    </div>
                </div>
            </div>
            </>

    
        
);
};

export default Home;