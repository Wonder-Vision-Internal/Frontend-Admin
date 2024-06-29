import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../Layout";
import { addhomestay, getallmeta, updatemeta } from "../../redux/Slice";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const EditMeta = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { page_name } = useParams()

    console.log('page name', page_name)


    const [meta, setMeta] = useState()
    const getMeta = async (req, res) => {
        const response = await dispatch(getallmeta())
        console.log('parse', JSON.parse(response.payload.metaInfo.meta));
        for (let x in JSON.parse(response.payload.metaInfo.meta)) {
            console.log('x', x);
            if (x === page_name) {
                setMeta(JSON.parse(response.payload.metaInfo.meta)[x])
            }
        }
    }

    useEffect(() => {
        getMeta()
    }, [])
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const handleError = (errors) => { };

    const formOptions = {
        meta_title: {
            required: {
                value: true,
                message: "*Please Enter Name",
            },
        },
        meta_desc: {
            required: {
                value: true,
                message: '*Please Enter Priority'
            }
        }
    };

    const handleForm = async (data) => {
        console.log('data',data);
        const formData = new FormData();
        formData.append("page_name", page_name);
        formData.append("meta_title", data.meta_title ? data.meta_title : meta.title);
        formData.append("meta_desc", data.meta_desc ? data.meta_desc : meta.description);
        formData.append("meta_keywords", data.meta_keywords ? data.meta_keywords : meta.keywords);

        const response = await dispatch(updatemeta(formData));

        if (response.payload.status == 1) {
            navigate("/allmeta");
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
                                    <b>META DETAILS UPDATION FORM</b>
                                </h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link to="/allmeta">Meta List</Link>
                                    </li>
                                    <li className="breadcrumb-item active">Meta Form</li>
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
                                        <h3 className="card-title">Form To Update Meta Information</h3>
                                    </div>
                                    {/* <!-- /.card-header --> */}
                                    {/* <!-- form start --> */}
                                    <form
                                        id="quickForm"
                                        onSubmit={handleSubmit(handleForm, handleError)}
                                    >
                                        {meta &&
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Meta Title</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter Meta Title"
                                                        defaultValue={meta.title}
                                                        {...register("meta_title")}
                                                    />
                                                    <p className="error">{errors.meta_title?.message}</p>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">
                                                        Meta Description
                                                    </label>
                                                    <textarea
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter Meta Description"
                                                        defaultValue={meta.description}
                                                        {...register("meta_desc")}
                                                    />
                                                    <p className="error">{errors.meta_desc?.message}</p>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Keywords</label>
                                                    <textarea
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter Meta Description"
                                                        defaultValue={meta.keywords}
                                                        {...register("meta_keywords")}
                                                    />
                                                    
                                                </div>
                                            </div>
                                        }
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

export default EditMeta;
