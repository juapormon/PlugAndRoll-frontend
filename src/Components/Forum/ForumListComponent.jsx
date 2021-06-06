  
import React, { Component } from 'react';
import {ForumService} from '../../Services/ForumService';
import ReactPaginate from 'react-paginate';
import Card from 'react-bootstrap/Card';
import { AuthService } from '../../Services/AuthService';

class ForumListComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      forums: [],
      rawForums: [],
      offset: 0,
      perPage: 5,
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
    const data = this.state.rawForums;

    const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      forums: slice
    })
  }

  componentDidMount() {
    if(AuthService.isAuthenticated()){
      ForumService.getForumsAuth().then((res) => {
        var slice = res.slice(this.state.offset, this.state.offset + this.state.perPage)
    
      this.setState({
        forums: slice,
        pageCount: Math.ceil(res.length / this.state.perPage),
        rawForums: res
        });
      })
    }else{
      ForumService.getForumsNoAuth().then((res) => {
        var slice = res.slice(this.state.offset, this.state.offset + this.state.perPage)
    
      this.setState({
        forums: slice,
        pageCount: Math.ceil(res.length / this.state.perPage),
        rawForums: res
        });
      })
    }
  }

  render() {

    return (
      <div>
        <br/>
        <br/>
        <h2 className="text-center" >Forums</h2>
        {this.state.forums.map(
          forum =>
          <div>
                <div className="card" style={{backgroundColor:"#E9967A",border: "3px solid rgb(93, 92, 102)"}} >
                <div className="container">
                  <a href={"/forums/" + forum.id + "/threads"} style={{textDecoration:"none",color:"white"}}>
                    <div className="card-header">
                      <h5 style={{marginLeft:"2rem", marginRight:"5rem"}} >{forum.title}</h5>
                    </div>
                    <div className="card-body">
                      <p style={{fontSize:"1rem", marginLeft:"2rem", marginRight:"5rem"}}>Forum for: {forum.type.join(', ')}</p>
                    </div>
                  </a>
                </div>
                </div>
                <br/>
          </div>
        )
        }
        <br />
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
      </div>
    );
  }
}

export default ForumListComponent;