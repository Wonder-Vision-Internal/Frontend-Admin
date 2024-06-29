import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { addtestimonial, update_testimonial,  } from "../../redux/Slice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const TestimonialForm = () => {
  const { postId } = useParams();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleError = (errors) => {};
 
  const handleForm = async (input, e) => {
    e.preventDefault();
    
    let formData = new FormData();
    formData.append('video_link', input.video_link);

    if (postId) {
      formData.append('postId', postId);
      const response = await dispatch(update_testimonial(formData));
      
      if (response.payload.status == 1) {
        navigate("/testimonial-list");
      }
    } 
    else {   
      const response = await dispatch(addtestimonial(formData));
      console.log("res", response.payload.status);
      if (response.payload.status == 1) {
        navigate("/testimonial-list");
      }
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
                {postId ? (
                  <h1>TESTIMONIAL UPDATION FORM</h1>
                ) : (
                  <h1>TESTIMONIAL CREATION FORM</h1>
                )}
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/testimonial-list">Testimonial List</Link>
                  </li>
                  <li className="breadcrumb-item active">Add Testimonial</li>
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
                    {postId ? (
                      <h5>Form To Update Testimonial</h5>
                    ) : (
                      <h5>Form To Create Testimonial</h5>
                    )}
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
                            <label htmlFor="exampleInputEmail1">
                              Video Link
                            </label>
                   
                            <input type='text'
                              className="form-control"
                              placeholder="Enter Video Link"
                              name="video_link"
                                {...register("video_link")}
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

export default TestimonialForm;
