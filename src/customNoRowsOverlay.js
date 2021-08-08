import React, { Component } from 'react';

export default class CustomNoRowsOverlay extends Component {
    render() {
        return (
            <div>
                <i className="far fa-frown"> {this.props.noRowsMessageFunc()}</i>
            </div>
        );
    }
}
