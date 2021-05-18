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
            <div className="body">

                <head>
                    <h1>Conocenos Un Poco</h1>
                </head>
                <body>
                    <div className="title">
                        <h1>Conocenos Un Poco</h1>
                    </div>
                    <h2>Misión</h2>
                    <p>Nos encargamos de brindarle a nuestros usuarios la facilidad de poder tomar partidas ya preparadas, 
                    como son las antiguas “Red Box”, pero de forma online. Esto facilita a los nuevos usuarios el iniciarse 
                    en el complejo mundo de D&D, además de facilitar a los jugadores más veteranos el jugar una campaña. 
                    Además, daremos soporte para que desde la plataforma se puedan gestionar las sesiones de las partidas.
                    </p>
                    <p>Otra funcionalidad de la plataforma sería la creación de personajes, por si no queremos usar los que están 
                    predefinidos en las “Red Box”, y poder ofrecer una guía para dicha creación, donde dichos personajes se puedan 
                    exportar/importar.</p>
                    <p>Además, la plataforma incluye un foro donde la comunidad puede hablar y comentar partidas o dudas, aunque 
                    además presentamos un sistema por el cual se puedan preguntar dudas en tiempo real mediante un chat con el soporte.
                    Y como peculiaridad ofreceremos la posibilidad de contratar un coach para alguna sesión, por si los usuarios que 
                    participan quieren que un profesional le asesore a lo largo de la partida y al final obtener una valoración con el fin de mejorar en el roleplay
                    </p>
                    <h2>Visión</h2>
                    <p>Ser la principal solución de aquellos jugadores que quieren iniciarse en el mundo de D&D, y ser una
                     alternativa con ventajas sustanciales a otras páginas que usan jugadores veteranos.</p>
                    <h2>Valores</h2>
                    <ul>
                        <li>Calidad: ofrecer productos de alta calidad a nuestros clientes</li>
                        <li>Innovación: invertir en investigaciones para mejorar nuestros productos y 
                        servicios, haciéndolos cada vez más novedosos.</li>
                        <li>Buen trato a los clientes: Los clientes son nuestra mayor prioridad, es imprescindible tratarlos
                         con respetos y ofrecerle siempre el servicio más adecuado a sus necesidades.</li>
                        <li>Responsabilidad social: Dar a conocer la comunidad de D&D, y generar un ámbito donde se pueda compartir 
                        su afición y crear lazos de comunidad y amistad.</li>
                    </ul>
                    <h2>Equipo</h2>
                    <h3>Juan Carlos</h3>
                    <p>Descripcion breve de quien es y funciones que hace</p>
                    <h3>Juan Pablo</h3>
                    <p>Descripcion breve de quien es y funciones que hace</p>
                    <h3>Francisco Javier</h3>
                    <p>Descripcion breve de quien es y funciones que hace</p>
                </body>
            </div>
        );
    }
}

export default AboutUsComponent;