import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../Layout";
import { addblog, addhomestay } from "../../redux/Slice";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
//import sun editor
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const BlogForm = () => {
  const [featured_img, setFeatured_img] = useState();
  const [f_img, setF_img] = useState();
  const [blogImage,setBlogImage] = useState()
  const [short_description, setShort_description] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleError = (errors) => {};
  const formOptions = {
    title: {
      required: {
        value: true,
        message: "*Please Enter Title",
      },
    },
    content: {
      required: {
        value: true,
        message: "*Please Enter Description",
      },
    },
  
    // featured_img: {
    //   required: {
    //     value: true,
    //     message: "*Please Select Image",
    //   },
    // }
  };

  const handleFeaturedImageUpload = (e) => {
    console.log(e.target.files[0]);
    setFeatured_img(e.target.files[0].name);
    setF_img(e.target.files[0]);
  };

  // const handleBlogImageUpload = (e) => {
  //   setBlogImage(e.target.files[0]);
  // };

  const handleForm = async (data) => {
    
    
    const formData = new FormData();
    formData.append("title", data.title);
    
    formData.append("content", short_description);
    
    formData.append("featured_img", featured_img);
    formData.append("f_img", f_img);
    // formData.append("blogImage", blogImage);
   
    console.log(short_description);
    const response = await dispatch(addblog(formData));

    if (response.payload.status == 1) {
      navigate("/blog-list");
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
                  <b>BLOG CREATION FORM</b>
                </h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/blog-list">Blogs List</Link>
                  </li>
                  <li className="breadcrumb-item active">Blog Form</li>
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
                    <h3 className="card-title">Form to Create New Blog</h3>
                  </div>
                  {/* <!-- /.card-header --> */}
                  {/* <!-- form start --> */}
                  <form
                    id="quickForm"
                    onSubmit={handleSubmit(handleForm, handleError)}
                  >
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Title</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Title"
                          {...register("title", formOptions.title)}
                        />
                        <p className="error">{errors.title?.message}</p>
                      </div>
                   
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Description</label>
                        <SunEditor
                        height="500"
                        setDefaultStyle="font-size: 16px;"
                          onChange={(event) => setShort_description(event)}
                        onImageUpload={handleFeaturedImageUpload}/>
                        <p className="error">{errors.content?.message}</p>
                      </div>

                     

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Featured Image
                            </label>
                            <input
                              type="file"
                              name="featured_image"
                              className="form-control"
                              placeholder="Choose Picture"
                              onChange={handleFeaturedImageUpload}
                            />
                            {/* <p className="error">
                              {errors.featured_img?.message}
                            </p> */}
                          </div>
                        </div>

                        {/* <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Blog Image
                            </label>
                            <input
                              type="file"
                              
                              className="form-control"
                              placeholder="Choose Picture"
                              onChange={handleBlogImageUpload}
                            />
                            <p className="error">
                              {errors.featured_img?.message}
                            </p>
                          </div>
                        </div> */}
                        
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

export default BlogForm;
