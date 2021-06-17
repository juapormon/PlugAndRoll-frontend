import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { AuthService } from '../../Services/AuthService';
import { RedBoxService } from '../../Services/RedBoxService';

class RedBoxListComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            redBoxes: [],
            offset: 0,
            perPage: 5,
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
                rawGames: data
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

    pagination() {
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
    }

    render() {
        return (
            <div style={{width:"90%"}}>
                {AuthService.isAuthenticated() ?
                <div style={{display: "flex", justifyContent: "center"}}>
                    <button className="button5" onClick={() => this.props.history.push("/createRedBox")}>Create a Red Box!</button>
                </div>
                : null}
                <div className='container' style={{width:"60%", height:"5%"}} >
                    {this.state.redBoxes.map(redBox =>
                        <React.Fragment>
                            <div className="container" style={{ backgroundColor:"#E9967A",border: "3px solid rgb(93, 92, 102)"}} >
                                <a href={"/redboxDetails/" + redBox.id} style={{textDecoration:"none",color:"white"}}>
                                <div className="card-header">
                                    <h5 className="card-title" style={{marginLeft:"1rem", marginRight:"1rem"}}>RedBox title: {redBox.title}</h5>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title" style={{marginLeft:"1rem", marginRight:"1rem"}}>RedBox creator: {redBox.creator.username}</h5>
                                </div>
                                </a>
                            </div>
                        </React.Fragment>
                    )}
                </div>
                {this.pagination}
            </div>
        );
    }
}

export default RedBoxListComponent;