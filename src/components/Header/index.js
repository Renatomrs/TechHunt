import React from "react";
import { Link } from "react-router-dom";

import iconBackHome from '../../assets/home.svg';

import "./styles.css";

const Header = () => {
    return (
        <header id="main-header">
            <nav className="top-bar-container">
                <Link to="/">
                    <img src={iconBackHome} alt="Back" />
                </Link>

                <span id="logo">Tech Hunt</span>
            </nav>
        </header>
    ); 
} 

export default Header;