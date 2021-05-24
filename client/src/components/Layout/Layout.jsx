import React, { Component } from 'react';
import { withAlert } from 'react-alert';
import axios from 'axios';

import { ActionButton } from '../';
import { Products } from '../';
import logo from './logo.svg';
import M from 'materialize-css';

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
		document.addEventListener('DOMContentLoaded', function() {
			var elems = document.querySelectorAll('.sidenav');
		    var instances = M.Sidenav.init(elems);
		});
        return (
			<>
			<header>
				<nav className="top-nav indigo accent-2">
					<div className="container">
						<div className="nav-wrapper">
							<div className="row">
								<a href="#" data-target="slide-out" className="top-nav sidenav-trigger brand-logo">
									<img src={logo} className="logo-image" alt="logo" width={80}/>
								</a>
								<ul className="right hide-on-med-and-down">
									<li><ActionButton callback={this.loadData} icon="cloud" text="Load data"/></li>
									<li><ActionButton callback={this.flushData} icon="delete" text="Flush data"/></li>
								</ul>
							</div>
						</div>
					</div>
				</nav>
				<ul id="slide-out" class="sidenav sidenav-close">
					<li><ActionButton callback={this.loadData} icon="cloud" text="Load data"/></li>
					<li><ActionButton callback={this.flushData} icon="delete" text="Flush data"/></li>
				</ul>
			</header>
			
			<main>
				<div className="container">
					<div className="row">
						<Products products={products}/>
					</div>
				</div>
			</main>
			</>
        );
    }
}

export default withAlert()(Layout);