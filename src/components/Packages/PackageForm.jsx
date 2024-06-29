import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addpackage } from "../../redux/Slice";
import { useNavigate } from "react-router-dom";
//import sun editor
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const PackageForm = () => {
  const [short_description, setShort_description] = useState();
  const [featured_img, setFeaturedImage] = useState();
  const [pic, setPic] = useState();
  const [main_img, setMainImage] = useState();
  const [m_img, setM_img] = useState();

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
    package_category: {
      required: {
        value: true,
        message: "*Please Choose Package Category",
      },
    },
    title: {
      required: {
        value: true,
        message: "*Please Enter Name",
      },
    }
  };

  const handleChange = (e) => {
    setPic(e.target.files[0]);
    setFeaturedImage(e.target.files[0].name);
  };
  const handleMainImageChange = (e) => {
    setM_img(e.target.files[0]);
    setMainImage(e.target.files[0].name);
  };
  const handleForm = async (data, e) => {
    console.log("f_img", featured_img);
    console.log("data", data);
    e.preventDefault();
    reset();
    let formData = new FormData();
    formData.append("package_category", data.package_category);
    formData.append("title", data.title);
    formData.append("content", short_description);
    formData.append("emi_price", data.emi_price ? data.emi_price : 0.00);
    formData.append("days", data.days);
    formData.append("nights", data.nights);
    formData.append("pic", pic); //To store in public
    formData.append("featured_img", featured_img); //To store in mongo
    formData.append("main_img", main_img); //To store in mongo
    formData.append("m_img", m_img); //To store in public
    formData.append("meta_title", data.meta_title);
    formData.append("meta_desc", data.meta_desc);
    formData.append("meta_keywords", data.meta_keywords);

    const response = await dispatch(addpackage(formData));
    if (response.payload.status == 1) {
      navigate(`/packages/addpackagetab/${response.payload.slug}`);
    }
    console.log("response", response);
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
                  <b>PACKAGE CREATION FORM</b>
                </h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    <Link to="/packages">Packages</Link>
                  </li>
                  <li className="breadcrumb-item active">Add Package</li>
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
                    <h3 className="card-title">Form To Create New Package</h3>
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
                            <label>Category</label>
                            <select
                              className="form-control select2"
                              style={{ width: "100%" }}
                              {...register(
                                "package_category",
                                formOptions.package_category
                              )}
                            >
                              <option value="">Select Category</option>
                              <option value="beautiful_asia">
                                Beautiful Asia
                              </option>
                              <option value="wild_africa">Wild Africa</option>
                              <option value="incredible_india">
                                Incredible India
                              </option>
                              <option value="colorful_festival">
                                Colorful Festival
                              </option>
                              <option value="adventure_himalayas">
                                Adventure Himalayas
                              </option>
                            </select>
                            <p className="error">
                              {errors.package_category?.message}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Name</label>
                        <input
                          type="text"
                          name="title"
                          className="form-control"
                          placeholder="Enter the Name"
                          {...register("title", formOptions.title)}
                        />
                        <p className="error">{errors.title?.message}</p>
                      </div>
                      <div className="row">
                        <div className="col-md-2">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Days</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Days"
                              {...register("days", formOptions.days)}
                            />
                            <p className="error">{errors.days?.message}</p>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Nights</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Nights"
                              {...register("nights", formOptions.nights)}
                            />
                            <p className="error">{errors.nights?.message}</p>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Description</label>
                        <SunEditor
                        height="500"
                        setDefaultStyle="font-size: 16px;"
                          onChange={(event) => setShort_description(event)}
                        />
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              EMI Price
                            </label>
                            <input
                              type="number"
                              name="price"
                              className="form-control"
                              placeholder="Enter EMI Price"
                              {...register("emi_price", formOptions.emi_price)}
                            />
                            <p className="error">{errors.emi_price?.message}</p>
                          </div>
                        </div>
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
                              onChange={handleChange}
                            />
                            {/* <p className='error'>{errors.featured_image?.message}</p> */}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Map Image
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              placeholder="Choose Picture"
                              onChange={handleMainImageChange}
                            />
                            {/* <p className='error'>{errors.featured_image?.message}</p> */}
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

export default PackageForm;
