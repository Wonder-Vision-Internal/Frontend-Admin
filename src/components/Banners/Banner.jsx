import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout";
import { useDispatch } from "react-redux";
import { deletebanner, getbannerbypage, getblogsbanner, gethomestaybanner } from "../../redux/Slice";

const Banner = () => {
  // const [stories, setStories] = useState(
  //     [{
  //     }])
  const [mainBanner, setMainBanner] = useState([
    {
      text1: "",
      text2: "",
      img: "",
    },
  ]);
  const [hsbanner, setHsbanner] = useState();
  const [innerbanner, setInnerbanner] = useState([]); //for packages

  const [filter, setFilter] = useState({ package_category: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { page_name } = useParams();

  console.log("page name", page_name);

  const getmainbanner = async () => {
    const response = await dispatch(getbannerbypage(page_name));
    console.log("sfsf", response.payload);
    setMainBanner(response.payload.bannerDetails);
    return;
  };

  useEffect(() => {
    if (page_name !== "packages") {
      setInnerbanner("");
      getmainbanner();
    } else if (page_name === "packages") {
      setMainBanner("");
    }
  }, [page_name]);

  const getHomeStayBanner = async () => {
    const response = await dispatch(gethomestaybanner());
    console.log("home stay banner", response.payload);
    setHsbanner(response.payload.bannerData);
  };

  const getBlogsBanner = async () => {
    const response = await dispatch(getblogsbanner());
    console.log("home stay banner", response.payload);
    setHsbanner(response.payload.bannerData);
  };
  useEffect(() => {
    if (page_name === "homestay") {
      getHomeStayBanner();
    }
    else if (page_name === "blogs") {
      getBlogsBanner();
    }
    else {
      setHsbanner("");
    }
  }, [page_name]);

  const getBannerBycategory = async (cat) => {

    const response = await dispatch(getbannerbypage(cat));
    console.log("sfsf", response.payload);

    setMainBanner(response.payload.bannerDetails[0].outsideBanner);
    setInnerbanner(response.payload.bannerDetails);

    return;
  };
  useEffect(() => {
    if (filter.package_category) {
      getBannerBycategory(filter.package_category);
    }
  }, [filter]);

  const handleChange = async (e) => {
    await setFilter({ [e.target.name]: e.target.value });
  };

  const handleDelete = async (bannerid) => {
    const response = await dispatch(deletebanner(bannerid))
    console.log('response.payload', response.payload)
    if (response.payload.status == 1) {
      navigate(`/banner/${page_name}`)
      // setTimeout(() => { window.location.reload(false) }, 1000)

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
                {/* {hsname && ( */}
                <h1>Banner of {page_name}</h1>
                {/* // )} */}
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Banner</li>
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
                      {page_name === "packages" ? (
                        <div className="form-group">
                          <label>Choose Package Category</label>
                          <select
                            name="package_category"
                            onChange={handleChange}
                            className="form-control select2"
                            style={{ width: "100%" }}
                          >
                            <option value="">Select Package Category</option>
                            <option value="incredible_india">
                              Incredible India
                            </option>
                            <option value="wild_africa">Wild Africa</option>
                            <option value="beautiful_asia">
                              Beautiful Asia
                            </option>
                            <option value="adventure_himalayas">
                              Himalayan Adventure
                            </option>
                            <option value="colorful_festival">
                              Colorful Festival
                            </option>
                          </select>
                        </div>
                      ) : null}
                    </div>
                    {page_name === "packages" ? (
                     
                        <div className="col-md-12 d-flex justify-content-end">
                          <Link to={`/banner/addbanner/${page_name}`} className="addition">
                            <button
                              type="button"
                              className="btn bg-gradient-primary"
                              
                            >
                              <i className="fas fa-plus"></i>&nbsp;CATEGORY BANNER
                            </button>
                          </Link>
                       
                          <Link to={`/banner/addsub-banner/${page_name}`} className="addition">
                            <button
                              type="button"
                              className="btn bg-gradient-primary"
                              
                            >
                              <i className="fas fa-plus"></i>&nbsp;PACKAGE BANNER
                            </button>
                          </Link>
                        </div>
                     
                    ) : page_name === "homestay" ? (
                    
                        <div className="col-md-12 d-flex justify-content-end">
                          <Link to={`/banner/addbanner/${page_name}`} className="addition">
                            <button
                              type="button"
                              className="btn bg-gradient-primary"
                            >
                              <i className="fas fa-plus"></i>&nbsp;MAIN BANNER
                            </button>
                          </Link>
                 
                          <Link to={`/banner/addsub-banner/${page_name}`} className="addition">
                            <button
                              type="button"
                              className="btn bg-gradient-primary"
                            >
                              <i className="fas fa-plus"></i>&nbsp;HOMESTAY
                              BANNER
                            </button>
                          </Link>
                        </div>
                   
                    ) :
                      page_name === "blogs" ? (
                       
                          <div className="col-md-12 d-flex justify-content-end">
                            <Link to={`/banner/addbanner/${page_name}`} className="addition">
                              <button
                                type="button"
                                className="btn bg-gradient-primary"
                                
                              >
                                <i className="fas fa-plus"></i>&nbsp;MAIN BANNER
                              </button>
                            </Link>
                         
                            <Link to={`/banner/addsub-banner/${page_name}`} className="addition">
                              <button
                                type="button"
                                className="btn bg-gradient-primary"
                                
                              >
                                <i className="fas fa-plus"></i>&nbsp;BLOG BANNER
                              </button>
                            </Link>
                          </div>
                       
                      ) :

                        (
                          <div className="col-md-12 d-flex justify-content-end">
                            <Link to={`/banner/addbanner/${page_name}`} className="addition">
                              <button
                                type="button"
                                className="btn bg-gradient-primary"
                                style={{ marginLeft: "550px" }}
                              >
                                <i className="fas fa-plus"></i>&nbsp;NEW BANNER
                              </button>
                            </Link>
                          </div>
                        )}
                  </div>
                 
                  <div className="card-body">
                  {mainBanner && <h3>Main Banner</h3>}
                    {mainBanner &&  (
                      <table
                        id="example1"
                        className="table table-bordered table-striped"
                      >
                        <thead>
                          <tr>
                            <th>Sl. No.</th>
                            <th>Text 1</th>
                            <th>Text 2</th>
                            <th>Image</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mainBanner.map((data, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{data.text1}</td>
                              <td>{data.text2}</td>

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
                                <Link to={`/banner/loadsinglebanner/${data._id}`}>
                                  <i className="fas fa-pen fas"></i>
                                </Link>
                                
                                {/* <i
                                  className="fas fa-trash"
                                  onClick={() => handleDelete(data._id)}
                                ></i> */}
                                

                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>

                  <div className="card-body">
                  {hsbanner && <h3>Inside Banner</h3>}
                    {hsbanner && (
                      <table
                        id="example1"
                        className="table table-bordered table-striped"
                      >
                        <thead>
                          <tr>
                            <th>Sl. No.</th>
                            <th>Title</th>
                            <th>Text 1</th>
                            <th>Text 2</th>
                            <th>Image</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {hsbanner.map((data, index) =>
                            data.bannerDetails.map((x) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.title}</td>
                                <td>{x.text1}</td>
                                <td>{x.text2}</td>
                                <td>
                                  <img
                                    src={
                                      process.env.REACT_APP_BASE_IMG_URL + x.img
                                    }
                                    style={{ height: "150px", width: "200px" }}
                                  />
                                </td>
                                <td style={{ width: "150px" }}>
                                  <Link
                                    to={`/banner/loadsinglebanner/${x._id}`}
                                  >
                                    <i className="fas fa-pen fas"></i>
                                  </Link>
                                  
                                  {/* <i
                                    className="fas fa-trash"
                                    onClick={() => handleDelete(x._id)}
                                  ></i> */}
                                  
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                        <tfoot>
                          <tr>
                            <th>Sl. No.</th>
                            <th>Title</th>
                            <th>Text 1</th>
                            <th>Text 2</th>
                            <th>Image</th>
                            <th>Actions</th>
                          </tr>
                        </tfoot>
                      </table>
                    )}
                  </div>

                  <div className="card-body">
                  {innerbanner && <h3>Inside Banner</h3>}
                    {innerbanner && (
                      <table
                        id="example1"
                        className="table table-bordered table-striped"
                      >
                        <thead>
                          <tr>
                            <th>Sl. No.</th>
                            <th>Title</th>
                            <th>Text 1</th>
                            <th>Text 2</th>
                            <th>Image</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {innerbanner.map((data, index) =>
                            data.packageBanner.map((x) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <tr>{data.title}</tr>
                                <td>{x.text1}</td>
                                <td>{x.text2}</td>

                                <td>
                                  <img
                                    src={
                                      process.env.REACT_APP_BASE_IMG_URL + x.img
                                    }
                                    style={{ height: "150px", width: "200px" }}
                                  />
                                </td>
                                <td style={{ width: "150px" }}>
                                  <Link
                                    to={`/banner/loadsinglebanner/${x._id}`}
                                  >
                                    <i className="fas fa-pen fas"></i>
                                  </Link>
                                  
                                  {/* <i className="fas fa-trash"
                                    onClick={() => handleDelete(x._id)}
                                  ></i> */}
                                  
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                        <tfoot>
                          <tr>
                            <th>Sl. No.</th>
                            <th>Title</th>
                            <th>Text 1</th>
                            <th>Text 2</th>
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
export default Banner;
