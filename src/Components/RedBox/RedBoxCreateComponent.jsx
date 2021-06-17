import React, { Component } from 'react';
import { AuthService } from '../../Services/AuthService';
import { RedBoxService } from '../../Services/RedBoxService';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

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
            <form style={{width:"80%", padding:"5%"}}>
                <br/>
                <br/>
                <form className="FormStyle">
                    <h2 style={{ textAlign: "center" }}>Create a Red Box!</h2>
                    <h5 style={{ textAlign: "center" }}>Maximum size of the Red Box 16 MB. Larger files WIP.</h5>
                    <br />

                    <div className="form-group row">
                        <label className="col-2">Title:</label>
                            <input type="text" className="col-8" placeholder="Title" value={this.state.title} onChange={this.changeTitleHandler} />
                            {this.state.titleError ? (<div className="ValidatorMessage">
                                {this.state.titleError}
                            </div>) : null}
                    </div>
                    <div className="form-group">
                        <label className="row">Story: (.txt format)</label>
                        <div className="row">
                            {this.state.story !== "" ?
                                <React.Fragment>
                                    <label>Actual story: &nbsp;</label>
                                    < br />
                                    <p>{atob(this.state.story.slice(0,20))}...</p>
                                </React.Fragment>
                            : null}
                            <Form.Control type="file" accept=".txt" className="FormInput" placeholder="Story" value={this.state.storyPreview} onChange={this.changeStoryHandler} />
                            {this.state.storyError ? (<div className="ValidatorMessage">
                                {this.state.storyError}
                            </div>) : null}
                        </div>
                        <Button onClick={this.eraseStoryHandler}>Erase story</Button>
                    </div>

                    <div className="form-group">
                        <label className="row">Maps: (.jpg, .jpeg or .png formats)</label>
                        <div className="row">
                            {this.state.maps[0] !== undefined ?
                                <React.Fragment>
                                    <label>Actual maps:&nbsp;</label>
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
                        </div>
                        <Button onClick={this.eraseMapsHandler}>Erase maps</Button>
                    </div>

                    <div className="form-group">
                        <label className="row">Music: (.mp3 or .wav formats)</label>
                        <div className="row">
                            {this.state.music[0] !== undefined ?
                                <React.Fragment>
                                    <label>Actual music: &nbsp;</label>
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
                        </div>
                        <Button onClick={this.eraseMusicHandler}>Erase music</Button>
                    </div>

                    <div className="form-group">
                        <label className="row">NPCs: (.jpg, .jpeg or .png formats)</label>
                        <div className="row">
                            {this.state.npcs[0] !== undefined ?
                                <React.Fragment>
                                    <label>Actual NPCs:&nbsp;</label>
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
                        </div>
                        <Button onClick={this.eraseNpcsHandler}>Erase NPCs</Button>
                    </div>

                    <div className="form-group">
                        <label className="row">PCs: (.pdf format)</label>
                        <div className="row">
                            {this.state.pcs[0] !== undefined ?
                                <React.Fragment>
                                    <label>Actual PCs:&nbsp;</label>
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
                            </div>
                        <Button onClick={this.erasePcsHandler}>Erase PCs</Button>
                    </div>

                    <div className="form-group">
                        <label className="row">Tokens: (.jpg, .jpeg or .png formats)</label>
                        <div className="row">
                            {this.state.tokens[0] !== undefined ?
                                <React.Fragment>
                                    <label>Actual tokens:&nbsp;</label>
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
                        </div>
                        <Button onClick={this.eraseTokensHandler}>Erase tokens</Button>
                    </div>

                    <Button variant="outline-success" onClick={this.saveRedBox}>Add Red Box</Button>
                    {this.state.submitError ? (<div className="ValidatorMessage">
                        {this.state.submitError}
                    </div>) : null}
                </form>
            </form>
        );
    }
}

export default RedBoxCreateComponent;