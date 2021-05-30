import React, { Component } from 'react';
import { ApplicationService } from '../../Services/ApplicationService';
import { AuthService } from '../../Services/AuthService';
import { OfferService } from '../../Services/OfferService';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class OfferComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
        offerId: this.props.match.params[0],
        offer: {title:null, coachingType:null, price:null, creator:{username:null, email:null, coachedGames:null, rating:null}},
        applications: [],
        aplicationsState: ""
    }

}

  componentDidMount() {
      OfferService.findById(this.state.offerId).then(res =>{
          this.setState({offer: res})
      }
    )
  }

  getDetails(){
      return(
      <div className="card">
          <div className="card-header">
            <h3>Title: {this.state.offer.title}</h3>
          </div>
          <div className="card-body">
            <p style={{fontSize:"70%"}}>Description: </p>
            <p style={{fontSize:"70%"}}>{this.state.offer.description}</p>
          </div>
          <div className="card-footer">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <p style={{fontSize:"70%"}}>Username: {this.state.offer.creator.username}</p>
                    </div>
                    <div className="col">
                        <p style={{fontSize:"70%"}}>Coached games: {this.state.offer.creator.coachedGames}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <p style={{fontSize:"70%"}}>Email: {this.state.offer.creator.email}</p>
                    </div>
                </div>
            </div>
          </div>
      </div>
      );
  }

  rejectApplication(applicationId){
      ApplicationService.rejectApplication(this.state.offerId, applicationId).then(res =>{
          alert(res)
          window.location.reload()
      })
  }

  getApplications(){
    return(
      this.state.applications.length===0?
      <p className="text-dark">{this.state.applicationsState}</p>
      :
      this.state.applications.map(
            application =>
            <div className="container">
              <div className= "col">
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
                                <button className="button4" style={{ padding:"6%", float: "right" }} onClick={() => this.rejectApplication(application.id)}>Reject</button>
                                }
                          </div>  
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                </div>
                </div>
            </div>
          )
    );
  }
  acceptedApplications(){
    if(AuthService.getUserData()["username"]===this.state.offer.creator.username){
      ApplicationService.findApplicationsAcceptedByOfferId(this.state.offerId).then(res =>{
        this.setState({
          applications: res,
          applicationsState: "There is not any application on ACCEPTED state!"
        })
      })
    }
  }

  pendingApplications(){
    if(AuthService.getUserData()["username"]===this.state.offer.creator.username){
      ApplicationService.findApplicationsPendingByOfferId(this.state.offerId).then(res =>{
        this.setState({
          applications: res,
          applicationsState: "There is not any application on PENDING state!"
        })
      })
    }
  }
  

  render() {

    return (
        <div>
            {AuthService.isAuthenticated?
            <React.Fragment>
            <div className="container">
              <br/>
              <br/>
                <h2>OFFER DETAILS:</h2>
                <br/>

                {this.getDetails()}
                <br/>
            </div>
            {AuthService.getUserData()["username"]===this.state.offer.creator.username?
            <div>
                <h2>Applications:</h2>
                <button className="button5" onClick={() => this.acceptedApplications()}>Accepted</button>
                <button className="button5" onClick={() => this.pendingApplications()}>Pending</button>
                {this.getApplications()}
            </div>
            :null}
            </React.Fragment>
            :
            this.props.history.push("/login")
            }
        </div>
    );
  }
}

export default OfferComponent;