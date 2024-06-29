import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout";
import { useDispatch } from "react-redux";
import { getintroduction } from "../../redux/Slice";

const Introduction = () => {

    const [intro, setIntro] = useState()

    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const fetchIntroduction = async () => {
        const response = await dispatch(getintroduction());
        console.log("home", response.payload.homeData);
        setIntro(response.payload.homeData);
        return;
    };

    useEffect(() => {
        fetchIntroduction()
    }, []);

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
                                <h1>Introduction</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item active">Introduction</li>
                                     

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
                                        {intro &&
                                            <table
                                                id="example1"
                                                className="table table-bordered table-striped"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th>Text</th>
                                                        <th >Video</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr >
                                                        <td>{intro.small_text}</td>
                                                        <td >
                                                            <p dangerouslySetInnerHTML={{ __html: intro.video_link }}
                                                        ></p>
                                                           
                                                        </td>
                                                        <td>
                                                            <Link
                                                                to={`/home/loadintroduction/${intro._id}`}
                                                            >
                                                                <i className="fas fa-pen fas"></i>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                <tfoot>
                                                    <tr>

                                                        <th>Text</th>
                                                        <th>Video</th>
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
export default Introduction;
