import React from 'react';
import { Component } from 'react';

class Products extends Component {
    render() {
        const { products } = this.props;
        return (
            <div className="product-container">
                <table className="striped centered blue lighten-3">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Product name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.products &&
                            Object.values(products).map(elem => {
                                return (
                                    <tr key={elem.id}>
                                        <td>{elem.id}</td>
                                        <td>{elem.productName}</td>
                                        <td>{elem.price}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Products;