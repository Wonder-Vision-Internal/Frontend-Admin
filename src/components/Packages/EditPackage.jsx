import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PackageBySlug, deletepricedetails, updatepackage } from "../../redux/Slice";
import { useNavigate, useParams } from "react-router-dom";

//import sun editor
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";


const EditPackage = () => {

  const { slug } = useParams();
  const [packageData, setPackageData] = useState();
  const [smallDetails, setSmallDetails] = useState({
    emi_price: "",
    days: "",
    nights: "",
  });
  const [short_description, setShort_description] = useState();
  const [featured_img, setFeaturedImage] = useState();
  const [pic, setPic] = useState();
  const [main_img, setMainImage] = useState();
  const [m_img, setM_img] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const packageBySlug = async () => {
    const packagedetails = await dispatch(PackageBySlug(slug));
    console.log("packagedetails", packagedetails);
    setPackageData(packagedetails.payload.package[0]);
    // setTabDetails(JSON.parse(packagedetails.payload.package[0].package[0].other_details));
    setSmallDetails(packagedetails.payload.package[0].package[0]);
  };

  useEffect(() => {
    packageBySlug();
  }, []);
  // console.log("smalldetails", smallDetails);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleError = (errors) => { };
  const formOptions = {
    slug: {
      // required: {
      //   value: true,
      //   message: "*Please Choose Slug",
      // },
    },
    title: {
      // required: {
      //   value: true,
      //   message: "*Please Enter Name",
      // },
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

  const handlePriceChange = (e, index) => {
    smallDetails.price_details[index][e.target.name] = e.target.value
    setSmallDetails({ ...smallDetails })
  }

  const handlePriceDelete = async (index) => {
    let formData = new FormData()
    formData.append('slug', slug)
    formData.append('index', index)
    const res = await dispatch(deletepricedetails(formData))
    if (res.payload.status == 1) {
      packageBySlug();
    }
  }

  const handleForm = async (data, e) => {
    reset();
    e.preventDefault();
    let formData = new FormData();
    console.log('smallDetails.price_details', smallDetails.price_details);
    formData.append("postId", packageData._id);
    formData.append("title", data.title ? data.title : packageData.title);
    formData.append("slug", data.slug ? data.slug : packageData.slug);
    formData.append("content", short_description);
    formData.append("price_details", JSON.stringify(smallDetails.price_details));
    formData.append(
      "emi_price",
      data.emi_price ? data.emi_price : smallDetails.emi_price
    );
    formData.append("days", data.days ? data.days : smallDetails.days);
    formData.append("nights", data.nights ? data.nights : smallDetails.nights);
    formData.append("starts_from", data.starts_from ? data.starts_from : 
    data.starts_from === '' ? '' : smallDetails.starts_from);
    formData.append("pic", pic); //To store in public
    formData.append("featured_img", featured_img); //To store in mongo
    formData.append("main_img", main_img); //To store in public
    formData.append("m_img", m_img); //To store in mongo
    formData.append(
      "meta_title",
      data.meta_title ? data.meta_title : packageData.meta_title
    );
    formData.append(
      "meta_desc",
      data.meta_desc ? data.meta_desc : packageData.meta_desc
    );
    formData.append(
      "meta_keywords",
      data.meta_keywords ? data.meta_keywords : packageData.meta_keywords
    );
    const response = await dispatch(updatepackage(formData));
    if (response.payload.status == 1) {
      navigate(`/packages`);
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
                  <b>PACKAGE UPDATION FORM</b>
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
                  <li className="breadcrumb-item active">Edit Package</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        {packageData && (
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                {/* <!-- left column --> */}
                <div className="col-md-12">
                  {/* <!-- jquery validation --> */}
                  <div className="card card-primary">
                    <div className="card-header">
                      <h3 className="card-title">Form To Update Package</h3>
                    </div>
                    {/* <!-- /.card-header --> */}
                    {/* <!-- form start --> */}
                    <form
                      id="quickForm"
                      onSubmit={handleSubmit(handleForm, handleError)}
                    >
                      <div className="card-body">
                        <Link to={`/editpackagetab/${packageData.slug}`}>
                          <button type="submit" className="btn btn-primary">
                            Edit Tab Details
                          </button>
                        </Link>

                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Name</label>
                          <input
                            type="text"
                            name="title"
                            className="form-control"
                            placeholder="Enter the Name"
                            defaultValue={packageData.title}
                            {...register("title", formOptions.title)}
                          />
                          <p className="error">{errors.title?.message}</p>
                        </div>

                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Slug</label>
                          <input
                            type="text"
                            name="title"
                            className="form-control"
                            placeholder="Enter the Slug"
                            defaultValue={packageData.slug}
                            {...register("slug", formOptions.slug)}
                          />
                          <p className="error">{errors.slug?.message}</p>
                        </div>
                        <div className="row">
                          <div className="col-md-2">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Days</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Days"
                                defaultValue={smallDetails.days}
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
                                defaultValue={smallDetails.nights}
                                {...register("nights", formOptions.nights)}
                              />
                              <p className="error">{errors.nights?.message}</p>
                            </div>
                          </div>
                          <div className="col-md-5">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Starts From</label>
                              <input type="text"
                                className="form-control"
                                defaultValue={smallDetails.starts_from} 
                                {...register("starts_from", formOptions.starts_from)}/>
                              {/* <p className="error">{errors.starts_from?.message}</p> */}
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            Description
                          </label>
                          <SunEditor
                            height="500"
                            setDefaultStyle="font-size: 16px;"
                            onChange={(event) => setShort_description(event)}
                            setContents={packageData.content}
                          />
                        </div>

                        <label htmlFor="exampleInputEmail1">Price Details
                          <Link to={`/packages/addpricedetails/${packageData.slug}`}><i className="fa fa-plus" style={{ marginLeft: '20px' }}
                          ></i></Link></label>
                        {/* </div> */}
                        {smallDetails.price_details &&
                          smallDetails.price_details.map((x, index) => (
                            <div>
                              <div className="row" key={index}>
                                <div className="col-md-6">
                                  <input htmlFor="" className="form-control " name='description'
                                    defaultValue={x.description} onChange={(e) => handlePriceChange(e, index)} />
                                </div>
                                <div className="col-md-4">
                                  <input
                                    type="number"
                                    name="price"
                                    className="form-control "
                                    placeholder="Enter Price"
                                    defaultValue={x.price}
                                    onChange={(e) => handlePriceChange(e, index)}
                                  />
                                </div>
                                <i className="fas fa-trash" onClick={() => handlePriceDelete(index)}></i>
                              </div>
                              <br />
                            </div>

                          ))}
                        <p className="error">{errors.price?.message}</p>
                     

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                EMI Price
                              </label>
                              <input
                                type="text"
                                name="price"
                                className="form-control"
                                placeholder="Enter EMI Price"
                                defaultValue={smallDetails.emi_price}
                                {...register(
                                  "emi_price",
                                  formOptions.emi_price
                                )}
                              />
                              <p className="error">
                                {errors.emi_price?.message}
                              </p>
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
                                // name="featured_image"
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
                                // name="featured_image"
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
                            defaultValue={packageData.meta.title}
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
                            defaultValue={packageData.meta.description}
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
                            defaultValue={packageData.meta.keywords}
                            {...register("meta_keywords")}
                          />
                          {/* <p className='error'>{errors.featured_image?.message}</p> */}
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
        )}
      </div>
    </div>
  );
};

export default EditPackage;
