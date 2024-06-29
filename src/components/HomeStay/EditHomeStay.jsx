import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Layout from "../Layout";
import { gethomestaybyslug, updatehomestay } from "../../redux/Slice";
//import sun editor
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const HomeStayForm = () => {

  const [short_description, setShort_description] = useState();
  const [featured_img, setFeatured_img] = useState();
  const [f_img, setF_img] = useState();
  const [main_img, setMain_img] = useState();
  const [m_img, setM_img] = useState();

  const [result, setResult] = useState();

  const navigate = useNavigate();
  const { slug } = useParams();
  const dispatch = useDispatch();

  const getHomeStay = () => {
    dispatch(gethomestaybyslug(slug))
      .then((response) => {
        console.log("from edit", response.payload);
        setResult(response.payload.homeStayDetails);
      })
      .catch((err) => {
        console.log("Error from edit component", err);
      });
  };

  useEffect(() => {
    getHomeStay();
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleError = (errors) => { };
  const formOptions = {
    title: {
      required: {
        value: true,
        message: "*Please Enter Title",
      },
    },
    // priority: {
    //     required: {
    //         value: true,
    //         message: '*Please Enter priority'
    //     }
    // },
    content: {
      required: {
        value: true,
        message: "*Please Enter Description",
      },
    },
    featured_img: {
      required: {
        value: true,
        message: "*Please Choose Image",
      },
    },
    main_img: {
      required: {
        value: true,
        message: "*Please Choose Image",
      },
    },
    video_link: {
      // required: {
      //     value: true,
      //     message: '*Please Choose Video'
      // }
    },
  };


  const handleMainImageUpload = (e) => {
    setMain_img(e.target.files[0].name);
    setM_img(e.target.files[0]);
  };

  const handleFeaturedImageUpload = (e) => {
    // console.log('featured image', e.target.files[0])
    setFeatured_img(e.target.files[0].name);
    setF_img(e.target.files[0]);
  };

  const handleForm = async (data, e) => {
    console.log("data", data);
    e.preventDefault();
    console.log("from handleForm");
    const formData = new FormData();

    formData.append("postId", result._id);
    formData.append("title", data.title ? data.title : result.title);
    formData.append("slug", data.slug ? data.slug : result.slug);
    formData.append(
      "priority",
      data.priority ? data.priority : result.priority
    );
    formData.append(
      "content",
      short_description ? short_description : result.content
    );
    formData.append("featured_img", featured_img);
    formData.append("f_img", f_img);
    formData.append("main_img", main_img);
    formData.append("m_img", m_img);
    formData.append(
      "video_link",
      data.video_link ? data.video_link : result.video_link
    );
    formData.append(
      "meta_title",
      data.meta_title ? data.meta_title : result.meta_title
    );
    formData.append(
      "meta_desc",
      data.meta_desc ? data.meta_desc : result.meta_desc
    );
    formData.append(
      "meta_keywords",
      data.meta_keywords ? data.meta_keywords : result.meta_keywords
    );

    const response = await dispatch(updatehomestay(formData));
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
                  <b>HOME STAY DETAILS UPDATION FORM</b>
                </h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/homestaylist">Home Stay List</Link>
                  </li>
                  <li className="breadcrumb-item active">Edit Home Stay</li>
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
                    <h3 className="card-title">Update Home Stay Details</h3>
                  </div>
                  {/* <!-- /.card-header --> */}
                  {/* <!-- form start --> */}
                  {result && (
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
                            defaultValue={result.title}
                            {...register("title", formOptions.title)}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Slug</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter the Name"
                            defaultValue={result.slug}
                            {...register("slug", formOptions.slug)}
                          />
                        </div>
                        <div className="form-group col-md-2">
                          <label htmlFor="exampleInputEmail1">Priority</label>
                          <input
                            className="form-control"
                            placeholder="Enter the Priority"
                            defaultValue={result.priority}
                            {...register("priority", formOptions.priority)}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            Description
                          </label>
                          <SunEditor
                            height="500"
                            setDefaultStyle="font-size: 16px;"
                            onChange={(event) => setShort_description(event)}
                            setContents={result.content}
                          />
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Featured Image
                              </label>
                              <input
                                type="file"
                                className="form-control"
                                placeholder="Choose Picture"
                                onChange={handleFeaturedImageUpload}
                              />
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
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Video Link
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                defaultValue={result.video_link}
                                placeholder="Enter Embedded Video String"
                                {...register(
                                  "video_link",
                                  formOptions.video_link
                                )}
                              />
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
                            defaultValue={result.meta.title}
                            {...register("meta_title")}
                          />
                          {/* <p className='error'>{errors.featured_image?.message}</p> */}
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            Meta Description
                          </label>
                          <textarea
                            type="text"
                            className="form-control"
                            placeholder="Enter Meta Description"
                            defaultValue={result.meta.description}
                            {...register("meta_desc")}
                          />
                          {/* <p className='error'>{errors.featured_image?.message}</p> */}
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Keywords</label>
                          <textarea
                            type="text"
                            className="form-control"
                            placeholder="Enter Meta Keywords"
                            defaultValue={result.meta.keywords}
                            {...register("meta_keywords")}
                          />
                          {/* <p className='error'>{errors.featured_image?.message}</p> */}
                        </div>
                      </div>
                      {/* <!-- /.card-body --> */}
                      <div className="card-footer">
                        <button type="submit" className="btn btn-primary">
                          Update
                        </button>
                      </div>
                    </form>
                  )}
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
