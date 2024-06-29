import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout";
import { useDispatch } from "react-redux";
import { getvisionmission } from "../../redux/Slice";

const VisionMissionList = () => {

    const [about, setAbout] = useState()

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { title } = useParams()
    const fetchVisionMission = async () => {
        console.log(title);
        const response = await dispatch(getvisionmission(title));
        console.log("about", response.payload.aboutData);
        setAbout(response.payload.aboutData);
        return;
    };

    useEffect(() => {
        fetchVisionMission()
    }, [title]);

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
                                <h1>{title}</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>
                                    {title === 'Vision' ? <li className="breadcrumb-item active">Vision</li>
                                        : title === 'Mission' ? <li className="breadcrumb-item active">Mission</li> : null}

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
                                        {about &&
                                            <table
                                                id="example1"
                                                className="table table-bordered table-striped"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th>Text</th>
                                                        <th >Image</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr >
                                                        <td>{about.small_text}</td>
                                                        <td>
                                                            <img
                                                                src={
                                                                    process.env.REACT_APP_BASE_IMG_URL +
                                                                    about.featured_img
                                                                }
                                                                style={{ height: "150px", width: "200px" }}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Link
                                                                to={`/about/loadvisionmission/${title}`}
                                                            >
                                                                <i className="fas fa-pen fas"></i>
                                                            </Link>
                                                        </td>
                                                    </tr>


                                                </tbody>
                                                <tfoot>
                                                    <tr>

                                                        <th>Text</th>
                                                        <th>Image</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        }
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
export default VisionMissionList;
