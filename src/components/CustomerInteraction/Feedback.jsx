import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getinteractions } from '../../redux/Slice'
import Layout from '../Layout'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

const Feedback = () => {

    const dispatch = useDispatch()
    const [feedback, setFeedback] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();

    const Feedbacks = async () => {
        const response = await dispatch(
            getinteractions({contact:'contact',currentPage, itemsPerPage}))
        console.log('response', response.payload.feedback);
        setFeedback(response.payload.feedback)
        setTotalPages(response.payload.totalPages);
    }
    useEffect(() => {
        Feedbacks()
    }, [])

    let itemsPerPage = 15;
    const handlePageChange = ({ selected: pageIndex }) => {
        setCurrentPage(pageIndex + 1);
    };

    useEffect(() => {
        Feedbacks()
    }, [currentPage])

    return (
        <div>
            <Layout />
            {/* <!-- Content Wrapper. Contains page content --> */}
            <div className="content-wrapper">
                {/* <!-- Content Header (Page header) --> */}
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h3>Customer Feedbacks</h3>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                                    <li className="breadcrumb-item active">Customer Feedbacks</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    {/* <!-- /.container-fluid --> */}
                </section>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">

                                {feedback && feedback.map((data, index) => (
                                    <div className="card" key={index}>
                                        <div className="card-body">
                                            <b>Name : </b>{data.name}<br />
                                            <b>Email ID : </b>{data.mail}<br />
                                            <b>Contact Number : </b>{data.phone}<br />
                                            <b>Booking ID : </b>{data.bookingId}<br />
                                            <b>Message : </b>{data.message}<br />
                                            <b>Smiley : </b>
                                            <span style={{ fontSize: '1.5em' }}>
                                                {data.smiley == '1' ? '😀'
                                                    : data.smiley == '2' ? '😊' :
                                                        data.smiley == '3' ? '😑' :
                                                            data.smiley == '4' ? '😣' :
                                                                null}<br />
                                            </span>
                                            <b>Sent On : </b>{data.created_at}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                <div className="float-right">
                    <ReactPaginate
                        breakLabel="..."
                        onPageChange={handlePageChange}
                        // initialPage={0}
                        //forcePage ={currentPage}
                        pageRangeDisplayed={5}
                        pageCount={totalPages && totalPages}
                        previousLabel="<<Previous"
                        nextLabel="Next>>"
                        renderOnZeroPageCount={null}
                        activeClassName={"active"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        containerClassName={"pagination"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                    />
                </div>
            </div>
        </div>
    )
}

export default Feedback
