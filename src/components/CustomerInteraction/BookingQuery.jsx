import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getinteractions } from '../../redux/Slice'
import Layout from '../Layout'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

const BookingQuery = () => {

    const dispatch = useDispatch()
    const [query, setQuery] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();

    const bookingQueries = async () => {
        const response = await dispatch(getinteractions({contact:'booking-contact',currentPage, itemsPerPage}))
        console.log('response', response.payload);
        setQuery(response.payload.bookingQuery)
        setTotalPages(response.payload.totalPages);
    }
    useEffect(() => {
        bookingQueries()
    }, [])

    let itemsPerPage = 15;
    const handlePageChange = ({ selected: pageIndex }) => {
        setCurrentPage(pageIndex + 1);
    };

    useEffect(() => {
        bookingQueries()
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
                                <h3>Booking Queries</h3>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                                    <li className="breadcrumb-item active">Booking Query</li>
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

                                {query && query.map((data, index) => (
                                    <div className="card" key={index}>
                                        <div className="card-body">
                                            <b>Name : </b>{data.name}<br />
                                            <b>Email ID : </b>{data.mail}<br />
                                            <b>Contact Number : </b>{data.phone}<br />
                                            <b>Head Count : </b>{data.person}<br />
                                            <b>Location : </b>{data.location}<br />
                                            <b>Date : </b>{data.date}<br />
                                            <b>Sent On : </b>{data.created_at}<br/>
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

export default BookingQuery
