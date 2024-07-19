import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { Link, useNavigate } from "react-router-dom";
import CarouselModel from "./CarouselModal";
import CarouselTable from "./CarouselTable";
import axios from "axios";
const url = import.meta.env.VITE_BASE_API_URL;

const CarouselData = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({});
  const [getDataapi, setGetDataapi] = useState([]);
  const [postData, setPostData] = useState({
    userImg: "",
    screenImg: "",
    userName: "",
    title: "",
  });
  const getData = async () => {
    try {
      let res = await axios.get(`${url}/get-testimonials-crousel`);
      setGetDataapi(res.data.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleGetImgURL = async (value) => {
    const formData = new FormData();
    formData.append('file', value);

    try {
      const response = await axios.post(`${url}/add-img`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data.filename;
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;
    if (type === "file") {
      setPostData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0],
      }));
    } else {
      setPostData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${url}/add-testimonials-crousel`, {
        ...postData,
        userImg: `${import.meta.env.VITE_BASE_API_URL}/${await handleGetImgURL(postData.userImg)}`,
        screenImg: `${import.meta.env.VITE_BASE_API_URL}/${await handleGetImgURL(postData.screenImg)}`,
      });
      if(res.status === 200) {
        toastr.success('Successful Added');
        getData();
      }
    } catch (error) {
      console.log("Erorr", error);
      toastr.error("Something went wrong");
    }
  };

  return (
    <div>
      <Layout />
      <CarouselModel
        setShow={setShow}
        show={show}
        formData={formData}
        setFormData={setFormData}
        getData={getData}
      />
      <div className="content-wrapper">
        {/* <!-- Content Header (Page header) --> */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Carousel Add Form</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/testimonial-list">Testimonial List</Link>
                  </li>
                  <li className="breadcrumb-item active">Add Carousel</li>
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
                    <h5>Form To Add Carousel</h5>
                  </div>
                  {/* <!-- /.card-header --> */}
                  {/* <!-- form start --> */}
                  <div
                    id="quickForm"
                    // onSubmit={handleSubmit(handleForm, handleError)}
                  >
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              User Image
                            </label>

                            <input
                              type="file"
                              className="form-control"
                              placeholder="Enter User Image Link"
                              name="userImg"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Screen Image
                            </label>

                            <input
                              type="file"
                              className="form-control"
                              placeholder="Enter Screen Image Link"
                              name="screenImg"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              User Name
                            </label>

                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter User Name"
                              name="userName"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Title</label>

                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Title"
                              name="title"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- /.card-body --> */}
                    <div className="card-footer">
                      <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
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
        <section className="content">
          <CarouselTable
            setShow={setShow}
            setFormData={setFormData}
            getDataapi={getDataapi}
            getData={getData}
          />
        </section>
      </div>
    </div>
  );
};

export default CarouselData;
