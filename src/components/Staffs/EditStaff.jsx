import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { searchbyempid, updatestaff } from "../../redux/Slice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const EditStaff = () => {


    const [staff, setStaff] = useState()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { emp_id } = useParams()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const handleError = (errors) => { };


    const loadEmployeeDetails = async () => {
        const response = await dispatch(searchbyempid(emp_id))
        console.log('payload', response.payload);
        setStaff(response.payload.staffData[0]);
    }

    useEffect(() => {
        loadEmployeeDetails()
    }, [])

    const handleForm = async (input, e) => {
        e.preventDefault();
        reset();
        console.log("input", input);
        const formData = new FormData();
        formData.append("id", staff._id);
        // formData.append("emp_id", input.emp_id ? input.emp_id : staff.emp_id);
        formData.append("name", input.name ? input.name : staff.name);
        formData.append("phone", input.phone ? input.phone : staff.phone);
        formData.append("mail", input.mail ? input.mail : staff.mail);
        formData.append("password", input.password );
        formData.append("address", input.address ? input.address : staff.address);
        
        const response = await dispatch(updatestaff(formData));
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
                                    <b>STAFF UPDATION FORM</b>
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
                                    <li className="breadcrumb-item active">Edit Staff</li>
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
                                        <h3 className="card-title">Form To Update Staff</h3>
                                    </div>
                                    {/* <!-- /.card-header --> */}
                                    {/* <!-- form start --> */}
                                    {staff ?
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
                                                                defaultValue={staff.name}
                                                                {...register("name")}

                                                            />
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputEmail1">Employee ID</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Enter Name"
                                                                defaultValue={staff.emp_id}
                                                                {...register("emp_id")}
                                                                disabled
                                                            />
                                                            
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
                                                                defaultValue={staff.mail}
                                                                {...register("mail")}
                                                            ></input>
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputEmail1">Password</label>
                                                            <input
                                                                type="String"
                                                                className="form-control"
                                                                placeholder="Enter Password"
                                                                {...register("password")}
                                                            ></input>
                                                            
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
                                                                defaultValue={staff.phone}
                                                                {...register("phone")}
                                                            ></input>
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputEmail1">Address</label>
                                                            <textarea
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Enter Address"
                                                                defaultValue={staff.address}
                                                                {...register("address")}
                                                            />
                                                            
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
                                        : null}
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

export default EditStaff;
