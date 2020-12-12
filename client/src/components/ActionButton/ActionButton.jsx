import React, { Component } from 'react';

class ActionButton extends Component {
    render() {
        const { callback, icon, text } = this.props;
        return (
            <a href="#!" onClick={callback}>
                <i className="material-icons left">{icon}</i>
                {text}
            </a>
        );
    }
}

export default ActionButton;