import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import {
  getAllHomeStay,  
  otherhomestays,
  deleteotherhomestay,
  AllPackages,
  otherpackages,
  deleteotherpackage,
} from "../../redux/Slice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const OtherPackage = () => {
  const [title,setTitle] = useState()
  const [homestay, setHomeStay] = useState(); 
  const [filter, setFilter] = useState({ slug: "" });
  const [packages, setPackages] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const gethomestaynames = async () => {
    const response = await dispatch(getAllHomeStay());
    setHomeStay(response.payload.details);
    return;
  };

  useEffect(() => {
    gethomestaynames();
  }, []);


  const filterOtherPackages = async () => {
    if (filter.slug) {
      console.log(("filter.slug", filter.slug));
      const response = await dispatch(otherpackages(filter.slug));
      console.log("other", response.payload);
      setPackages(response.payload.other.arr);
      setTitle(response.payload.other.title)
    }
  };

  useEffect(() => {
    filterOtherPackages();
  }, [filter]);

  const handleChange = async (e) => {
    await setFilter({ [e.target.name]: e.target.value });
  };
  const handleDelete = async (slug, index) => {
    const response = await dispatch(deleteotherpackage({ slug, index }));
    console.log("res", response);
    if (response.payload.status == 1) {
      filterOtherPackages()
    // window.location.reload
    }
  };
  
  return (
    <div>
      <Layout />
      {/* <!-- Content Wrapper. Contains page content --> */}
      <div className="content-wrapper">
        {/* <!-- Content Header (Page header) --> */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Other Packages {title && `of ${title}`} </h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>
                </ol>
              </div>
            </div>
          </div>
          {/* <!-- /.container-fluid --> */}
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div
                    className="row"
                    style={{
                      marginLeft: "20px",
                      marginTop: "10px",
                    }}
                  >
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Choose Homestay</label>
                        <select
                          name="slug"
                          onChange={handleChange}
                          className="form-control select2"
                          style={{ width: "100%" }}
                        >
                          <option value="">Select Homestay</option>
                          {homestay &&
                            homestay.map((data, index) => (
                              <option value={data.slug} key={index}>
                                {data.title}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-8 d-flex justify-content-end">
                      <Link to="/homestay/addotherpackage" className="addition">
                        <button
                          type="button"
                          className="btn bg-gradient-primary"
                        >
                          <i className="fas fa-plus"></i>&nbsp;ADD NEW
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="card-body">
                    {packages && packages.length > 0 ? (
                      <table
                        id="example1"
                        className="table table-bordered table-secondary"
                      >
                        <thead>
                          <tr>
                            <th>Sl. No.</th>
                            <th>Title</th>
                            <th>Featured Image</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        {packages.map((data, index) => (
                          <tbody key={index}>
                            <tr>
                              <td>{index + 1}</td>
                              <td>{data.title}</td>
                              <td>
                                <img
                                  src={
                                    process.env.REACT_APP_BASE_IMG_URL +
                                    data.featured_img
                                  }
                                  style={{ height: "150px", width: "200px" }}
                                />
                              </td>
                              <td>
                                <i
                                  className="fas fa-trash"
                                  onClick={() =>
                                    handleDelete(filter.slug, index)
                                  }
                                ></i>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              </td>
                            </tr>
                          </tbody>
                        ))}
                        <tfoot>
                          <tr>
                            <th>Sl. No.</th>
                            <th>Title</th>
                            <th>Featured Image</th>
                            <th>Actions</th>
                          </tr>
                        </tfoot>
                      </table>
                    ) : (
                      <h3>No Data Found</h3>
                    )}
                  </div>
                  {/* <!-- /.card-body --> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OtherPackage;
