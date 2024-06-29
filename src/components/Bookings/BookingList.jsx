import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout";
import { useDispatch } from "react-redux";
// import { Button, Modal } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
  cancelbooking,
  getallbookings,
  searchbookings,
} from "../../redux/Slice";
import ReactPaginate from "react-paginate";
import { useRef } from "react";

const BookingList = () => {
  const [booking, setBooking] = useState([]);
  const [modalData, setModalData] = useState();
  const [yearMonth, setYearMonth] = useState({
    bookingyear: "",
    bookingmonth: "",
  });
  const [search, setSearch] = useState({ bookingId: "", bookingDate: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [showModal, setShowModal] = useState(false);
  let user_type = localStorage.getItem("User Type");

  const refBookingDate = useRef();
  const refBookingId = useRef();
  const refYear = useRef("");
  const refMonth = useRef("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let itemsPerPage = 15;
  let yearArr = [2023];
  let monthArr = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  for (let i = 0; i < 25; i++) {
    yearArr[i + 1] = yearArr[i] + 1;
  }

  const bookings = async () => {
    const response = await dispatch(
      getallbookings({ currentPage, itemsPerPage })
    );
    console.log("res", response);
    setBooking(response.payload.BookingData);
    {
      booking && console.log("booking", booking);
    }
    setTotalPages(response.payload.totalPages);
    return;
  };

  useEffect(() => {
    if (
      search.bookingId ||
      search.bookingDate ||
      yearMonth.bookingyear ||
      yearMonth.bookingmonth
    ) {
      handleClick();
    } else {
      bookings();
    }
  }, [currentPage]);

  const handlePageChange = ({ selected: pageIndex }) => {
    setCurrentPage(pageIndex + 1);
  };

  const handleClick = async (req, res) => {
    let bookingId = search.bookingId;
    let bookingDate = search.bookingDate;
    let bookingyear = yearMonth && yearMonth.bookingyear;
    let bookingmonth = yearMonth && yearMonth.bookingmonth;
    console.log("bookingId", bookingId);
    const response = await dispatch(
      searchbookings({
        bookingId,
        bookingDate,
        bookingyear,
        bookingmonth,
        currentPage,
        itemsPerPage,
      })
    );
    setBooking(response.payload.searchResult);
    setTotalPages(response.payload.totalPages);
    console.log("booking data", booking);
  };

  useEffect(() => {
    bookings();
  }, [search.bookingId == "" || search.bookingDate == ""]);

  const handleReset = async (e) => {
    bookings();
    setSearch({});
    setYearMonth({});
    refBookingDate.current.value = "";
    refBookingId.current.value = "";
    refYear.current.value = "";
    refMonth.current.value = "";
  };

  const handleCancel = async (id) => {
    let ans = window.confirm("Do You Want To Cancel This Booking ?");
    console.log("ans", ans);
    if (ans) {
      const response = await dispatch(
        cancelbooking({ id, currentPage, itemsPerPage })
      );
      if (response.payload.status == 1) {
        bookings();
      }
    }
  };

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
                <h1>Booking List</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    {/* {user_type === "admin" ? ( */}
                    <Link to="/home">Home</Link>
                    {/* // ) : ( */}
                    {/* //   <Link to="/subadminhome">Home</Link> */}
                    {/* // )} */}
                  </li>
                  <li className="breadcrumb-item active">Booking List</li>
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
                <div className="card">
                  {/* <div className="card-header"> */}
                  {/* <Button className='btn bg-gradient-primary' onClick={handleClick}>ADD PACKAGE</Button> */}
                  {/* <h3 className="card-title"></h3> */}
                  {/* </div> */}
                  {/* <!-- /.card-header --> */}

                  <div className="card-body">
                    <div className="row">
                      <div className="input-group col-md-4">
                        {/* <!-- Date --> */}
                        <div className="form-group">
                          <label>Booking Date</label>
                          {/* <input type="date" /> */}
                          <div
                            className="input-group date"
                            id="reservationdate"
                            data-target-input="nearest"
                          >
                            <input
                              type="date"
                              name="bookingDate"
                              className="form-control datetimepicker-input"
                              data-target="#reservationdate"
                              onChange={async (e) => {
                                await setSearch({
                                  [e.target.name]: e.target.value,
                                });
                                console.log("search", search);
                                refBookingDate.current = e.target;
                              }}
                            />
                            <div
                              className="input-group-append"
                              data-target="#reservationdate"
                              data-toggle="datetimepicker"
                            >
                              <div className="input-group-text">
                                <i
                                  className="fa fa-search"
                                  onClick={handleClick}
                                ></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="input-group col-md-4">
                        <div className="form-group">
                          <label>Search By Booking ID</label>
                          <div className="input-group">
                            <input
                              type="search"
                              name="bookingId"
                              className="form-control form-control-md"
                              placeholder="Enter Booking ID"
                              onChange={async (e) => {
                                await setSearch({
                                  [e.target.name]: e.target.value,
                                });
                                console.log('e.target',e.target);
                                console.log("search", search);
                                refBookingId.current = e.target;
                              }}
                            />
                            <div className="input-group-append">
                              <button
                                type="submit"
                                className="btn btn-md btn-default"
                                onClick={handleClick}
                              >
                                <i className="fa fa-search"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-md-4">
                        <div className="form-group">
                          <label></label>
                          <div>
                            <Link to="/bookingform">
                              <button
                                className="btn btn-primary addition"
                                style={{ marginLeft: "110px" }}
                              >
                                New Booking
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-2">
                        {/* <!-- Date --> */}
                        <div className="form-group">
                          <label>Year</label>
                          {/* <input type="date" /> */}
                          <div
                            className=""
                            id="reservationdate"
                            data-target-input="nearest"
                          >
                            <select
                              name="bookingyear"
                              className="form-control"
                              onChange={async (e) => {
                                setYearMonth({
                                  ...yearMonth,
                                  [e.target.name]: e.target.value,
                                });
                                console.log("book", yearMonth);
                                refYear.current = e.target;
                              }}
                            >
                              <option value="">Select Year</option>
                              {yearArr &&
                                yearArr.map((data, index) => (
                                  <option value={data} key={index}>
                                    {data}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="form-group">
                          <label>Month</label>
                          {/* <input type="date" /> */}
                          <div
                            className=""
                            id="reservationdate"
                            data-target-input="nearest"
                          >
                            <select
                              name="bookingmonth"
                              className="form-control"
                              onChange={async (e) => {
                                setYearMonth({
                                  ...yearMonth,
                                  [e.target.name]: e.target.value,
                                });
                                console.log("book", yearMonth);
                                refMonth.current = e.target;
                              }}
                            >
                              <option value="">Select Month</option>
                              {monthArr &&
                                monthArr.map((data, index) => (
                                  <option value={index + 1} key={index}>
                                    {data}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <button
                          className="btn btn-secondary"
                          style={{ marginTop: "30px" }}
                          onClick={handleClick}
                        >
                          Search
                        </button>
                        &nbsp;&nbsp;
                        <button
                          className="btn btn-secondary"
                          style={{ marginTop: "30px" }}
                          onClick={handleReset}
                          type="reset"
                        >
                          Reset
                        </button>
                      </div>
                    </div>

                    <br />
                    {booking.length > 0 ? (
                      <table
                        id="example1"
                        className="table table-bordered table-striped"
                      >
                        <thead>
                          <tr>
                            <th>Booking ID</th>
                            <th>Booking Status</th>
                            <th>Payment Status</th>
                            <th>Booked By</th>
                            <th>Name</th>
                            <th>Booked On</th>
                            <th>Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {booking.map((data, index) => (
                            <tr key={index}>
                              <td>
                                <b style={{ color: "maroon" }}>
                                  {data.bookingId}
                                </b>
                              </td>
                              <td>
                                {data.isCancelled ? (
                                  <span style={{ color: "red" }}>
                                    <b>Cancelled</b>
                                  </span>
                                ) : (
                                  <span style={{ color: "green" }}>
                                    <b>Booked</b>
                                  </span>
                                )}
                              </td>
                              <td>{data.status==='p'?"Pending"
                              :data.status==='c'?"Completed"
                            :data.status==='e'?"Error":null}</td>
                              <td>
                                {data.booked_by === "admin" ? "Admin" : data.booked_by==='user' ? "User" : "Sub Admin"}
                              </td>
                              <td>{data.name}</td>
                              
                              <td>{data.created_at}</td>

                              <td>
                                <i
                                  className="fas fa-info"
                                  onClick={() => {
                                    setShowModal(true);
                                    setModalData(data);
                                    console.log("data", data);
                                  }}
                                ></i>
                                &nbsp;&nbsp;
                                {/* <a href={`/editbooking/${data._id}`}>
                                  <i className="fas fa-edit"></i>
                                </a> */}
                                &nbsp;&nbsp;
                                {!data.isCancelled && (
                                  <i
                                    className="fas fa-ban "
                                    onClick={() => handleCancel(data._id)}
                                    title="Cancel"
                                  ></i>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                          <th>Booking ID</th>
                            <th>Booking Status</th>
                            <th>Payment Status</th>
                            <th>Booked By</th>
                            <th>Name</th>
                            <th>Booked On</th>
                            <th>Details</th>
                          </tr>
                        </tfoot>
                      </table>
                    ) : (
                      <b>No Booking Found</b>
                    )}
                  </div>

                  {modalData && (
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                      <Modal.Header closeButton>
                        <Modal.Title>Booking Details</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p>
                          <b>Name : </b>
                          {modalData.name}
                        </p>
                        <p>
                          <b>Booking ID : </b>
                          {modalData.bookingId}
                        </p>
                        <p>
                          <b>Email ID : </b>
                          {modalData.mail}
                        </p>
                        <p>
                          <b>Contact Number : </b>
                          {modalData.phone}
                        </p>
                        <p>
                          <b>Address : </b>
                          {modalData.address}
                        </p>
                        <p>
                          <b>Package : </b>
                          {modalData.post[0].title}
                        </p>
                        <p>
                          <b>Journey Date : </b>
                          {modalData.date}
                        </p>
                        <p>
                          <b>Travellers : </b>

                          {
                            modalData.travellers.map((x, idx) => (
                              <p
                                key={idx}
                                style={{
                                  marginLeft: "20%",
                                  marginTop: "-5.5%",
                                }}
                              >
                                <span style={{ lineHeight: "2" }}>
                                  {x.name}, {x.age} years, {x.gender}
                                </span>
                              </p>
                            ))}
                        </p>
                        {modalData.sharing && (
                          <p>
                            <b>Sharing Mode: </b>
                            {modalData.sharing}
                          </p>
                        )}
                        <p>
                          <b>Payment Mode : </b>
                          {modalData.payment_mode}
                        </p>
                        <p>
                          <b>Amount Paid : </b>
                          {modalData.amount}
                        </p>
                        <p>
                        <b>Amount Due : Rs.</b>
                        {modalData.due_amount}
                      </p>  
                        <p>
                          <b>Transaction ID : </b>
                          {modalData.transactionId}
                        </p>
                        {modalData.gst_no && (
                          <p>
                            <b>GST No. : </b>
                            {modalData.gst_no}
                          </p>
                        )}
                        <p>
                          <b>Booked On : </b>
                          {modalData.created_at}
                        </p>
                        {/* <p>
                          <b>Check-In Date : </b>
                          {modalData.check_in_date}
                        </p>
                        <p>
                          <b>Check-Out Date : </b>
                          {modalData.check_out_date}
                        </p> */}
                        <p>
                          <b>Head Count : </b>
                          {modalData.person}
                        </p>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="secondary"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  )}

                  {/* <!-- /.card-body --> */}
                </div>
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
  );
};
export default BookingList;
