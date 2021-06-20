import React, { Component } from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch() {
        window.location.replace("/panic");
    }

    render() {
        return this.props.children;
    }
}
export default ErrorBoundary;
