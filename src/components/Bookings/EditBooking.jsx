import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Layout from "../Layout";
import {
  loadsinglebooking,
  updatebooking,
} from "../../redux/Slice";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
//import sun editor
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const EditBooking = () => {
  const [booking, setBooking] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleError = (errors) => {};
  const { id } = useParams();

  const loadbooking = async () => {
    console.log("id", id);
    const response = await dispatch(loadsinglebooking(id));
    console.log("booking", response.payload);
    setBooking(response.payload.BookingData[0]);
  };
  useEffect(() => {
    loadbooking();
  }, []);

  const handleForm = async (data) => {
    console.log("data", data);
    const formData = new FormData();

    formData.append('id',id)
    formData.append("persons", data.persons ? data.persons : booking.persons);
    formData.append("check_in_date", data.check_in_date ? data.check_in_date : booking.check_in_date);
    formData.append("check_out_date", data.check_out_date ? data.check_out_date : booking.check_out_date);
    formData.append("room_details", data.room_details ? data.room_details : booking.room_details);

    const response = await dispatch(updatebooking(formData));

    if (response.payload.status == 1) {
      navigate("/bookings");
    }
  };
  return (
    <div>
      <Layout />
      {/* <!-- Main content --> */}
      <div className="content-wrapper">
        {/* <!-- Content Header (Page header) --> */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>
                  <b>BOOKING RESCHEDULE FORM</b>
                </h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/bookings">Booking List</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    Booking Reschedule Form
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              {/* <!-- left column --> */}
              <div className="col-md-12">
                {/* <!-- jquery validation --> */}
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">Form To Reschedule Booking</h3>
                  </div>
                  {/* <!-- /.card-header --> */}
                  {/* <!-- form start --> */}
                  <form
                    id="quickForm"
                    onSubmit={handleSubmit(handleForm, handleError)}
                  >
                    {booking && (
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Booking For
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                disabled
                                defaultValue={booking.bookingDetails[0].title}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Name</label>
                          <input
                            type="text"
                            className="form-control col-md-6"
                            placeholder="Enter the Name"
                            defaultValue={booking.name}
                            disabled
                            {...register("name")}
                          />
                        </div>
                        <div className="row">
                          <div className="form-group col-md-6">
                            <label htmlFor="exampleInputEmail1">Email ID</label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Enter Email ID"
                              defaultValue={booking.mail}
                              disabled
                              {...register("mail")}
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="exampleInputEmail1">
                              Contact Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Contact Number"
                              defaultValue={booking.phone}
                              disabled
                              {...register("phone")}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 form-group">
                            <label htmlFor="exampleInputEmail1">Address</label>
                            <textarea
                              type="text"
                              style={{ height: "120px" }}
                              className="form-control"
                              placeholder="Enter Address"
                              defaultValue={booking.address}
                              disabled
                              {...register("address")}
                            />
                          </div>
                          <div className="col-md-2 form-group">
                            <label htmlFor="exampleInputEmail1">
                              Head Count
                            </label>
                            <input
                              type="Number"
                              className="form-control"
                              defaultValue={booking.persons}
                              {...register("persons")}
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Check-In Date
                              </label>
                              <input
                                type="date"
                                name="check_in_date"
                                className="form-control"
                                defaultValue={booking.check_in_date}
                                {...register("check_in_date")}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Check-Out Date
                              </label>
                              <input
                                type="date"
                                name="check_out_date"
                                className="form-control"
                                defaultValue={booking.check_out_date}
                                {...register("check_out_date")}
                              />
                            </div>
                          </div>
                        </div>
                        {booking.room_details ? (
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                  Room Details
                                </label>
                                <textarea
                                  type="text"
                                  name="room_details"
                                  className="form-control"
                                  style={{ height: "150px" }}
                                  placeholder="Enter Embedded Video String"
                                  defaultValue={booking.room_details}
                                  {...register("room_details")}
                                />
                              </div>
                            </div>
                          </div>
                        ) : null}
                        <br />

                        <div className=" row form-group">
                          <div className="col-md-6">
                            <label>Amount Paid (In Rupees)</label>
                            <input
                              type="Number"
                              className="form-control"
                              defaultValue={booking.amount_paid}
                              disabled
                              {...register("amount_paid")}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* <!-- /.card-body --> */}
                    <div className="card-footer">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
                {/* <!-- /.card --> */}
              </div>
              {/* <!--/.col (left) --> */}

              {/* <!--/.col (right) --> */}
            </div>
            {/* <!-- /.row --> */}
          </div>
          {/* <!-- /.container-fluid --> */}
        </section>
      </div>
    </div>
  );
};

export default EditBooking;
