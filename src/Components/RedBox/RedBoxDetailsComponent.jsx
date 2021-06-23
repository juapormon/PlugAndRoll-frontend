import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import { RedBoxService } from '../../Services/RedBoxService';
import JSZip from 'jszip';
import FileSaver from 'file-saver';

var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

class RedBoxDetailsComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            title: "",
            story: "",
            maps: [],
            music: [],
            npcs: [],
            pcs: [],
            tokens: [],
            creator: null,
            admin: false
        }
        this.decodeArrayBuffer = this.decodeArrayBuffer.bind(this);
        this.removePaddingChars = this.removePaddingChars.bind(this);
        this.decode = this.decode.bind(this);
        this.downloadRedBox = this.downloadRedBox.bind(this);
        this.deleteRedBox = this.deleteRedBox.bind(this);
    }

    componentDidMount() {
        if (!AuthService.isAuthenticated())
            this.props.history.push("/login");
        else {
            RedBoxService.findById(this.state.id).then((data) => {
                this.setState({
                    title: data.title,
                    story: data.story,
                    maps: data.maps,
                    music: data.music,
                    npcs: data.npcs,
                    pcs: data.pcs,
                    tokens: data.tokens,
                    creator: data.creator
                });
                if (AuthService.getUserData().sub === this.state.creator.username)
                    this.props.history.push("/redboxUpdate/" + this.state.id)
                if (AuthService.getUserData().auth.some(e => e.authority == 'ROLE_ADMIN'))
                    this.setState({ admin: true })
            })
        }
    }

    decodeArrayBuffer = (input) => {
        var bytes = (input.length / 4) * 3;
        var ab = new ArrayBuffer(bytes);
        this.decode(input, ab);

        return ab;
    }

    removePaddingChars = (input) => {
        var lkey = _keyStr.indexOf(input.charAt(input.length - 1));
        if (lkey == 64) {
            return input.substring(0, input.length - 1);
        }
        return input;
    }

    decode = (input, arrayBuffer) => {
        //get last chars to see if are valid
        input = this.removePaddingChars(input);
        input = this.removePaddingChars(input);

        var bytes = parseInt((input.length / 4) * 3, 10);

        var uarray;
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        var j = 0;

        if (arrayBuffer)
            uarray = new Uint8Array(arrayBuffer);
        else
            uarray = new Uint8Array(bytes);

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        for (i = 0; i < bytes; i += 3) {
            //get the 3 octects in 4 ascii chars
            enc1 = _keyStr.indexOf(input.charAt(j++));
            enc2 = _keyStr.indexOf(input.charAt(j++));
            enc3 = _keyStr.indexOf(input.charAt(j++));
            enc4 = _keyStr.indexOf(input.charAt(j++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            uarray[i] = chr1;
            if (enc3 != 64) uarray[i + 1] = chr2;
            if (enc4 != 64) uarray[i + 2] = chr3;
        }

        return uarray;
    }

    downloadRedBox = (e) => {
        e.preventDefault();
        let zip = new JSZip();
        zip.file("story.txt", atob(this.state.story));
        let i = 1;
        this.state.maps.map(map => { zip.file("map" + i + ".png", this.decode(map)); i++; })
        i = 1;
        this.state.music.map(music => { zip.file("music" + i + ".mp3", this.decode(music)); i++; })
        i = 1;
        this.state.npcs.map(npc => { zip.file("npc" + i + ".png", this.decode(npc)); i++; })
        i = 1;
        this.state.pcs.map(pc => { zip.file("pc" + i + ".pdf", this.decode(pc)); i++; })
        i = 1;
        this.state.tokens.map(token => { zip.file("token" + i + ".png", this.decode(token)); i++; })
        zip.generateAsync({ type: "blob" }).then(function (content) {
            FileSaver.saveAs(content, "redbox.zip");
        });
    }

    deleteRedBox = (e) => {
        e.preventDefault();
        RedBoxService.delete(this.state.id).then(data => {
            if (typeof data == "string")
                this.props.history.push("/redbox")
            else
                this.setState({ submitError: "There has been an error, please try again!" })
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="justify-content-center align-items-center shadow-lg p-5 mb-4 bg-secondary">
                        <h2 style={{ display: "flex", justifyContent: "center" }}>{this.state.title}</h2>
                        <br />
                        <p>Story preview: {atob(this.state.story.substring(0, 200))}...</p>
                        <p>Maps: {this.state.maps.map(map => <img src={"data:image/png;base64," + map} style={{ maxWidth: '200px', maxHeight: '150px' }} />)}</p>
                        <p>Music: {this.state.music.map(music =>
                            <audio controls>
                                <source src={"data:audio/mp3;base64," + music} type="audio/ogg" />
                                <source src={"data:audio/mp3;base64," + music} type="audio/mpeg" />
                                <source src={"data:audio/mp3;base64," + music} type="audio/mp3" />
                                Your browser does not support the audio element.
                            </audio>
                        )}</p>
                        <p>NPCs: {this.state.npcs.map(npc => <img src={"data:image/png;base64," + npc} style={{ maxWidth: '200px', maxHeight: '150px' }} />)}</p>
                        <p>PCs: {this.state.pcs.map(pc => <button className="btn btn-ligh btn-lg border m-2 btn-sm" variant="outline-primary" onClick={() => window.open("data:application/pdf;base64," + pc)}>Character</button>)}</p>
                        <p>Tokens: {this.state.tokens.map(token => <img src={"data:image/png;base64," + token} style={{ maxWidth: '200px', maxHeight: '150px' }} />)}</p>
                        <button className="btn btn-ligh btn-lg border m-2 btn-sm" variant="outline-primary" onClick={this.downloadRedBox}>Download!</button>
                        {this.state.admin ?
                            <button className="btn btn-ligh btn-lg border m-2 btn-sm" variant="outline-primary" onClick={this.deleteRedBox}>Delete Red Box</button>
                            : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default RedBoxDetailsComponent;