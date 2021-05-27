  
import React, { Component } from 'react';
import {OfferService} from '../../Services/OfferService';
import ReactPaginate from 'react-paginate';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image'
import { AuthService } from '../../Services/AuthService';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class OfferListComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      offers: [],
      rawOffers: [],
      offset: 0,
      perPage: 1,
      pageCount: 0, 
      currentPage: 0
    }
    this.handlePageClick = this.handlePageClick.bind(this);
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

  componentDidMount() {
    if(AuthService.isAuthenticated()){
      OfferService.findByType("DM").then((res) => {
        var slice = res.slice(this.state.offset, this.state.offset + this.state.perPage)
    
      this.setState({
        offers: slice,
        pageCount: Math.ceil(res.length / this.state.perPage),
        rawOffers: res
        });
      })
    }
  }

  getDMOffers(){
    return(
    this.state.offers.map(
      offer =>
        <div className="container">
            <div className="column">
                <h5 style={{marginLeft:"2rem", marginRight:"5rem"}} >{offer.title}</h5>
                <h5 style={{marginLeft:"2rem", marginRight:"5rem"}} >{offer.price}</h5>
                <h5 style={{marginLeft:"2rem", marginRight:"5rem"}} >{offer.coachingType}</h5>
              
            </div>
            <br/>
        </div>
    )
    );
  }

  paginate(){
    return(
    <div style={{justifyContent:"center",display:"flex"}}>
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

  render() {

    return (
      <div>
        <br/>
        <br/>
        {this.getDMOffers()}
        <br />
        {this.paginate()}
      </div>
    );
  }
}

export default OfferListComponent;