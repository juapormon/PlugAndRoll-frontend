  
import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { AuthService } from '../../Services/AuthService';
import { ThreadService } from '../../Services/ThreadService';
import { Button } from 'primereact/button';

class ThreadListComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      threads: [],
      rawthreads: [],
      offset: 0,
      perPage: 5,
      pageCount: 0, 
      currentPage: 0,
      threadId:""
    }
    this.handlePageClick = this.handlePageClick.bind(this);
    this.createThread = this.createThread.bind(this);
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
    if(AuthService.isAuthenticated()){
      ThreadService.findByForum(this.props.match.params[0]).then((res) => {
        var slice = res.slice(this.state.offset, this.state.offset + this.state.perPage)
    
      this.setState({
        threads: slice,
        pageCount: Math.ceil(res.length / this.state.perPage),
        rawThreads: res
        });
      })
    }else{
      ThreadService.findByForumNoAuth(this.props.match.params[0]).then((res) => {
        console.log(res)
        var slice = res.slice(this.state.offset, this.state.offset + this.state.perPage)
    
      this.setState({
        threads: slice,
        pageCount: Math.ceil(res.length / this.state.perPage),
        rawThreads: res
        });
      })
    }
  }

  createThread(){
    if(AuthService.isAuthenticated()){
      this.props.history.push("/forums/"+ this.props.match.params[0] + "/createThread")
    }else{
      this.props.history.push("/login")
    }
  }

  render() {

    return (
      <React.Fragment>
      <h2>Threads</h2>
      <button className="button5" onClick={this.createThread}>Create new Thread</button>
      <div className='container' style={{width:"60%", height:"5%"}} >
        {this.state.threads.map(
          thread =>
            <React.Fragment>
              
                <div className="container" style={{ backgroundColor:"#E9967A",border: "3px solid rgb(93, 92, 102)"}} >
                <a href={"/threads/"+thread.id+"/publications"} style={{textDecoration:"none",color:"white"}}>
                  <div className="card-header">
                    <h5 className="card-title" style={{marginLeft:"2rem", marginRight:"5rem"}} >{thread.title}</h5>
                  </div>
                  <div className="card-body row">
                    <div className="col-sm">
                      <p style={{fontSize:"1rem", marginLeft:"2rem", marginRight:"5rem"}}>{thread.rating}</p>
                    </div>
                    <div className="col-sm">
                      <p style={{fontSize:"1rem", marginLeft:"2rem", marginRight:"5rem"}}>{thread.openDate.slice(0,10)}</p>
                    </div>
                  </div>
                  </a>
                </div>
             
            </React.Fragment>
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
      </React.Fragment>
    );
  }
}

export default ThreadListComponent;