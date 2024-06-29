import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { addfounder, addstaff } from "../../redux/Slice";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const StaffForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const handleError = (errors) => { };
    const formOptions = {
      
        name: {
            required: {
                value: true,
                message: "*Please Enter Name",
            },
        },
        emp_id: {
            required: {
                value: true,
                message: "*Please Enter Employee ID",
            },
        },
        mail: {
            required: {
                value: true,
                message: "*Please Enter Description",
            },
        },
        password: {
            required: {
                value: true,
                message: "*Please Enter Password",
            },
        },
        phone: {
            required: {
                value: true,
                message: "*Please Enter Contact Number",
            },
        },
        address: {
            required: {
                value: true,
                message: "*Please Enter Address",
            }
        }
    };

    const handleForm = async (input, e) => {
        e.preventDefault();
        reset();
        console.log("input", input);
        const formData = new FormData();
    
        formData.append("emp_id", input.emp_id);
        formData.append("name", input.name);
        formData.append("phone", input.phone);
        formData.append("mail", input.mail);
        formData.append("password", input.password);
        formData.append("address", input.address);
        formData.append("created_by", "1");
        const response = await dispatch(addstaff(formData));
        console.log("add", response.payload.status);
        if (response.payload.status == 1) {
            navigate("/stafflist");
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
                                    <b>STAFF CREATION FORM</b>
                                </h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item ">
                                        <Link to="/stafflist">Staff List</Link>
                                    </li>
                                    <li className="breadcrumb-item active">Add Staff</li>
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
                                        <h3 className="card-title">Form To Create New Staff</h3>
                                    </div>
                                    {/* <!-- /.card-header --> */}
                                    {/* <!-- form start --> */}
                                    <form
                                        id="quickForm"
                                        onSubmit={handleSubmit(handleForm, handleError)}
                                    >
                                        <div className="card-body">
                                            
                                            <div className="row">
                                                <div className="col-md-6">
                                                <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter Name"
                                                    {...register("name", formOptions.name)}
                                                />
                                                <p className="error">{errors.name?.message}</p>
                                            </div>
                                                </div>
                                                <div className="col-md-3">
                                                <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Employee ID</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter Employee ID"
                                                    {...register("emp_id", formOptions.emp_id)}
                                                />
                                                <p className="error">{errors.emp_id?.message}</p>
                                            </div>
                                                </div>
                                            </div>
                                            
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Email ID</label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            placeholder="Enter Email ID"
                                                            {...register("mail", formOptions.mail)}
                                                        ></input>
                                                        <p className="error">{errors.mail?.message}</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Password</label>
                                                        <input
                                                            type="String"
                                                            className="form-control"
                                                            placeholder="Enter Password"
                                                            {...register("password", formOptions.password)}
                                                        ></input>
                                                        <p className="error">{errors.password?.message}</p>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="row">
                                                <div className="col-md-6">
                                                <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Contact Number</label>
                                                        <input
                                                            type="Number"
                                                            className="form-control"
                                                            placeholder="Enter Contact Number"
                                                            {...register("phone", formOptions.phone)}
                                                        ></input>
                                                        <p className="error">{errors.phone?.message}</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Address</label>
                                                        <textarea
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter Address"
                                                            {...register("address", formOptions.address)}
                                                        />
                                                        <p className="error">{errors.address?.message}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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

export default StaffForm;
