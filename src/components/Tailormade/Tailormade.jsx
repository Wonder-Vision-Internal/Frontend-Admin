import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout";
import { useDispatch } from "react-redux";
import { get_tailormade } from "../../redux/Slice";

const Tailormade = () => {

    const [tailor, setTailor] = useState({featured_img:''})

    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const fetchTailormade = async () => {
        const response = await dispatch(get_tailormade());
        console.log("tailormade", response.payload.tailorData);
        setTailor(response.payload.tailorData);
        return;
    };

    useEffect(() => {
        fetchTailormade()
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
                                <h1>Tailormade</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item active">Tailormade</li>
                                     

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
                                    {
                                        tailor && tailor.video_link ? <Link to='/addtailormade/picture' className="addition"><button className='btn bg-gradient-primary'>ADD PICTURE</button></Link> 
                                        : <Link to='/addtailormade/video' className="addition"><button className='btn bg-gradient-primary'>ADD VIDEO</button></Link>
                                    }
                                    
                                    
                                  </div>
                                    {/* <!-- /.card-header --> */}


                                    <div className="card-body">
                                        {tailor && tailor.video_link ? 
                                            <table
                                                id="example1"
                                                className="table table-bordered table-striped">
                                                <thead>
                                                    <tr>
                                                        <th >Video</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr >
                                                        <td >
                                                            <p dangerouslySetInnerHTML={{ __html: tailor.video_link }}
                                                        ></p>
                                                           
                                                        </td>
                                                        <td>
                                                            <Link
                                                                to={`/tailormade/loadtailormade/video/${tailor._id}`}
                                                            >
                                                                <i className="fas fa-pen fas"></i>
                                                            </Link>
                                                        </td>
                                                    </tr>


                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th>Video</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </tfoot>
                                            </table> :
                                            <table
                                            id="example1"
                                            className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th >Picture</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr >
                                                    < td>
                                                    <img src={process.env.REACT_APP_BASE_IMG_URL + tailor.featured_img}
                                                                style={{ height: '150px', width: '200px' }} />
                                                       
                                                    </td>
                                                    <td>
                                                        <Link
                                                            to={`/tailormade/loadtailormade/picture/${tailor._id}`}
                                                        >
                                                            <i className="fas fa-pen fas"></i>
                                                        </Link>
                                                    </td>
                                                </tr>


                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th>Picture</th>
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
export default Tailormade;
