import React, { Component } from 'react';
import { ApplicationService } from '../../Services/ApplicationService';
import { AuthService } from '../../Services/AuthService';
import { OfferService } from '../../Services/OfferService';
import StarRatings from 'react-star-ratings';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class OfferComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      offerId: this.props.match.params[0],
      offer: {
        title: null,
        coachingType: null,
        price: null,
        creator: {
          username: null,
          email: null,
          coachedGames: null,
          rating: 0
        }
      },
      applications: [],
      aplicationsState: ""
    }

  }

  componentDidMount() {
    OfferService.findById(this.state.offerId).then(res => {
      console.log(res)
      this.setState({ offer: res })
      console.log(AuthService.getUserData())
      console.log(res.creator.username)
      if (AuthService.getUserData().sub === res.creator.username) {
        ApplicationService.findApplicationsAcceptedByOfferId(this.state.offerId).then(res => {
          this.setState({ applications: res })
        })
      }
    }
    )
  }

  getDetails() {

    return (
      <div>
      <div className="card">
        <div className="card-header">
          <h3>Title: {this.state.offer.title}</h3>
        </div>
        <div className="card-body">
          <p style={{ fontSize: "70%" }}>Description: </p>
          <p style={{ fontSize: "70%" }}>{this.state.offer.description}</p>
        </div>
        <div className="card-footer">
          <div className="container">
            <div className="row">
              <div className="col">
                <p style={{ fontSize: "70%" }}>Coach: {this.state.offer.creator.username}</p>
              </div>
              <div className="col">
                <p style={{ fontSize: "70%" }}>Coached games: {this.state.offer.creator.coachedGames}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p style={{ fontSize: "70%" }}>Email: {this.state.offer.creator.email}</p>
              </div>
              <div className="col">
                <StarRatings rating={this.state.offer.creator.rating} starDimension="20px"
                        starSpacing="1px" starRatedColor="red" numberOfStars={5} name="rating" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <div>
      <button className="button5 btn-lg" onClick={() => this.goback()}>Back</button>
      </div>
      <br/>
      <br/>
      </div>
    );
  }

  acceptApplication(applicationId) {
    ApplicationService.acceptApplication(this.state.offerId, applicationId).then(res => {
      alert(res)
      window.location.reload()
    })
  }

  rejectApplication(applicationId) {
    ApplicationService.rejectApplication(this.state.offerId, applicationId).then(res => {
      alert(res)
      window.location.reload()
    })
  }

  goback(){
    this.props.history.push("/coaching")
  }

  getApplications() {
    return (
      this.state.applications.length === 0 ?
        <p className="text-dark">{this.state.applicationsState}</p>
        :
        this.state.applications.map(
          application =>
            <div className="container">
              <div className="col">
                <div style={{ maxWidth: "85%" }}>
                  <div id="applicationCard" className="card text-primary" >
                    <div className="card-header">
                      <h5 >{application.coachingOffer.title} </h5>
                    </div>
                    <div className="card-body">
                      <div className="container">
                        <div className="row">
                          <div className="col">
                            <p style={{ fontSize: "1rem" }} >Date: {application.date}</p>
                          </div>
                          <div className="col">
                            <p style={{ borderStyle: "ridge", fontSize: "1rem", float: "right" }} >&nbsp; Price: {application.coachingOffer.price}$ &nbsp;</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <p style={{ fontSize: "1rem" }} >Coach: {application.coachingOffer.creator.username}</p>
                          </div>
                          <div className="col">
                            <p style={{ textDecoration: "underline", fontSize: "1rem", }} >state: {application.accepted ? "Accepted" : "Pending"}</p>
                          </div>
                          <div className="col-md-auto">
                            {application.accepted ?
                              null
                              :
                              <React.Fragment>
                                <button className="button6 btn-block" style={{ padding: "6%", float: "right" }} onClick={() => this.acceptApplication(application.id)}>Accept</button>
                                <button className="button5 btn-block" style={{ padding: "6%", float: "right" }} onClick={() => this.rejectApplication(application.id)}>Reject</button>
                              </React.Fragment>
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
  acceptedApplications() {
    if (AuthService.getUserData().sub === this.state.offer.creator.username) {
      ApplicationService.findApplicationsAcceptedByOfferId(this.state.offerId).then(res => {
        this.setState({
          applications: res,
          applicationsState: "There is not any application on ACCEPTED state!"
        })
      })
    }
  }

  pendingApplications() {
    if (AuthService.getUserData().sub === this.state.offer.creator.username) {
      ApplicationService.findApplicationsPendingByOfferId(this.state.offerId).then(res => {
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
        {AuthService.isAuthenticated ?
          <React.Fragment>
            <div className="container">
              <br />
              <br />
              <br />
              <h2>OFFER DETAILS:</h2>
              <br />

              {this.getDetails()}
              <br />
            </div>
            {AuthService.getUserData().sub === this.state.offer.creator.username ?
              <div className="text-center ">
                <h2>Applications:</h2>
                <button className="button5" onClick={() => this.acceptedApplications()}>Accepted</button>
                <button className="button5" onClick={() => this.pendingApplications()}>Pending</button>
                {this.getApplications()}
                
              </div>
              : null}
              
          </React.Fragment>
          :
          this.props.history.push("/login")
        }
      </div>
    );
  }
}

export default OfferComponent;