import React, { Component } from 'react';
import springLogo from '../../assets/spring-boot-logo.png';
import reactLogo from '../../assets/react-logo.png';

class FooterComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }
    render() {
        return (
            <footer className="bg-secondary text-center text-lg-start border border-right-0 border-bottom-0 border-left-0 border-dark">
                <span>All rights reserved</span>
                <p><span>Powered with:
                    <a href="https://spring.io"><img src={springLogo} style={{ marginLeft: "5px" }} width="35" height="35" /></a> and <a href="https://es.reactjs.org"><img src={reactLogo} width="37" height="37" /></a>
                </span></p>
            </footer>
        );
    }
}

export default FooterComponent;