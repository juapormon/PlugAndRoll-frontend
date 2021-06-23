import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import { RedBoxService } from '../../Services/RedBoxService';

class RedBoxCreateComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            title: "",
            titleError: "",
            story: "",
            storyPreview: "",
            storyError: "",
            maps: [],
            mapsPreview: "",
            mapsError: "",
            music: [],
            musicPreview: "",
            musicError: "",
            npcs: [],
            npcsPreview: "",
            npcsError: "",
            pcs: [],
            pcsPreview: "",
            pcsError: "",
            tokens: [],
            tokensPreview: "",
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
        this.saveRedBox = this.saveRedBox.bind(this);
    }

    componentDidMount() {
        if (!AuthService.isAuthenticated())
            this.props.history.push("/login");
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
    saveRedBox = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            let redBox = {
                title: this.state.title.trim(), story: this.state.story, maps: this.state.maps, music: this.state.music, npcs: this.state.npcs, pcs: this.state.pcs, tokens: this.state.tokens, creator: this.state.creator
            }
            RedBoxService.add(redBox).then(data => {
                if (typeof data == "string")
                    this.props.history.push("/redbox")
                else
                    this.setState({ submitError: "There has been an error, please try again!" })
            })
        }
    }

    render() {
        return (
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
                            <button type="submit" className="btn btn-ligh btn-lg border m-2" variant="outline-primary" onClick={this.saveRedBox}>Add Red Box!</button>
                            {this.state.submitError ? (<div className="text-danger">
                                {this.state.submitError}
                            </div>) : null}
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default RedBoxCreateComponent;