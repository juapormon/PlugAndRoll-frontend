import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { AuthService } from '../../Services/AuthService';
import { PublicationService } from '../../Services/PublicationService';
import { SpamService } from '../../Services/SpamService';
import { ThreadService } from '../../Services/ThreadService';

class PublicationListComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      publications: [],
      rawpublications: [],
      publicationId:"",
      publicationText:"",
      offset: 0,
      perPage: 5,
      pageCount: 0, 
      currentPage: 0,
      textError: "",
      spamError: "",
      thread: {creator:{username:""}},
      createPublicationVisible: false,
    }
    this.handlePageClick = this.handlePageClick.bind(this);
    this.editThread = this.editThread.bind(this);
    this.changeTitleHandler = this.changeTitleHandler.bind(this);
    this.creatingPublication = this.creatingPublication.bind(this);
    this.publicationForm = this.publicationForm.bind(this);
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({
      currentPage: selectedPage,
      offset: offset
    }, () => {
      this.loadMoreData()
    })
  }
  loadMoreData() {
    const data = this.state.rawPublications;

    const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      publications: slice
    })
  }

  componentDidMount() {
    ThreadService.findById(this.props.match.params[0]).then(res => {
      this.setState({
        thread:res
      })})
      
      if(AuthService.isAuthenticated()){
        PublicationService.findByThread(this.props.match.params[0]).then((res) => {
            var slice = res.slice(this.state.offset, this.state.offset + this.state.perPage)
        
        this.setState({
            publications: slice,
            pageCount: Math.ceil(res.length / this.state.perPage),
            rawPublications: res
        });
      })
     }else{
        PublicationService.findByThreadNoAuth(this.props.match.params[0]).then((res) => {
            var slice = res.slice(this.state.offset, this.state.offset + this.state.perPage)
        
        this.setState({
            publications: slice,
            pageCount: Math.ceil(res.length / this.state.perPage),
            rawPublications: res
            });
        })
     }
  }
  
  deleteThread(threadId){
    ThreadService.deletePublicationsByThreadId(threadId).then(()=>{
      ThreadService.deleteThread(threadId).then(res => {
        alert(res);
        this.props.history.push("/forums/" + this.state.thread.forum.id + "/threads")
      })
    })
  }

  closeThread(threadId){
    ThreadService.closeThread(threadId, this.state.thread).then((res)=>{
      alert(res)
      window.location.reload()
    })
  }

  editThread(){
    if(AuthService.isAuthenticated()){
      this.props.history.push("/forums/"+ this.state.thread.forum.id + "/editThread/"+ this.state.thread.id)
    }else{
      this.props.history.push("/login")
    }
  }

  publicationForm(publication) {
    return(
    <React.Fragment>
    
    {publication?
    PublicationService.findById(publication.id).then((res)=>{
      console.log(res)
      this.setState({publicationId:res.id, publicationText:res.text})  
    }
    ):null}
    <form >
      <div className="form-group">
        <label>Title: </label>
        <textarea placeholder="Title" name="title" type="text-box" className="form-control"
          value={this.state.title} onChange={this.changeTitleHandler}></textarea>

        {this.state.textError ? (<div className="ValidatorMessage">{this.state.textError}</div>) : null}

        <button className="button5" style={{margin:"1rem"}} onClick={this.editPublication}>{this.state.publicationId?"Edit publication":"Create Publication"}</button>
        {this.state.spamError ? (<p className="text-danger">{this.state.spamError}</p>) : null}
      </div>
    </form>
    </React.Fragment>
    );
  }

  validate = () => {
    let textError = "";

    if (this.state.publicationText.trim().length === 0) {
      textError = "You must type something to publish!"
    }

    this.setState({ textError });
    if (textError) {
        return false;
    } else {
        return true;
    }

  }

  changeTitleHandler = (event) => {
    this.setState({ publicationText: event.target.value });
  }

  editPublication = (e) => {
    console.log(e)
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      
      let publication = {
          text: this.state.publicationText.trim(), date:null, creator: null, threadId: this.props.match.params[0] 
        } 
      
        let publicationDTO = { text: publication.text }
        console.log(publication.text)
        
        SpamService.checkPublication(publicationDTO).then((data)=>{
            if(data === false){
                // if(this.state.publicationId){
                //     PublicationService.updatePublication(this.state.publicationId, publication).then(() => {
                //       let newPublications = this.state.publications
                //       let objIndex = newPublications.findIndex((obj => obj.id == this.state.publicationId));
                //       this.newPublications[objIndex].text = publication.text
                //       this.setState({publications: newPublications})
                //     })
                // }else{
                  PublicationService.addPublication(publication).then((res) => {
                    alert("Publication Submited!")
                    window.location.reload()
                    })
                // }
            }else{
                this.setState({spamError:"This form contains spam words! 😠"})
            }
        })
    }
  }

  creatingPublication() {
    if(AuthService.isAuthenticated()){
      this.setState({createPublicationVisible:!this.state.createPublicationVisible})
    }else{
      this.props.push("/login")
    }
  }

  render() {

    return (
      <div>
        <h2>{this.state.thread.title}</h2>
        <button className="button5" onClick={this.creatingPublication}>Publicate!</button>
        {AuthService.isAuthenticated() ?
          AuthService.getUserData()["username"] === this.state.thread.creator.username || AuthService.getUserData()["roles"].includes("ADMIN")?
            <React.Fragment>
              <button className="button5" onClick={() => this.editThread(this.props.match.params[0])}>Edit Thread</button>
              <button className="button4" onClick={() => this.deleteThread(this.props.match.params[0])}>Delete Thread</button>
              {this.state.thread.closeDate ?
                <p>🔐🔐🔐🔐🔐</p>
                :
                AuthService.getUserData()["roles"].includes("ADMIN") ?
                  <button className="button3" onClick={() => this.closeThread(this.props.match.params[0])}>Close Thread</button>
                  : null
              }
            </React.Fragment>
            : null
          : null
        }
        <div style={{ backgroundColor: "#FAAE9D" }}>
          {this.state.createPublicationVisible?
          this.publicationForm(null)
          :null
          }
        </div>
        {this.state.publications.map(
          publication =>
          <React.Fragment>
            <div className="container" style={{ backgroundColor: "#E9967A", border: "3px solid rgb(93, 92, 102)" }} >
              <div >
                <h5 className="card-title" style={{ marginLeft: "2rem", marginRight: "5rem" }} >{publication.text}</h5>
              </div>
              <div >
                <div >
                  <p style={{ fontSize: "1rem", marginLeft: "2rem", marginRight: "5rem" }}>{publication.creator.username}</p>
                </div>
                <div >
                  <p style={{ fontSize: "1rem", marginLeft: "2rem", marginRight: "5rem" }}>{publication.date.slice(0, 10)}</p>
                </div>
              </div>
            </div>
          </React.Fragment>
        )
        }
        <br />
        <div style={{ justifyContent: "center", display: "flex" }}>
          <ReactPaginate previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"} />
        </div>
      </div>
    );
  }
}

export default PublicationListComponent;