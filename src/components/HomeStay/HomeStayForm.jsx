import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../Layout";
import { addhomestay } from "../../redux/Slice";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
//import sun editor
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const HomeStayForm = () => {
  const [featured_img, setFeatured_img] = useState();
  const [f_img, setF_img] = useState();
  const [main_img, setMain_img] = useState();
  const [m_img, setM_img] = useState();
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
        message: "*Please Enter Name",
      },
    },
    priority: {
      required: {
        value: true,
        message: '*Please Enter Priority'
      }
    },
    content: {
      required: {
        value: true,
        message: "*Please Enter Description",
      },
    },
    // is_featured: {
    //   required: {
    //     value: true,
    //     message: '*Please Choose Yes/No'
    //   }
    // },
    featured_img: {
      required: {
        value: true,
        message: "*Please Select Image",
      },
    },
    main_img: {
      required: {
        value: true,
        message: "*Please Select Image",
      },
    },
    video_link: {
      // required: {
      //   value: true,
      //   message: '*Please Select video'
      // }
    }
  };

  const handleFeaturedImageUpload = (e) => {
    console.log("featured image", e.target.files[0]);
    setFeatured_img(e.target.files[0].name);
    setF_img(e.target.files[0]);
  };

  const handleMainImageUpload = (e) => {
   
    console.log("main image", e.target.files[0]);
    setMain_img(e.target.files[0].name);
    setM_img(e.target.files[0]);
  };

  const handleForm = async (data) => {
    // console.log('featured_img',featured_img)
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("priority", data.priority);
    formData.append("content", short_description);
    formData.append("featured_img", featured_img);
    formData.append("f_img", f_img);
    formData.append("main_img", main_img);
    formData.append("m_img", m_img);
    formData.append("video_link", data.video_link);
    formData.append("meta_title", data.meta_title);
    formData.append("meta_desc", data.meta_desc);
    formData.append("meta_keywords", data.meta_keywords);

    const response = await dispatch(addhomestay(formData));

    if (response.payload == 1) {
      navigate("/homestaylist");
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
                  <b>HOME STAY FORM</b>
                </h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/homestaylist">Homestay List</Link>
                  </li>
                  <li className="breadcrumb-item active">Home Stay Form</li>
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
                    <h3 className="card-title">Form to Create New Home Stay</h3>
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
                          placeholder="Enter the Name"
                          {...register("title", formOptions.title)}
                        />
                        <p className="error">{errors.title?.message}</p>
                      </div>
                      <div className="form-group col-md-2">
                        <label htmlFor="exampleInputEmail1">Priority</label>
                        <input
                          className="form-control"
                          placeholder="Enter the Priority"
                          {...register("priority", formOptions.priority)}
                        />
                        <p className="error">{errors.priority?.message}</p>
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Description</label>
                        <SunEditor
                        height="500"
                        setDefaultStyle="font-size: 16px;"
                          onChange={(event) => setShort_description(event)}
                        />
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
                            <p className="error">
                              {errors.featured_img?.message}
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Main Image
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              placeholder="Choose Picture"
                              onChange={handleMainImageUpload}
                            />
                            <p className="error">{errors.main_img?.message}</p>
                          </div>
                        </div>
                        {/* <div className="col-md-4">
                          <div className="form-group clearfix">
                            <label style={{ marginLeft: '30px' }}>Is Featured</label>
                            <br />
                            <div className="icheck-success d-inline">
                              <input type="radio" name="is_featured" value='true'
                                checked id="radioSuccess1"
                                {...register('is_featured', formOptions.is_featured)} />
                                <p className='error'>{errors.is_featured?.message}</p>
                              <label htmlFor="radioSuccess1"
                                style={{ marginLeft: '25px' }}>
                                Yes
                              </label>
                            </div>
                            <div className="icheck-danger d-inline">
                              <input type="radio" name="is_featured" value='false' id="radioSuccess2"
                                {...register('is_featured', formOptions.is_featured)} />
                              <label htmlFor="radioSuccess2"
                                style={{ marginLeft: '10px' }}>
                                No
                              </label>
                            </div>

                          </div>
                        </div> */}
                      </div>

                      <div className="row">
                        
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Video Link
                            </label>
                            <input
                              type="text"
                              name="video_link"
                              className="form-control"
                              placeholder="Enter Embedded Video String"
                              {...register(
                                "video_link",
                                formOptions.video_link
                              )}
                            />
                            <p className="error">
                              {errors.video_link?.message}
                            </p>
                          </div>
                        </div>
                      </div>
                      <h3>Meta Details</h3>
                      <hr />
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Meta Title</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Meta Title"
                          {...register("meta_title")}
                        />
                        {/* <p className="error">{errors.meta_title?.message}</p> */}
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          Meta Description
                        </label>
                        <textarea
                          type="text"
                          className="form-control"
                          placeholder="Enter Meta Description"
                          {...register("meta_desc")}
                        />
                        {/* <p className="error">{errors.meta_desc?.message}</p> */}
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Keywords</label>
                        <textarea
                          type="text"
                          className="form-control"
                          placeholder="Enter Meta Description"
                          {...register("meta_keywords")}
                        />
                        {/* <p className="error">{errors.meta_keywords?.message}</p> */}
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

export default HomeStayForm;
