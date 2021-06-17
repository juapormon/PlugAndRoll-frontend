import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import { RedBoxService } from '../../Services/RedBoxService';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import JSZip from 'jszip';
import FileSaver from 'file-saver';

var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

class RedBoxUpdateComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            title: "",
            titleError: "",
            story: "",
            storyPreview: null,
            storyError: "",
            maps: [],
            mapsPreview: null,
            mapsError: "",
            music: [],
            musicPreview: null,
            musicError: "",
            npcs: [],
            npcsPreview: null,
            npcsError: "",
            pcs: [],
            pcsPreview: null,
            pcsError: "",
            tokens: [],
            tokensPreview: null,
            tokensError: "",
            creator: null,
            submitError: ""
        }
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeStoryHandler = this.changeStoryHandler.bind(this);
        this.eraseStoryHandler = this.eraseStoryHandler.bind(this);
        this.changeMapsHandler = this.changeMapsHandler.bind(this);
        this.eraseMapsHandler = this.eraseMapsHandler.bind(this);
        this.changeMusicHandler = this.changeMusicHandler.bind(this);
        this.eraseMusicHandler = this.eraseMusicHandler.bind(this);
        this.changeNpcsHandler = this.changeNpcsHandler.bind(this);
        this.eraseNpcsHandler = this.eraseNpcsHandler.bind(this);
        this.changePcsHandler = this.changePcsHandler.bind(this);
        this.erasePcsHandler = this.erasePcsHandler.bind(this);
        this.changeTokensHandler = this.changeTokensHandler.bind(this);
        this.eraseTokensHandler = this.eraseTokensHandler.bind(this);
        this.updateRedBox = this.updateRedBox.bind(this);
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
                if (AuthService.getUserData()['id'] !== this.state.creator.id)
                    this.props.history.push("/redboxDetails/" + this.state.id)
        })}
    }
    
    changeTitleHandler = (event) => {
        this.setState({ title: event.target.value })
    }
    changeStoryHandler = (event) => {
        let file = event.target.files[0]
        if (file) {
            const reader = new FileReader();
            reader.onload = this._handleStoryReaderLoaded.bind(this)
            reader.readAsBinaryString(file)
        }
        this.setState({ storyPreview: event.target.value });
    }
    _handleStoryReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result
        this.setState({
            story: btoa(binaryString)
        })
        // console.log(atob(this.state.story))
    }
    eraseStoryHandler = () => {
        this.setState({
            story: "",
            storyPreview: "",
            storyError: ""
        })
    }
    changeMapsHandler = (event) => {
        let file = event.target.files[0]
        if (file) {
            const reader = new FileReader();
            reader.onload = this._handleMapsReaderLoaded.bind(this)
            reader.readAsBinaryString(file)
        }
        this.setState({ mapsPreview: event.target.value })
    }
    _handleMapsReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result
        this.state.maps.push(btoa(binaryString))
        this.setState({ mapsPreview: this.state.mapsPreview })
    }
    eraseMapsHandler = () => {
        this.setState({
            maps: [],
            mapsPreview: "",
            mapsError: ""
        })
    }
    changeMusicHandler = (event) => {
        let file = event.target.files[0]
        if (file) {
            const reader = new FileReader();
            reader.onload = this._handleMusicReaderLoaded.bind(this)
            reader.readAsBinaryString(file)
        }
        this.setState({ musicPreview: event.target.value })
    }
    _handleMusicReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result
        this.state.music.push(btoa(binaryString))
        this.setState({ musicPreview: this.state.musicPreview })
    }
    eraseMusicHandler = () => {
        this.setState({
            music: [],
            musicPreview: "",
            musicError: ""
        })
    }
    changeNpcsHandler = (event) => {
        let file = event.target.files[0]
        if (file) {
            const reader = new FileReader();
            reader.onload = this._handleNpcsReaderLoaded.bind(this)
            reader.readAsBinaryString(file)
        }
        this.setState({ npcsPreview: event.target.value })
    }
    _handleNpcsReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result
        this.state.npcs.push(btoa(binaryString))
        this.setState({ npcsPreview: this.state.npcsPreview })
    }
    eraseNpcsHandler = () => {
        this.setState({
            npcs: [],
            npcsPreview: "",
            npcsError: ""
        })
    }
    changePcsHandler = (event) => {
        let file = event.target.files[0]
        if (file) {
            const reader = new FileReader();
            reader.onload = this._handlePcsReaderLoaded.bind(this)
            reader.readAsBinaryString(file)
        }
        this.setState({ pcsPreview: event.target.value });
    }
    _handlePcsReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result
        this.state.pcs.push(btoa(binaryString))
        this.setState({ pcsPreview: this.state.pcsPreview })
    }
    erasePcsHandler = () => {
        this.setState({
            pcs: [],
            pcsPreview: "",
            pcsError: ""
        })
    }
    changeTokensHandler = (event) => {
        let file = event.target.files[0]
        if (file) {
            const reader = new FileReader();
            reader.onload = this._handleTokensReaderLoaded.bind(this)
            reader.readAsBinaryString(file)
        }
        this.setState({ tokensPreview: event.target.value })
    }
    _handleTokensReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result
        this.state.tokens.push(btoa(binaryString))
        this.setState({ tokensPreview: this.state.tokensPreview })
    }
    eraseTokensHandler = () => {
        this.setState({
            tokens: [],
            tokensPreview: "",
            tokensError: ""
        })
    }

    validate = () => {
        let titleError = "";
        let storyError = "";
        let mapsError = "";
        let musicError = "";
        let npcsError = "";
        let pcsError = "";
        let tokensError = "";
        this.setState({ submitError: "" })

        if (this.state.title.trim().length === 0) {
            titleError = "The Red Box needs a title!";
        }
        if (this.state.story.length === 0) {
            storyError = "The Red Box needs a story!";
        }
        if (this.state.maps.length === 0) {
            mapsError = "The Red Box needs maps!";
        }
        if (this.state.music.length === 0) {
            musicError = "The Red Box needs music!";
        }
        if (this.state.npcs.length === 0) {
            npcsError = "The Red Box needs NPCs!";
        }
        if (this.state.pcs.length === 0) {
            pcsError = "The Red Box needs PCs!";
        }
        if (this.state.tokens.length === 0) {
            tokensError = "The Red Box needs tokens!";
        }

        this.setState({ titleError });
        this.setState({ storyError });
        this.setState({ mapsError });
        this.setState({ musicError });
        this.setState({ npcsError });
        this.setState({ pcsError });
        this.setState({ tokensError });
        if (titleError || storyError || mapsError || musicError || npcsError || pcsError || tokensError)
            return false;
        else
            return true;
    }
    updateRedBox = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            let redBox = {
                title: this.state.title.trim(), story: this.state.story, maps: this.state.maps, music: this.state.music, npcs: this.state.npcs, pcs: this.state.pcs, tokens: this.state.tokens, creator: AuthService.getUserData()
            }
            RedBoxService.update(this.state.id, redBox).then(data => {
                if (typeof data == "string")
                    this.props.history.push("/redbox")
                else
                    this.setState({ submitError: "There has been an error, please try again!" })
            })
        }
    }

    decodeArrayBuffer = (input) => {
        var bytes = (input.length/4) * 3;
        var ab = new ArrayBuffer(bytes);
        this.decode(input, ab);
        
        return ab;
    }

    removePaddingChars = (input) => {
        var lkey = _keyStr.indexOf(input.charAt(input.length - 1));
        if(lkey == 64){
            return input.substring(0,input.length - 1);
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
        
        for (i=0; i<bytes; i+=3) {	
            //get the 3 octects in 4 ascii chars
            enc1 = _keyStr.indexOf(input.charAt(j++));
            enc2 = _keyStr.indexOf(input.charAt(j++));
            enc3 = _keyStr.indexOf(input.charAt(j++));
            enc4 = _keyStr.indexOf(input.charAt(j++));
    
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
    
            uarray[i] = chr1;			
            if (enc3 != 64) uarray[i+1] = chr2;
            if (enc4 != 64) uarray[i+2] = chr3;
        }
    
        return uarray;	
    }

    downloadRedBox = (e) => {
        e.preventDefault();
        let zip = new JSZip();
        zip.file("story.txt", atob(this.state.story));
        let i = 1;
        this.state.maps.map( map => { zip.file("map" + i + ".png", this.decode(map)); i++; })
        i = 1;
        this.state.music.map( music => { zip.file("music" + i + ".mp3", this.decode(music)); i++; })
        i = 1;
        this.state.npcs.map( npc => { zip.file("npc" + i + ".png", this.decode(npc)); i++; })
        i = 1;
        this.state.pcs.map( pc => { zip.file("pc" + i + ".pdf", this.decode(pc)); i++; })
        i = 1;
        this.state.tokens.map( token => { zip.file("token" + i + ".png", this.decode(token)); i++; })
        zip.generateAsync({type: "blob"}).then(function(content) {
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
        return(
            <form>
                <Form className="FormStyle">
                    <h2 style={{ textAlign: "center" }}>Update your Red Box!</h2>
                    <h5 style={{ textAlign: "center" }}>Maximum size of the Red Box 16 MB. Larger files WIP.</h5>
                    <br />

                    <Form.Group as={Row}>
                        <Form.Label column sm="1">Title:</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" className="FormInput" placeholder="Title" value={this.state.title} onChange={this.changeTitleHandler} />
                            {this.state.titleError ? (<div className="ValidatorMessage">
                                {this.state.titleError}
                            </div>) : null}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="1">Story: (.txt format)</Form.Label>
                        <Col sm="10">
                            {this.state.storyPreview !== "" ?
                                <React.Fragment>
                                    <Form.Label column sm="1">Actual story:</Form.Label>
                                    < br />
                                    <p>{atob(this.state.story.substring(0,20))}...</p>
                                </React.Fragment>
                            : null}
                            <Form.Control type="file" accept=".txt" className="FormInput" placeholder="Story" value={this.state.storyPreview} onChange={this.changeStoryHandler} />
                            {this.state.storyError ? (<div className="ValidatorMessage">
                                {this.state.storyError}
                            </div>) : null}
                        </Col>
                        <Button onClick={this.eraseStoryHandler}>Erase story</Button>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="1">Maps: (.jpg, .jpeg or .png formats)</Form.Label>
                        <Col sm="10">
                            {this.state.mapsPreview !== "" ?
                                <React.Fragment>
                                    <Form.Label column sm="1">Actual maps:</Form.Label>
                                    < br />
                                    {this.state.maps.map(map =>
                                        <Image src={"data:image/png;base64," + map} style={{ maxWidth: '200px', maxHeight: '150px' }} />
                                    )}
                                </React.Fragment>
                                : null}
                            <Form.Control type="file" accept=".jpg, .jpeg, .png" className="FormInput" placeholder="Maps" value={this.state.mapsPreview} onChange={this.changeMapsHandler} />
                            {this.state.mapsError ? (<div className="ValidatorMessage">
                                {this.state.mapsError}
                            </div>) : null}
                        </Col>
                        <Button onClick={this.eraseMapsHandler}>Erase maps</Button>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="1">Music: (.mp3 or .wav formats)</Form.Label>
                        <Col sm="10">
                            {this.state.musicPreview !== "" ?
                                <React.Fragment>
                                    <Form.Label column sm="1">Actual music:</Form.Label>
                                    < br />
                                    {this.state.music.map(music =>
                                        <audio controls>
                                            <source src={"data:audio/mp3;base64," + music} type="audio/ogg" />
                                            <source src={"data:audio/mp3;base64," + music} type="audio/mpeg" />
                                            <source src={"data:audio/mp3;base64," + music} type="audio/mp3" />
                                            Your browser does not support the audio element.
                                        </audio>
                                    )}
                                </React.Fragment>
                                : null}
                            <Form.Control type="file" accept=".mp3, .wav" className="FormInput" placeholder="Music" value={this.state.musicPreview} onChange={this.changeMusicHandler} />
                            {this.state.musicError ? (<div className="ValidatorMessage">
                                {this.state.musicError}
                            </div>) : null}
                        </Col>
                        <Button onClick={this.eraseMusicHandler}>Erase music</Button>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="1">NPCs: (.jpg, .jpeg or .png formats)</Form.Label>
                        <Col sm="10">
                            {this.state.npcsPreview !== "" ?
                                <React.Fragment>
                                    <Form.Label column sm="1">Actual NPCs:</Form.Label>
                                    < br />
                                    {this.state.npcs.map(npc =>
                                        <Image src={"data:image/png;base64," + npc} style={{ maxWidth: '200px', maxHeight: '150px' }} />
                                    )}
                                </React.Fragment>
                                : null}
                            <Form.Control type="file" accept=".jpg, .jpeg, .png" className="FormInput" placeholder="NPCs" value={this.state.npcsPreview} onChange={this.changeNpcsHandler} />
                            {this.state.npcsError ? (<div className="ValidatorMessage">
                                {this.state.npcsError}
                            </div>) : null}
                        </Col>
                        <Button onClick={this.eraseNpcsHandler}>Erase NPCs</Button>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="1">PCs: (.pdf format)</Form.Label>
                        <Col sm="10">
                            {this.state.pcsPreview !== "" ?
                                <React.Fragment>
                                    <Form.Label column sm="1">Actual PCs:</Form.Label>
                                    < br />
                                    {this.state.pcs.map(pc =>
                                        <Button onClick={() => window.open("data:application/pdf;base64," + pc)}>Character</Button>
                                    )}
                                </React.Fragment>
                                : null}
                            <Form.Control type="file" accept=".pdf" className="FormInput" placeholder="PCs" value={this.state.pcsPreview} onChange={this.changePcsHandler} />
                            {this.state.pcsError ? (<div className="ValidatorMessage">
                                {this.state.pcsError}
                            </div>) : null}
                        </Col>
                        <Button onClick={this.erasePcsHandler}>Erase PCs</Button>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="1">Tokens: (.jpg, .jpeg or .png formats)</Form.Label>
                        <Col sm="10">
                            {this.state.tokensPreview !== "" ?
                                <React.Fragment>
                                    <Form.Label column sm="1">Actual tokens:</Form.Label>
                                    < br />
                                    {this.state.tokens.map(token =>
                                        <Image src={"data:image/png;base64," + token} style={{ maxWidth: '200px', maxHeight: '150px' }} />
                                    )}
                                </React.Fragment>
                                : null}
                            <Form.Control type="file" accept=".jpg, .jpeg, .png" className="FormInput" placeholder="Tokens" value={this.state.tokensPreview} onChange={this.changeTokensHandler} />
                            {this.state.tokensError ? (<div className="ValidatorMessage">
                                {this.state.tokensError}
                            </div>) : null}
                        </Col>
                        <Button onClick={this.eraseTokensHandler}>Erase tokens</Button>
                    </Form.Group>

                    <Button variant="outline-success" onClick={this.updateRedBox}>Update Red Box</Button>
                    {this.state.submitError ? (<div className="ValidatorMessage">
                        {this.state.submitError}
                    </div>) : null}
                    <Button variant="outline-success" onClick={this.downloadRedBox}>Descargar!</Button>
                    <Button onClick={this.deleteRedBox}>Delete Red Box</Button>
                </Form>
            </form>
        );
    }
}

export default RedBoxUpdateComponent;