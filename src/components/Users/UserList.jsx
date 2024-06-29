import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout";
import { useDispatch } from "react-redux";
import { getallusers } from "../../redux/Slice";
import ReactPaginate from "react-paginate";

const UserList = () => {
  const [user, setUser] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  let itemsPerPage = 15;
  const handlePageChange = ({ selected: pageIndex }) => {
    setCurrentPage(pageIndex + 1);
  };

  useEffect(()=>{
    getusers()
  },[currentPage])

  const getusers = async () => {
    const response = await dispatch(getallusers({ currentPage, itemsPerPage }));
    console.log("sfsf", response.payload);
    setUser(response.payload.allUsers)
    setTotalPages(response.payload.totalPages);
  };

  useEffect(() => {
    getusers()
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
                <h1>List of Registered Users</h1>
                {/* //  )}  */}
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Users</li>
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
                    {/* <div className="col-md-12">
                      <Link to="/addfounder" className="addition">
                        <button
                          type="button"
                          className="btn bg-gradient-primary"
                         
                        >
                          <i className="fas fa-plus"></i>&nbsp;NEW MEMBER
                        </button>
                      </Link>
                    </div> */}
                  </div>

                  <div className="card-body">
                    {user && (
                      <table
                        id="example1"
                        className="table table-bordered table-striped"
                      >
                        <thead>
                          <tr>
                            <th>Sl. No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Registered On</th>
                            {/* <th>Actions</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {user.map((data, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{data.name}</td>
                              <td>{data.mail}</td>
                              <td>
                                {data.created_at}
                              </td>
                              {/* <td style={{ width: "150px" }}>
                                <Link to={`/founder/editfounder/${data._id}`}>
                                  <i className="fas fa-pen fas"></i>
                                </Link>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <i
                                  className="fas fa-trash"
                                  onClick={() => handleDelete(data._id)}
                                ></i>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                
                              </td> */}
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <th>Sl. No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Registered On</th>
                            {/* <th>Actions</th> */}
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
        <div className="float-right">
          <ReactPaginate
            breakLabel="..."
            onPageChange={handlePageChange}
            // initialPage={0}
            //forcePage ={currentPage}
            pageRangeDisplayed={5}
            pageCount={totalPages && totalPages}
            previousLabel="<<Previous"
            nextLabel="Next>>"
            renderOnZeroPageCount={null}
            activeClassName={"active"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
          />
        </div>
      </div>
    </div>
  );
};
export default UserList;
