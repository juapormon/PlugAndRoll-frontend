import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import DmGuideComponent from './DmGuideComponent';
import PlayerGuideComponent from './PlayerGuideComponent';

class GuidesComponent extends Component {

    render() {
        return (
            <div class="row">
                <DmGuideComponent />
                <PlayerGuideComponent />
            </div>
        );
    }
}

export default GuidesComponent;