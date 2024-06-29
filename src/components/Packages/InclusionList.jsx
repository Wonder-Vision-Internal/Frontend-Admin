import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout";
import { useDispatch } from "react-redux";
import {
    AllPackages,
    deleteinclusion,
    inclusionlist,
} from "../../redux/Slice";

const InclusionList = () => {
    const [inclusion, setInclusion] = useState();
    const [packageDetails, setPackageDetails] = useState([{}])
    const [filter, setFilter] = useState({ slug: "" });
    const [title, setTitle] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getPackages = async () => {
        const response = await dispatch(AllPackages())
        setPackageDetails(response.payload.packages)
        return
    }

    // console.log('package details', packageDetails)

    useEffect(() => {
        getPackages()
    }, [])
    const getInclusionList = async () => {
        if (filter.slug) {
            const response = await dispatch(inclusionlist(filter.slug));
            setInclusion(response.payload.inclusionData[0].inclusionDetails);
            setTitle(response.payload.inclusionData[0].title);
            console.log("com", response.payload);
        } else {
            setInclusion("");
        }
    };

    useEffect(() => {
        getInclusionList();
    }, [filter]);

    const handleChange = async (e) => {
        await setFilter({ [e.target.name]: e.target.value });
    };

    const handleDelete = async (inclusionId) => {
        const response = await dispatch(deleteinclusion(inclusionId));
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
                                {title && <h1>Package Inclusions of {title}</h1>}
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item active">Package Inclusions</li>
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
                                                <label>Choose Package</label>
                                                <select
                                                    name="slug"
                                                    onChange={handleChange}
                                                    className="form-control select2"
                                                    style={{ width: "100%" }}
                                                >
                                                    <option value="">Select Package</option>
                                                    {packageDetails && packageDetails.map((data, index) => (
                                                        <option value={data.slug} key={index}>{data.title}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <Link to="/packageinclusionform">
                                                <button
                                                    type="button"
                                                    className="btn bg-gradient-primary"
                                                    style={{ marginLeft: "450px", width: "200px" }}
                                                >
                                                    <i className="fas fa-plus"></i>&nbsp;NEW INCLUSION ITEM
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                    {inclusion && (
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
                                                    {inclusion.map((data, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{data.text}</td>

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
                                                                    to={`/packages/editinclusion/${data._id}`}
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
export default InclusionList;
