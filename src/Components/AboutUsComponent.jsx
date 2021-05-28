import React, { Component } from 'react';
import '../App.css';
import cajaroja from '../assets/cajaroja.jpg';

class AboutUsComponent extends Component {

    constructor(props){
        super(props)

        this.state={
            
        }
    }
    render() {
        return (
            <div className="container">
                <div className="text-center bg-darSk">
                    <h1 className="text-danger">Who We Are?</h1>
                </div>
                <div className="container">
                    <div id="introduction" className="shadow p-4 mb-4 bg-dark rounded-lg">
                    <h2 className="text-center text-white">Introduction</h2>
                        <p className="text-white">We are a group of friends who are fond of the world of role-playing games and we love to share our hobby,
                         but there is a problem and it is the time that must be spent beforehand to know and know what this world 
                         is about before playing, so We both came up with the idea of creating a platform
                          where this problem would be dealt with, hence the idea of Plug & Roll was born.</p>
                    </div>
                    <div id="mision" className="shadow p-4 mb-4 bg-dark rounded-lg">
                        <h2 className="text-center text-white">What is our mision?</h2>
                        <p className="text-white">We take care of providing our users with the facility of being able to take ready-made games,
                         as are the old "Red Box", but online. This makes it easier for new users to get started
                         in the complex world of D&D, as well as making it easier for veteran players to play a campaign.
                         In addition, we will provide support so that the game sessions can be managed from the platform.
                        </p>
                        <p className="text-white">Another functionality of the platform would be the creation of characters, in case we do not want to use the ones that are
                         predefined in the "Red Box", and be able to offer a guide for said creation, where said characters can be
                         export / import.</p>
                        <p className="text-white">In addition, the platform includes a forum where the community can speak and comment on games or doubts, although
                         We also present a system by which you can ask questions in real time through a chat with support.
                         And as a peculiarity, we will offer the possibility of hiring a coach for a session, in case users who
                         participate they want a professional to advise them throughout the game and at the end obtain an assessment in order to improve their roleplay.
                        </p>
                    </div>
                    <div id="vision" className="shadow p-4 mb-4 bg-dark rounded-lg">
                        <h2 className="text-center text-white">What is our vision?</h2>
                        <p className="text-white">To be the main solution for those players who want to get started in the world of D&D, 
                        and to be an alternative with substantial advantages to other pages used by veteran players.</p>
                    </div>
                    <div id="values" className="shadow p-4 mb-4 bg-dark rounded-lg text-white">
                        <h2 className="text-center">Our values</h2>
                        <ul className="list-group">
                            <li className="list-group-item border-0 rounded-circle text-center bg-danger"><b className="text-white">Quality:</b><br/> <p className="text-white">offering high quality products to our customers. </p></li>
                            <li className=" list-group-item border-0 rounded-circle text-center bg-danger"><b className="text-white">Innovation:</b><br/><p className="text-white">investing in research to improve our products and services,
                            making them increasingly innovative.</p></li>
                            <li className=" list-group-item border-0 rounded-circle text-center bg-danger text-white"><b>Good treatment of clients:</b><br/> <p>Clients are our highest priority, 
                            it is essential to treat them with respect and always offer the most appropriate service <br/>to their needs.</p></li>
                            <li className=" list-group-item border-0 rounded-circle text-center bg-danger text-white"><b>Social responsibility:</b><br/>Make the D&D community known, and create an environment where it can be shared
                            his hobby and create bonds of community and friendship.</li>
                        </ul>
                    </div>
                    <div id="team" className=" shadow p-4 mb-4 bg-dark rounded-lg text-white">
                    <h2 className="text-center">Team</h2>
                    <h3>Juan Carlos</h3>
                    <p>Is a software engineer who studied in Universidad de Sevilla,
                     he decided to start with us because he love rol and stay with his frineds playing D&D. 
                     He will be working on the Accounting area and 
                     in the development of characters management as fullsatack developers.</p>
                    <h3>Juan Pablo</h3>
                    <p>Is a software engineer who studied in Universidad de Sevilla, 
                    he decided to start with us because he likes Dungeons&Dragons. 
                    He will be working on  the Communication area, 
                    developing forums and a coaching system as fullStack Developer.</p>
                    <h3>Francisco Javier</h3>
                    <p>Descripcion breve de quien es y funciones que hace</p>
                </div>
                    </div>
            </div>
        );
    }
}

export default AboutUsComponent;