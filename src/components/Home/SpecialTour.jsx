import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout";
import { useDispatch } from "react-redux";
import { getspecialtour } from "../../redux/Slice";

const SpecialTour = () => {
  const [tour, setTour] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  console.log('token',token);


  const fetchSpecialTour = async () => {
    const response = await dispatch(getspecialtour());
    console.log("special tour", response.payload);
      setTour(response.payload.specialData);
    return;
  };

  useEffect(() => {
    // if(!token){
    //   navigate('/')
    // }
    // else{
    //   getfounder();
    // }
    fetchSpecialTour()
  }, []);


  const handleDelete = async (fid) => {
      const response = await dispatch(deletefounder(fid))
      console.log('response.payload', response.payload)
      if (response.payload.status == 1) {
          setTimeout(() => { window.location.reload(false) }, 1000)

      }
  }


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
                {/* {token && ( */}
                <h1>SPECIAL TOUR</h1>
                {/* //  )}  */}
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Special Tour</li>
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
                
                  <div className="card-body">
                    {tour && (
                      <table
                        id="example1"
                        className="table table-bordered table-striped"
                      >
                        <thead>
                          <tr>
                            
                            <th>Link</th>
                            <th>Image</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr>   
                              <td>{tour.link}</td>
                              <td>
                                <img
                                  src={
                                    process.env.REACT_APP_BASE_IMG_URL +
                                    tour.featured_img
                                  }
                                  style={{ height: "150px", width: "200px" }}
                                />
                              </td>
                              <td style={{ width: "150px" }}>
                                <Link to={`/editspecialtour/${tour._id}`}>
                                  <i className="fas fa-pen fas"></i>
                                </Link>
                              </td>
                            </tr>
                          
                        </tbody>
                        <tfoot>
                          <tr>
                            <th>Link</th>
                            <th>Image</th>
                            <th>Actions</th>
                          </tr>
                        </tfoot>
                      </table>
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
export default SpecialTour;
