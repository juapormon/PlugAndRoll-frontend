
import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { AuthService } from '../../Services/AuthService';
import { ThreadService } from '../../Services/ThreadService';
import StarRatings from 'react-star-ratings';
import { ForumService } from '../../Services/ForumService';

class ThreadListComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      threads: [],
      rawthreads: [],
      offset: 0,
      perPage: 15,
      pageCount: 0,
      currentPage: 0,
      threadId: "",
      forumRoles: []
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
    const data = this.state.rawThreads;

    const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      threads: slice
    })
  }

  componentDidMount() {
    ForumService.findById(this.props.match.params[0]).then(res => {
      console.log(res.type);
      this.setState({

        forumRoles: res.type
      })
    })
    if (AuthService.isAuthenticated()) {
      ThreadService.findByForum(this.props.match.params[0]).then((res) => {
        var slice = res.slice(this.state.offset, this.state.offset + this.state.perPage)

        this.setState({
          threads: slice,
          pageCount: Math.ceil(res.length / this.state.perPage),
          rawThreads: res
        });
      })
    } else {
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

  createThread() {
    if (AuthService.isAuthenticated()) {
      this.props.history.push("/forums/" + this.props.match.params[0] + "/createThread")
    } else {
      this.props.history.push("/login")
    }
  }

  goback() {
    this.props.history.push("/forums")
  }

  render() {

    return (
      <React.Fragment>
        <div className="text-center container">
          <br />
          <br />
          <br />
          {console.log(this.state.forumRoles[1])}
          {this.state.forumRoles.includes("DM") & this.state.forumRoles.includes("PLAYER") ?
            <h2>Common forum threads</h2>
            : this.state.forumRoles.includes("DM") & !this.state.forumRoles.includes("PLAYER") ?
              <h2>DMs forum threads</h2>
              : !this.state.forumRoles.includes("DM") & this.state.forumRoles.includes("PLAYER") ?
                <h2>Players forum threads</h2>
                : <h2>Admin forum threads</h2>
          }
          <button className="button5" onClick={this.createThread}>Create new Thread</button>
          <div className='container' style={{ width: "60%", height: "5%" }} >
            {this.state.threads.map(
              thread =>
                <React.Fragment>

                  <div className="container" style={{ backgroundColor: "#E9967A", border: "3px solid rgb(93, 92, 102)" }} >
                    <a href={"/threads/" + thread.id + "/publications"} style={{ textDecoration: "none", color: "white" }}>
                      <div className="card-header">
                        <h5 className="card-title" style={{ overflow: "auto", marginLeft: "1rem", marginRight: "1rem" }} >{thread.title}</h5>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm">
                            <p style={{ fontSize: "1rem", marginLeft: "5%", marginRight: "5%" }}>Creator: {thread.creator.username}</p>
                          </div>
                          <div className="col-sm">
                            <p style={{ fontSize: "1rem", marginLeft: "5%", marginRight: "5%" }}>Opened on: {thread.openDate.slice(0, 10)}</p>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm">
                            <p style={{ fontSize: "1rem", marginLeft: "5%", marginRight: "5%" }}>
                              Rating:  <StarRatings rating={thread.rating} starDimension="20px"
                                starSpacing="1px" starRatedColor="red" numberOfStars={5} name="rating" /> ({thread.rating})
                            </p>
                          </div>
                          <div className="col-sm">
                            {thread.closeDate ?
                              <p style={{ fontSize: "1rem", marginLeft: "5%", marginRight: "5%" }}>Closed on: {thread.closeDate.slice(0, 10)}</p>
                              :
                              null
                            }
                          </div>
                        </div>
                      </div>

                    </a>
                  </div>
                  <br />

                </React.Fragment>
            )
            }
            <div>
            <button className="button5" style={{float:"left"}} onClick={() => this.goback()}>Back</button>
            </div>
            <br />
            <div style={{ justifyContent: "center", display: "flex" }}>
              {this.state.threads[0] !== undefined ?
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
                : null}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ThreadListComponent;