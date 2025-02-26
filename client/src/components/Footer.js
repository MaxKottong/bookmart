import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {


    return (
        <footer className='bg-light text-black py-4'>
            <div className='container'>
                <div className='row'>
                    <div className='col col-lg-4'>
                        <h4>BookMark</h4>
                        <p>BookMark is your ultimate destination for book selling and buying, creating a bridge between readers and sellers</p>
                    </div>
                    <div className='col'>
                        <h4>Links</h4>
                        <ul className='list-unstyled'>
                            <li><Link className='nav-link text-black' to='/home'>Home</Link></li>
                            <li><Link className='nav-link text-black' to='/about'>About</Link></li>
                            <li><Link className='nav-link text-black' to='/login'>Login</Link></li>
                            <li><Link className='nav-link text-black' to='/register'>Resgister</Link></li>
                        </ul>

                    </div>
                    <div className='col'>
                        <h4>Contact Us</h4>
                        <ul className='list-unstyled'>
                            <li><i class="bi bi-envelope me-3"> abc@gmail.com</i></li>
                            <li><i className="bi bi-telephone me-3"> 704-234-7649</i></li>
                            <li><i className="bi bi-house-door-fill me-3"> Charlotte, NC, 28227, US</i></li>
                        </ul>
                    </div>
                    <div className='col col-lg-3 text-lg-end'>
                        <h4>Social Media</h4>
                        <i className="bi bi-twitter fs-5 me-3"></i>
                        <i className="bi bi-instagram fs-5  me-3"></i>
                        <i className="bi bi-facebook fs-5  me-3"></i>
                    </div>

                </div>
                <hr></hr>
                <div>
                    <p>2025 @ BookMart. All Rights Reserved</p>
                </div>
            </div>
        </footer>

    );
};

export default Footer;