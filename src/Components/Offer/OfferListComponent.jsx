  
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
        rawOffers: res
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
  
  applyOffer(OfferId){
      this.props.history.push("/forums/"+ this.state.thread.forum.id + "/editThread/"+ this.state.thread.id)
  }

  getPLAYEROffers(){
    return(
    this.state.offers.map(
      offer =>
            <div style={{maxWidth:"80%"}}>
            <div className="card" >
                <div className="card-header">
                <h5 >{offer.title} </h5>
                </div>
                <div className="card-body"> 
                  <div className="container">
                    <div className="row">
                      <div className="col">
                        <p style={{fontSize:"1rem", marginLeft:"2rem", marginRight:"5rem"}} >Rol: {offer.coachingType}</p>
                      </div>
                      <div className="col">
                        <p style={{fontSize:"1rem", marginLeft:"2rem", marginRight:"5rem", float:"right"}} >Price: {offer.price}$</p>
                      </div>
                      <div className="col-1">
                      <button className="button5" style={{float:"right"}} onClick={() => this.applyOffer(offer.id)}>Apply</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <br/>
            </div>
    )
    );
  }

  getDMOffers() {
    return (
      this.state.offersDM.map(
        offer =>
        <div>
        <div style={{maxWidth:"80%"}}>
        <div className="card" >
            <div className="card-header">
            <h5 >{offer.title} </h5>
            </div>
            <div className="card-body"> 
              <div className="container">
                <div className="row">
                  <div className="col">
                    <p style={{fontSize:"1rem", marginLeft:"2rem", marginRight:"5rem"}} >Rol: {offer.coachingType}</p>
                  </div>
                  <div className="col">
                    <p style={{fontSize:"1rem", marginLeft:"2rem", marginRight:"5rem", float:"right"}} >Price: {offer.price}$</p>
                  </div>
                  <div className="col-1">
                  <button className="button5" style={{float:"right"}} onClick={() => this.applyOffer(offer.id)}>Apply</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <br/>
        </div>
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
      <div className="container">
      <br/>
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
    );
  }
}

export default OfferListComponent;