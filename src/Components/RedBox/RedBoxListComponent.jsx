import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { AuthService } from '../../Services/AuthService';
import { RedBoxService } from '../../Services/RedBoxService';

class RedBoxListComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            redBoxes: [],
            rawRedBoxes: [],
            offset: 0,
            perPage: 2,
            pageCount: 0,
            currentPage: 0
        }
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        RedBoxService.findAll().then(data => {
            var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                redBoxes: slice,
                pageCount: Math.ceil(data.length / this.state.perPage),
                rawRedBoxes: data
            })
        })
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
      const data = this.state.rawRedBoxes;
      const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        redBoxes: slice
      })
    }

    render() {
        return (
            <div className="text-center container">
                <div className="justify-content-center align-items-center minh-80">
                    {AuthService.isAuthenticated() ?
                        <div className="row justify-content-center align-items-center shadow-lg p-5 mb-4 bg-secondary">
                            <button className="btn btn-ligh btn-lg border m-2" onClick={() => this.props.history.push("/createRedBox")}>Create a Red Box!</button>
                        </div> : null}
                    {this.state.redBoxes.map(redBox =>
                        <div className="row card shadow-lg p-5 mb-1 bg-secondary">
                            <a href={"/redboxDetails/" + redBox.id} style={{ textDecoration: "none", color: "white" }}>
                                <div className="card-header">
                                    <h5 className="card-title" style={{ marginLeft: "1rem", marginRight: "1rem" }}>RedBox title: {redBox.title}</h5>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title" style={{ marginLeft: "1rem", marginRight: "1rem" }}>RedBox creator: {redBox.creator.username}</h5>
                                </div>
                            </a>
                        </div>
                    )}
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

export default RedBoxListComponent;