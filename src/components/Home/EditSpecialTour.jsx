import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { getspecialtour, updatespecialtour } from "../../redux/Slice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const EditSpecialTour = () => {

    const [tour, setTour] = useState();

    const [img, setImg] = useState();
    const [pic, setPic] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const { postId } = useParams()

    const token = localStorage.getItem('token')
    console.log('token', token);


    const fetchSpecialTour = async () => {
        const response = await dispatch(getspecialtour());
        console.log("special tour", response.payload);
        setTour(response.payload.specialData);
        return;
    };

    useEffect(() => {
        // if(!token){
        //   navigate('/')
        // }
        // else{
        //   getfounder();
        // }
        fetchSpecialTour()
    }, []);

    const handleError = (errors) => { };
    const formOptions = {
        name: {
            // required: {
            //     value: true,
            //     message: "*Please Enter Link",
            // },
        }
    };

    const hadnleImageUpload = (e) => {
        setImg(e.target.files[0].name); //for mongodb
        setPic(e.target.files[0]); //for saving
    };
    const handleForm = async (input, e) => {
        e.preventDefault();
        reset();

        const formData = new FormData();
        
        formData.append('postId',postId)
        formData.append("link", input.link ? input.link : tour.link) ;
        formData.append("img", img);
        formData.append("pic", pic);
        const response = await dispatch(updatespecialtour(formData));
        console.log("add", response.payload.status);
        if (response.payload.status == 1) {
            navigate("/special-tour");
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
                                    <b>SPECIAL TOUR UPDATION FORM</b>
                                </h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item ">
                                        <Link to="/special-tour">Special Tour</Link>
                                    </li>
                                    <li className="breadcrumb-item active">Special Tour</li>
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
                                        <h3 className="card-title">Form To Edit Special Tour</h3>
                                    </div>
                                    {/* <!-- /.card-header --> */}
                                    {/* <!-- form start --> */}
                                    {tour &&
                                        <form
                                            id="quickForm"
                                            onSubmit={handleSubmit(handleForm, handleError)}
                                        >
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter Link"
                                                        defaultValue={tour.link}
                                                        {...register("link", formOptions.link)}
                                                    />
                                                    <p className="error">{errors.name?.message}</p>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputEmail1">Picture</label>
                                                            <input
                                                                type="file"
                                                                className="form-control"
                                                                placeholder="Choose Picture"
                                                                name="img"
                                                                onChange={hadnleImageUpload}

                                                            />
                                                            <p className="error">{errors.img?.message}</p>
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
                                    }
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

export default EditSpecialTour;
