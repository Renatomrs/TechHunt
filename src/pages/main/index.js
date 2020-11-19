import React, { Component } from "react";
import api from "../../services/api";
import { Link } from 'react-router-dom';

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import iconRight from '../../assets/right.svg';
import iconLeft from '../../assets/left.svg';

import './styles.css';

export default class Main extends Component {
    state = {
        products: [],
        productInfo: {},
        page: 1
    };

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);
        
        const { docs, ...productInfo } = response.data;

        this.setState({ products: docs, productInfo, page });
    };

    prevPage = () => {
        const { page } = this.state;

        if (page === 1) return;

        const pageNumber = page - 1;

        this.loadProducts(pageNumber);
    };

    nextPage = () => {
        const { page, productInfo } = this.state;

        if (page === productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
    };

    render() {
        const { products, page, productInfo } = this.state;

        return (
            <div>
                <Header />
                <div className="product-list">
                    {products.map(product => (
                        <article key={product._id}>
                            <header>
                                <h2>{product.title}</h2>
                            </header>
                        
                            <p>{product.description}</p>

                            <footer>
                                <Link 
                                    to={`/products/${product._id}`} 
                                    className="btn">
                                    Access
                                    <i className="fas fa-external-link-alt" id="linkIcon"></i>
                                </Link>
                            </footer>
                        </article>
                    ))}
                </div>

                <div className="actions">
                    <button 
                        disabled={page === 1} 
                        onClick={this.prevPage} 
                        className="btn .btn-left">
                        <img src={iconLeft} alt="Button-left" />
                    </button>

                    <button 
                        disabled={page === productInfo.pages} 
                        onClick={this.nextPage} 
                        className="btn .btn-right">
                        <img src={iconRight} alt="Button-right" />
                    </button>
                </div>
                <Footer />
            </div>
        );
    }
}