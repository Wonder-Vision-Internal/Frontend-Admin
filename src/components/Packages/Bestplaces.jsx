import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { Link, useNavigate } from "react-router-dom";
import BestThingTable from "./BestThingTable";
import BestplaceModal from "./BestplaceModal";
import BestplaceTable from "./BestplaceTable";
import axios from "axios";
const url = import.meta.env.VITE_BASE_API_URL;


const Bestplaces = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({});
  const [getDataapi, setGetDataapi] = useState([]);
  const [postData, setPostData] = useState({
    img: "",
    title: "",
    description: "",
    slug: ""
  });

  const getData = async () => {
    try {
      let res = await axios.get(`${url}/get-best-places`);
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
    formData.append("file", value);

    try {
      const response = await axios.post(`${url}/add-img`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.filename;
    } catch (error) {
      console.error("Error uploading file:", error);
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
      const res = await axios.post(`${url}/add-best-places`, {
        ...postData,
        img: await handleGetImgURL(postData.img),
      });
      if (res.status === 200) {
        toastr.success("Successful Added");
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
      <BestplaceModal
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
                <h1>Best Places Add Form</h1>
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
                    <h5>Form To Add Best Places</h5>
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
                            <label htmlFor="exampleInputEmail1">Image</label>

                            <input
                              type="file"
                              className="form-control"
                              placeholder="Enter User Image Link"
                              name="img"
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
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Description
                            </label>

                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Description"
                              name="description"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Slug
                            </label>

                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Slug"
                              name="slug"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- /.card-body --> */}
                    <div className="card-footer">
                      <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
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
          <BestplaceTable
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

export default Bestplaces;
