import React, { Component } from 'react';
import {ApplicationService} from '../../Services/ApplicationService';
import ReactPaginate from 'react-paginate';
import { AuthService } from '../../Services/AuthService';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class MyApplicationsComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      applications: [],
      applicationsDM: [],
      rawApplications: [],
      rawApplicationsDM: [],
      offset: 0,
      offsetDM: 0,
      perPage: 5,
      perPageDM: 5,
      pageCount: 0, 
      pageCountDM: 0, 
      currentPage: 0,
      currentPageDM: 0
    }
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handlePageClickDM = this.handlePageClickDM.bind(this);
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
    const data = this.state.rawApplications;

    const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      applications: slice
    })
  }

  handlePageClickDM = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPageDM;
    this.setState({
      currentPageDM: selectedPage,
      offsetDM: offset
    }, () => {
      this.loadMoreDataDM()
    })
  }
  loadMoreDataDM() {
    const data = this.state.rawApplicationsDM;

    const slice = data.slice(this.state.offsetDM, this.state.offsetDM + this.state.perPageDM)
    this.setState({
      pageCountDM: Math.ceil(data.length / this.state.perPageDM),
      applicationsDM: slice
    })
  }

  componentDidMount() {
    if(AuthService.isAuthenticated()){
        ApplicationService.findMyApplicationsByType("PLAYER").then((res) => {
        var slice = res.slice(this.state.offset, this.state.offset + this.state.perPage)
    
      this.setState({
        applications: slice,
        pageCount: Math.ceil(res.length / this.state.perPage),
        rawApplications: res
        });
      })
      ApplicationService.findMyApplicationsByType("DM").then((res) => {
        var slice = res.slice(this.state.offsetDM, this.state.offsetDM + this.state.perPageDM)
    
      this.setState({
        applicationsDM: slice,
        pageCountDM: Math.ceil(res.length / this.state.perPageDM),
        rawApplicationsDM: res
        });
      })
    }
  }

  deleteApplication(applicationId){
    ApplicationService.deleteApplication(applicationId).then(res => {
      alert(res);
      window.location.reload()
    })
  }

  getPLAYERApplications() {
    return (
      this.state.applications.map(
        application =>
            <div style={{ maxWidth: "85%" }}>
              <div id="applicationCard" className="card text-primary" >
                <div className="card-header">
                  <h5 >{application.coachingOffer.title} </h5>
                </div>
                <div className="card-body">
                  <div className="container">
                    <div className="row">
                      <div className="col">
                        <p style={{ fontSize: "1rem"}} >Date: {application.date}</p>
                      </div>
                      <div className="col">
                        <p style={{borderStyle:"ridge", fontSize: "1rem", float: "right" }} >&nbsp; Price: {application.coachingOffer.price}$ &nbsp;</p>
                      </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <p style={{ fontSize: "1rem"}} >Coach: {application.coachingOffer.creator.username}</p>
                        </div>  
                        <div className="col">
                            <p style={{ textDecoration:"underline", fontSize: "1rem",}} >state: {application.accepted?"Accepted":"Pending"}</p>
                        </div>  
                        <div className="col">
                            {application.accepted?
                            null
                            :
                            <button className="button5 btn-block" style={{ padding:"6%", float: "right" }} onClick={() => this.deleteApplication(application.id)}>Delete</button>
                            }
                      </div>  
                    </div>
                  </div>
                </div>
              </div>
              <br />
            </div>
      )
    );
  }

  getDMApplications() {
    return (
      this.state.applicationsDM.map(
        application =>
            <div style={{ minWidth: "85%",maxWidth: "85%" }}>
              <div id="applicationCard" className="card text-primary" >
                <div className="card-header">
                  <h5 >{application.coachingOffer.title} </h5>
                </div>
                <div className="card-body">
                  <div className="container">
                    <div className="row">
                      <div className="col">
                        <p style={{ fontSize: "1rem"}} >Date: {application.date}</p>
                      </div>
                      <div className="col">
                        <p style={{ borderStyle:"ridge", fontSize: "1rem", float: "right" }} >&nbsp; Price: {application.coachingOffer.price}$ &nbsp;</p>
                      </div>
                    </div>
                    <div className="row bg text-primary">
                        <div className="col">
                            <p style={{ fontSize: "1rem",}} >Coach: {application.coachingOffer.creator.username}</p>
                        </div>  
                        <div className="col">
                            <p style={{textDecoration:"underline", fontSize: "1rem",}} >state: {application.accepted?"Accepted":"Pending"}</p>
                        </div>  
                        <div className="col">
                            {application.accepted?
                            null
                            :
                            <button className="button5 btn-block" style={{ padding:"6%", float: "right" }} onClick={() => this.deleteApplication(application.id)}>Delete</button>
                            }
                      </div>  
                    </div>
                  </div>
                </div>
              </div>
              <br />
            </div>
      )
    );
  }

  paginate(){
    return(
    <div style={{float:"left",display:"flex"}}>
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
    )
  }

  paginateDM(){
    return(
    <div style={{float:"left",display:"flex"}}>
    <ReactPaginate previousLabel={"prev"}
      nextLabel={"next"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={this.state.pageCountDM}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={this.handlePageClickDM}
      containerClassName={"pagination"}
      subContainerClassName={"pages pagination"}
      activeClassName={"active"} />
      </div>
    )
  }

  render() {

    return (
      AuthService.isAuthenticated()?
      <div className="container">
      <br/>
      <br/>
      <br/>
      <br/>
      <h2 style={{marginLeft:"30%"}}>COACHING APPLICATIONS</h2>
      <br/>
      <div className="row">
        <div className="col">
        <div className="row">
        <h3>PLAYER APPLICATIONS</h3>
        </div>
        <br/>
        <div className="row">
        {this.getPLAYERApplications()}
        </div>
        {this.paginate()}
        </div>
        <div className="col">
        <h3>DM APPLICATIONS</h3>
        <br/>
        <div className="row">
        {this.getDMApplications()}
        </div>
        <div className="row">
        {this.paginateDM()}
        </div>
        </div>
      </div>
      </div>
      :
      <React.Fragment>
      {this.props.history.push("/login")}
      </React.Fragment>
    ); 
  }
}

export default MyApplicationsComponent;