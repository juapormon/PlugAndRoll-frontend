  
import React, { Component } from 'react';
import ForumLogo from '../../assets/comment-discussion-512.png';
import {ForumService} from '../../Services/ForumService';
import ReactPaginate from 'react-paginate';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image'
import { AuthService } from '../../Services/AuthService';
import { ThreadService } from '../../Services/ThreadService';

class ThreadListComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      threads: [],
      rawthreads: [],
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
    const data = this.state.rawthreads;

    const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      threads: slice
    })
  }

  componentDidMount() {
      ThreadService.findByForum(this.props.match.params[0]).then((res) => {
        var slice = res.slice(this.state.offset, this.state.offset + this.state.perPage)
    
      this.setState({
        threads: slice,
        pageCount: Math.ceil(res.length / this.state.perPage),
        rawThreads: res
        });
      })
  }

  render() {

    return (
      <div>
        <h2 ></h2>
        {this.state.threads.map(
          thread =>
            <div>
                <div style={{backgroundColor:"#E9967A",border: "3px solid rgb(93, 92, 102)"}} >
                <div className="container">
                <a href={"/publications/"+thread.id} style={{textDecoration:"none",color:"white"}}>
                    <h5 style={{marginLeft:"2rem", marginRight:"5rem"}} >{thread.title}</h5>
                  
                    <p style={{fontSize:"1rem", marginLeft:"2rem", marginRight:"5rem"}}>Thr for: +ç</p>
                  
                  </a>
                </div>
                </div>
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

export default ThreadListComponent;