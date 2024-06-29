import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import {addfounder} from "../../redux/Slice";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const FounderForm = () => {
  

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
  const handleError = (errors) => {};
  const formOptions = {
    name: {
      required: {
        value: true,
        message: "*Please Enter Name",
      },
    },
    desc: {
      required: {
        value: true,
        message: "*Please Enter Description",
      },
    },
    img: {
      required: {
        value: true,
        message: "*Please Choose Image",
      },
    },
  };

  const hadnleImageUpload = (e) => {
    setImg(e.target.files[0].name); //for mongodb
    setPic(e.target.files[0]); //for saving
  };
  const handleForm = async (input, e) => {
    e.preventDefault();
    reset();
    console.log("input", input);
    const formData = new FormData();

    formData.append("name", input.name);
    formData.append("desc", input.desc);
    formData.append("img", img);
    formData.append("pic", pic);
    const response = await dispatch(addfounder(formData));
    console.log("add", response.payload.status);
    if (response.payload.status == 1) {
      navigate("/founderlist");
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
                  <b>MEMBER CREATION FORM</b>
                </h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>
                  <li className="breadcrumb-item ">
                    <Link to="/founderlist">Founders</Link>
                  </li>
                  <li className="breadcrumb-item active">Add Founder</li>
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
                    <h3 className="card-title">Form To Create New Member</h3>
                  </div>
                  {/* <!-- /.card-header --> */}
                  {/* <!-- form start --> */}
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
                          placeholder="Enter Name"
                          {...register("name", formOptions.name)}
                        />
                        <p className="error">{errors.name?.message}</p>
                      </div>

                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Designation</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Designation"
                          {...register("desc", formOptions.desc)}
                        ></input>
                        <p className="error">{errors.desc?.message}</p>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Picture</label>
                            <input
                              type="file"
                              className="form-control"
                              placeholder="Enter Address"
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

export default FounderForm;
