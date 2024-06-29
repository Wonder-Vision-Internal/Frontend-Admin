import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout";
import { useDispatch } from "react-redux";
import {
  deletegallerypicture,
  deletestory,
  getAllHomeStay,
  getfilteredgallery,
} from "../../redux/Slice";

const HomeStayGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [homestay, setHomeStay] = useState([{}]);
  const [filter, setFilter] = useState({ slug: "" });
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const gethomestaynames = async () => {
    const response = await dispatch(getAllHomeStay());
    console.log("home stay names", response.payload.details);
    setHomeStay(response.payload.details);
    return;
  };

  useEffect(() => {
    gethomestaynames();
  }, []);

  const filtergallery = async () => {
    if (filter.slug) {
      const response = await dispatch(getfilteredgallery(filter.slug));
      setGallery(response.payload.galleryInfo[0].galleryDetails);
      setTitle(response.payload.galleryInfo[0].title);
      console.log("com", response.payload);
    } else {
      setGallery("");
    }
  };

  useEffect(() => {
    filtergallery();
  }, [filter]);

  const handleChange = async (e) => {
    await setFilter({ [e.target.name]: e.target.value });
  };

  const handleDelete = async (galid) => {
    console.log('gallery',gallery);
    const response = await dispatch(deletegallerypicture(galid));
    console.log("response.payload", response.payload);
    if (response.payload.status == 1) {
      setTimeout(() => {
        window.location.reload(false);
      }, 500);
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
                {title && <h1>Gallery of {title}</h1>}
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Home Stay Gallery</li>
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
                  {/* <div className="card-header"> */}
                  {/* <Button className='btn bg-gradient-primary' onClick={handleClick}>ADD PACKAGE</Button> */}
                  {/* <h3 className="card-title"></h3> */}
                  {/* </div> */}
                  {/* <!-- /.card-header --> */}
                  <div
                    className="row"
                    style={{
                      marginLeft: "20px",
                      marginTop: "10px",
                    }}
                  >
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Choose Home Stay</label>
                        <select
                          name="slug"
                          onChange={handleChange}
                          className="form-control select2"
                          style={{ width: "100%" }}
                        >
                          <option value="">Select Home Stay</option>
                          {homestay &&
                            homestay.map((data, index) => (
                              <option value={data.slug} key={index}>
                                {data.title}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <Link to="/gallery/homestaygalleryform">
                        <button
                          type="button"
                          className="btn bg-gradient-primary"
                          style={{ marginLeft: "450px", width: "200px" }}
                        >
                          <i className="fas fa-plus"></i>&nbsp;NEW GALLERY
                          PICTURE
                        </button>
                      </Link>
                    </div>
                  </div>
                  {gallery.length>0 ? (
                    <div className="card-body">
                      <table
                        id="example1"
                        className="table table-bordered table-striped"
                      >
                        <thead>
                          <tr>
                            <th>Sl. No.</th>
                            <th>Text</th>
                            <th >Image</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {gallery.map((data, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{data.text1}</td>

                              <td>
                                <img
                                  src={
                                    process.env.REACT_APP_BASE_IMG_URL +
                                    data.img
                                  }
                                  style={{ height: "150px", width: "200px" }}
                                />
                              </td>
                              <td>
                                <Link
                                  to={`/gallery/loadhomestaypackagegallery/${`home_stay`}/${data._id}`}
                                >
                                  <i className="fas fa-pen fas"></i>
                                </Link>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <i
                                  className="fas fa-trash"
                                  onClick={() => handleDelete(data._id)}
                                ></i>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <th>Sl. No.</th>
                            <th>Text</th>
                            <th>Image</th>
                            <th>Actions</th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  ):<h3 style={{textAlign:'center'}}>No Gallery Found</h3>
                  }
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
export default HomeStayGallery;
