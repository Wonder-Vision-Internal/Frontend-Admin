import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout";
import { useDispatch } from "react-redux";
import { deleteteblog, getallblogs } from "../../redux/Slice";

const BlogList = () => {

    const [blog,setBlog] = useState()

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getBlogs = async () => {
    const response = await dispatch(getallblogs());
    console.log("blogs", response.payload.allBlogs);
    setBlog(response.payload.allBlogs);
    return;
  };

  useEffect(() => {
    getBlogs();
  }, []);

  

 

  const handleDelete = async (blogId) => {
    const response = await dispatch(deleteteblog(blogId));
    console.log("response.payload", response.payload);
    if (response.payload.status == 1) {
      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
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
              <h3 >Blogs</h3>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Blog List</li>
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
                  <div className="card-header"> 
                  <Link to='/blogform'><button className='btn bg-gradient-primary addition'>NEW BLOG</button></Link>
                  </div>
                  {/* <!-- /.card-header --> */}
                
                  {blog && (
                    <div className="card-body">
                      <table
                        id="example1"
                        className="table table-bordered table-striped"
                      >
                        <thead>
                          <tr>
                            <th>Sl. No.</th>
                            <th>Title</th>
                            <th>Featured Image</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {blog.map((data, index) => (
                            <tr key={index}>
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
                                <Link
                                  to={`/loadsingleblog/${data._id}`}
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
                  )}
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
export default BlogList;
