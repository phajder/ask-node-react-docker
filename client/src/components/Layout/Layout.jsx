import React, { Component } from 'react';
import { withAlert } from 'react-alert';
import axios from 'axios';

import { ActionButton } from '../';
import { Products } from '../';
import logo from './logo.svg';

class Layout extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          products: []
        };
      }

    loadData = async () => {
        const { alert } = this.props;
        try {
        let apiProducts = await axios.get('/api/products');
        this.setState({
            ...this.state,
            products: apiProducts.data
        });
        } catch(e) {
        alert.error(`Axios request failed: ${e}`);
        }
    }

    flushData = () => {
        this.setState({
        ...this.state,
        products: []
        })
    }

    render() {
        const { products } = this.state;
        return (
            <div className="container">
                <nav>
                    <div className="nav-wrapper indigo accent-2">
                        <a href="#!" className="brand-logo">
                            <img src={logo} className="logo-image" alt="logo" width={80}/>
                        </a>
                        <ul className="right hide-on-med-and-down">
                            <li><ActionButton callback={this.loadData} icon="cloud" text="Load data"/></li>
                            <li><ActionButton callback={this.flushData} icon="delete" text="Flush data"/></li>
                        </ul>
                    </div>
                </nav>
                <div className="row">
                    <Products products={products}/>
                </div>
            </div>
        );
    }
}

export default withAlert()(Layout);