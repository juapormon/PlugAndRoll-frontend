  
import React, { Component } from 'react';
import {OfferService} from '../../Services/OfferService';
import ReactPaginate from 'react-paginate';
import { AuthService } from '../../Services/AuthService';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


class OfferListComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      offers: [],
      offersDM: [],
      rawOffers: [],
      rawOffersDM: [],
      offset: 0,
      offsetDM: 0,
      perPage: 5,
      perPageDM: 5,
      pageCount: 0, 
      pageCountDM: 0, 
      currentPage: 0,
      currentPageDM: 0,
      seeingMyOffers: null
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
    const data = this.state.rawOffers;

    const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      offers: slice
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
    const data = this.state.rawOffersDM;

    const slice = data.slice(this.state.offsetDM, this.state.offsetDM + this.state.perPageDM)
    this.setState({
      pageCountDM: Math.ceil(data.length / this.state.perPageDM),
      offersDM: slice
    })
  }

  componentDidMount() {
    if(AuthService.isAuthenticated()){
      OfferService.findByType("PLAYER").then((res) => {
        var slice = res.slice(this.state.offset, this.state.offset + this.state.perPage)
    
      this.setState({
        offers: slice,
        pageCount: Math.ceil(res.length / this.state.perPage),
        rawOffers: res,
        seeingMyOffers:false
        });
      })
      OfferService.findByType("DM").then((res) => {
        var slice = res.slice(this.state.offsetDM, this.state.offsetDM + this.state.perPageDM)
    
      this.setState({
        offersDM: slice,
        pageCountDM: Math.ceil(res.length / this.state.perPageDM),
        rawOffersDM: res
        });
      })
    }
  }

  applyOffer(offerId){
    this.props.history.push("/offers/" + offerId + "/apply")
  }
  deleteOffer(offerId){
    OfferService.deleteOffer(offerId).then(res => {
      alert(res);
      window.location.reload()
    })
  }
  offerDetails(offerId){
    this.props.history.push("/offers/" + offerId + "/Offerdetails")
  }

  getPLAYEROffers() {
    return (
      this.state.offers.map(
        offer =>
        AuthService.getUserData().sub === offer.creator.username ?
            <div style={{ minWidth: "85%", maxWidth: "85%" }}>
              <div id="offerCard" className="card bg-warning" >
                <div className="card-header">
                  <h5 style={{textoOverflow: "ellipsis"}} >{offer.title} </h5>
                </div>
                <div className="card-body">
                  <div className="container">
                    <div className="row">
                      <div className="col">
                        <p style={{ fontSize: "1rem",}} >Rol: {offer.coachingType}</p>
                      </div>
                      <div className="col">
                        <p style={{ fontSize: "1rem", float: "right" }} >Price: {offer.price}$</p>
                      </div>
                      <div className="col">
                        <button className="button5 btn-block" style={{ padding:"6%", float: "right" }} onClick={() => this.deleteOffer(offer.id)}>Delete</button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <p style={{ fontSize: "1rem",}} >Creator: {offer.creator.username}</p>
                      </div>
                      <div className="col">
                        <button className="button4 btn-block" style={{ padding:"3%", float: "right" }} onClick={() => this.offerDetails(offer.id)}>Details</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
            </div>
            :
            <div style={{ minWidth: "85%", maxWidth: "85%" }}>
              <div id="offerCard" className="card" >
                <div className="card-header">
                  <h5 >{offer.title} </h5>
                </div>
                <div className="card-body">
                  <div className="container">
                    <div className="row">
                      <div className="col">
                        <p style={{ fontSize: "1rem"}} >Rol: {offer.coachingType}</p>
                      </div>
                      <div className="col">
                        <p style={{ fontSize: "1rem"}} >Price: {offer.price}$</p>
                      </div>
                      <div className="col">
                      {AuthService.getUserData().auth.some(e => e.authority == 'ROLE_ADMIN') ?
                        <button className="button5 btn-block" style={{ padding:"6%", float: "right" }} onClick={() => this.deleteOffer(offer.id)}>Delete</button>
                        :
                        null                      
                      }
                        <button className="button6 btn-block" style={{ padding:"6%", float: "right" }} onClick={() => this.applyOffer(offer.id)}>Apply</button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <p style={{ fontSize: "1rem",}} >Creator: {offer.creator.username}</p>
                      </div>
                      <div className="col">
                        <button className="button4 btn-block" style={{padding:"3%", float: "right" }} onClick={() => this.offerDetails(offer.id)}>Details</button>
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

  getDMOffers() {
    return (
      this.state.offersDM.map(
        offer =>
        AuthService.getUserData().sub === offer.creator.username ?
            <div style={{ minWidth: "85%", maxWidth: "85%" }}>
              <div id="offerCard" className="card bg-warning" >
                <div className="card-header">
                  <h5 >{offer.title} </h5>
                </div>
                <div className="card-body">
                  <div className="container">
                    <div className="row">
                      <div className="col">
                        <p style={{ fontSize: "1rem",}} >Rol: {offer.coachingType}</p>
                      </div>
                      <div className="col">
                        <p style={{ fontSize: "1rem", float: "right" }} >Price: {offer.price}$</p>
                      </div>
                      <div className="col">
                        <button className="button5 btn-block" style={{ padding:"6%", float: "right" }} onClick={() => this.deleteOffer(offer.id)}>Delete</button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <p style={{ fontSize: "1rem",}} >Creator: {offer.creator.username}</p>
                      </div>
                      <div className="col">
                        <button className="button4 btn-block" style={{padding:"3%", float: "right" }} onClick={() => this.offerDetails(offer.id)}>Details</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
            </div>
            :
            <div style={{ minWidth: "85%", maxWidth: "85%" }}>
              <div id="offerCard" className="card" >
                <div className="card-header">
                  <h5 >{offer.title} </h5>
                </div>
                <div className="card-body">
                  <div className="container">
                    <div className="row">
                      <div className="col">
                        <p style={{ fontSize: "1rem"}} >Rol: {offer.coachingType}</p>
                      </div>
                      <div className="col">
                        <p style={{ fontSize: "1rem"}} >Price: {offer.price}$</p>
                      </div>

                      <div className="col">
                      {AuthService.getUserData().auth.some(e => e.authority == 'ROLE_ADMIN') ?
                        <button className="button5 btn-block" style={{ padding:"6%", float: "right" }} onClick={() => this.deleteOffer(offer.id)}>Delete</button>
                        :
                        null                      
                      }
                        <button className="button6 btn-block" style={{ padding:"6%", float: "right" }} onClick={() => this.applyOffer(offer.id)}>Apply</button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <p style={{ fontSize: "1rem",}} >Creator: {offer.creator.username}</p>
                      </div>
                      <div className="col">
                        <button className="button4 btn-block" style={{padding:"3%", float: "right" }} onClick={() => this.offerDetails(offer.id)}>Details</button>
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

  createOffer(){
    this.props.history.push("/offers/create")
  }

  myOffers(){
    OfferService.findMyOffers().then(res => {
      var resDM = res.filter(function(event){
        return event.coachingType == 'DM';
      });
      var resPLAYER = res.filter(function(event){
        return event.coachingType == 'PLAYER';
      });
      var slicePLAYER = resPLAYER.slice(this.state.offset, this.state.offset + this.state.perPage)
      var sliceDM = resDM.slice(this.state.offsetDM, this.state.offsetDM + this.state.perPageDM)
      this.setState({
        pageCount: Math.ceil(resPLAYER.length / this.state.perPage),
        pageCountDM: Math.ceil(resDM.length / this.state.perPageDM),
        offers: slicePLAYER,
        offersDM: sliceDM,
        rawOffers: resPLAYER,
        rawOffersDM: resDM,
        seeingMyOffers: true
      })
    })
  }

  myApplications(){
    this.props.history.push("/myApplications")
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
      <h2 style={{marginLeft:"30%"}}>COACHING OFFERS</h2>
      <button  className="button5" style={{marginRight:"1%"}} onClick={() => this.createOffer()}>Create Offer</button>
      {this.state.seeingMyOffers?
      <button  className="button5" style={{marginRight:"1%"}} onClick={() => this.componentDidMount()}>All Offers</button>
      :
      <button  className="button5" style={{marginRight:"1%"}} onClick={() => this.myOffers()}>My Offers</button>
      }
      <button  className="button5" style={{marginRight:"1%"}} onClick={() => this.myApplications()}>My Applications</button>
      <br/>
      <div className="row">
        <div className="col">
        <div className="row">
        <h3>PLAYER OFFERS</h3>
        </div>
        <br/>
        <div className="row">
        {this.getPLAYEROffers()}
        </div>
        {this.paginate()}
        </div>
        <div className="col">
        <h3>DM OFFERS</h3>
        <br/>
        <div className="row">
        {this.getDMOffers()}
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

export default OfferListComponent;