import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout";
import { useDispatch } from "react-redux";
import { deletefounder, getfounderlist } from "../../redux/Slice";

const FounderList = () => {
  const [founder, setFounder] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  


  const getfounder = async () => {
    const response = await dispatch(getfounderlist());
    // console.log("sfsf", response.payload);
      setFounder(response.payload.list);
  };

  useEffect(() => {
    getfounder()
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
                <h1>List of Governing Members</h1>
                {/* //  )}  */}
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Founders</li>
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
                      // marginLeft: "20px",
                      marginTop: "10px",
                    }}
                  >
                    <div className="col-md-12">
                      <Link to="/addfounder" className="addition">
                        <button
                          type="button"
                          className="btn bg-gradient-primary"
                         
                        >
                          <i className="fas fa-plus"></i>&nbsp;NEW MEMBER
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="card-body">
                    {founder && (
                      <table
                        id="example1"
                        className="table table-bordered table-striped"
                      >
                        <thead>
                          <tr>
                            <th>Sl. No.</th>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Image</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {founder.map((data, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{data.name}</td>
                              <td>{data.desc}</td>
                              <td>
                                <img
                                  src={
                                    process.env.REACT_APP_BASE_IMG_URL +
                                    data.img
                                  }
                                  style={{ height: "150px", width: "200px" }}
                                />
                              </td>
                              <td style={{ width: "150px" }}>
                                <Link to={`/founder/editfounder/${data._id}`}>
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
                            <th>Name</th>
                            <th>Designation</th>
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
export default FounderList;
