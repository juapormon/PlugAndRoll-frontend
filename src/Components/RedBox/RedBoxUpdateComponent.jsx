import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import { RedBoxService } from '../../Services/RedBoxService';
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
                if (AuthService.getUserData().sub !== this.state.creator.username)
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
            <div className="text-center container">
                <div className="row justify-content-center align-items-center">
                    <form className="shadow-lg p-5 bg-secondary">
                        <h2>Create a Red Box!</h2>
                        <h5>Maximum size of the Red Box is 16 MB. Larger files WIP.</h5>
                        <br />

                        <div className="form-group">
                            <label for="title">Title:</label>
                            <input type="text" className="form-control" placeholder="Title" value={this.state.title} onChange={this.changeTitleHandler} />
                            {this.state.titleError ? (<div className="text-danger">
                                {this.state.titleError}
                            </div>) : null}
                        </div>

                        <div className="form-group">
                            <label for="story">Story: (.txt format)</label>
                            {this.state.story !== "" ?
                                <React.Fragment>
                                    <br />
                                    <label>Actual story:</label>
                                    < br />
                                    <p>{atob(this.state.story.slice(0, 20))}...</p>
                                    <button className="btn btn-ligh btn-lg border m-2 btn-sm" variant="outline-primary" onClick={this.eraseStoryHandler}>Erase story</button>
                                </React.Fragment>
                                : null}
                            <input type="file" accept=".txt" className="form-control" placeholder="Story" value={this.state.storyPreview} onChange={this.changeStoryHandler} />
                            {this.state.storyError ? (<div className="text-danger">
                                {this.state.storyError}
                            </div>) : null}
                        </div>

                        <div className="form-group">
                            <label for="maps">Maps: (.jpg, .jpeg or .png formats)</label>
                            {this.state.maps[0] !== undefined ?
                                <React.Fragment>
                                    <br />
                                    <label>Actual maps:</label>
                                    < br />
                                    {this.state.maps.map(map =>
                                        <img src={"data:image/png;base64," + map} style={{ maxWidth: '200px', maxHeight: '150px' }} />
                                    )}
                                    < br />
                                    <button className="btn btn-ligh btn-lg border m-2 btn-sm" variant="outline-primary" onClick={this.eraseMapsHandler}>Erase maps</button>
                                </React.Fragment>
                                : null}
                            <input type="file" accept=".jpg, .jpeg, .png" className="form-control" placeholder="Maps" value={this.state.mapsPreview} onChange={this.changeMapsHandler} />
                            {this.state.mapsError ? (<div className="text-danger">
                                {this.state.mapsError}
                            </div>) : null}
                        </div>

                        <div className="form-group">
                            <label for="music">Music: (.mp3 or .wav formats)</label>
                            {this.state.music[0] !== undefined ?
                                <React.Fragment>
                                    <br />
                                    <label>Actual music:</label>
                                    < br />
                                    {this.state.music.map(music =>
                                        <audio controls>
                                            <source src={"data:audio/mp3;base64," + music} type="audio/ogg" />
                                            <source src={"data:audio/mp3;base64," + music} type="audio/mpeg" />
                                            <source src={"data:audio/mp3;base64," + music} type="audio/mp3" />
                                            Your browser does not support the audio element.
                                        </audio>
                                    )}
                                    < br />
                                    <button className="btn btn-ligh btn-lg border m-2 btn-sm" variant="outline-primary" onClick={this.eraseMusicHandler}>Erase music</button>
                                </React.Fragment>
                                : null}
                            <input type="file" accept=".mp3, .wav" className="form-control" placeholder="Music" value={this.state.musicPreview} onChange={this.changeMusicHandler} />
                            {this.state.musicError ? (<div className="text-danger">
                                {this.state.musicError}
                            </div>) : null}
                        </div>

                        <div className="form-group">
                            <label for="npcs">NPCs: (.jpg, .jpeg or .png formats)</label>
                            {this.state.npcs[0] !== undefined ?
                                <React.Fragment>
                                    <br />
                                    <label>Actual NPCs:</label>
                                    < br />
                                    {this.state.npcs.map(npc =>
                                        <img src={"data:image/png;base64," + npc} style={{ maxWidth: '200px', maxHeight: '150px' }} />
                                    )}
                                    < br />
                                    <button className="btn btn-ligh btn-lg border m-2 btn-sm" variant="outline-primary" onClick={this.eraseNpcsHandler}>Erase NPCs</button>
                                </React.Fragment>
                                : null}
                            <input type="file" accept=".jpg, .jpeg, .png" className="form-control" placeholder="NPCs" value={this.state.npcPreview} onChange={this.changeNpcsHandler} />
                            {this.state.npcsError ? (<div className="text-danger">
                                {this.state.npcsError}
                            </div>) : null}
                        </div>

                        <div className="form-group">
                            <label for="pcs">PCs: (.pdf format)</label>
                            {this.state.pcs[0] !== undefined ?
                                <React.Fragment>
                                    <br />
                                    <label>Actual PCs:</label>
                                    < br />
                                    {this.state.pcs.map(pc =>
                                        <button className="btn btn-ligh btn-lg border m-2 btn-sm" variant="outline-primary" onClick={(e) => {
                                            e.preventDefault();
                                            window.open("data:application/pdf;base64," + pc);
                                        }}>Character</button>
                                    )}
                                    < br />
                                    <button className="btn btn-ligh btn-lg border m-2 btn-sm" variant="outline-primary" onClick={this.erasePcsHandler}>Erase PCs</button>
                                </React.Fragment>
                                : null}
                            <input type="file" accept=".pdf" className="form-control" placeholder="PCs" value={this.state.pcPreview} onChange={this.changePcsHandler} />
                            {this.state.pcsError ? (<div className="text-danger">
                                {this.state.pcsError}
                            </div>) : null}
                        </div>

                        <div className="form-group">
                            <label for="tokens">Tokens: (.jpg, .jpeg or .png formats)</label>
                            {this.state.tokens[0] !== undefined ?
                                <React.Fragment>
                                    <br />
                                    <label>Actual tokens:</label>
                                    < br />
                                    {this.state.tokens.map(token =>
                                        <img src={"data:image/png;base64," + token} style={{ maxWidth: '200px', maxHeight: '150px' }} />
                                    )}
                                    < br />
                                    <button className="btn btn-ligh btn-lg border m-2 btn-sm" variant="outline-primary" onClick={this.eraseTokensHandler}>Erase tokens</button>
                                </React.Fragment>
                                : null}
                            <input type="file" accept=".jpg, .jpeg, .png" className="form-control" placeholder="Tokens" value={this.state.tokensPreview} onChange={this.changeTokensHandler} />
                            {this.state.tokensError ? (<div className="text-danger">
                                {this.state.tokensError}
                            </div>) : null}
                        </div>

                        <div >
                            <button type="submit" className="btn btn-ligh btn-lg border m-2" variant="outline-primary" onClick={this.updateRedBox}>Update Red Box!</button>
                            {this.state.submitError ? (<div className="text-danger">
                                {this.state.submitError}
                            </div>) : null}
                            <button className="btn btn-ligh btn-lg border m-2 btn-sm" variant="outline-primary" onClick={this.downloadRedBox}>Download!</button>
                            <button className="btn btn-ligh btn-lg border m-2 btn-sm" variant="outline-primary" onClick={this.deleteRedBox}>Delete Red Box</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default RedBoxUpdateComponent;