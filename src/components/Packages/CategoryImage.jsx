import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout";
import { useDispatch } from "react-redux";
import { getcategoryimages } from "../../redux/Slice";

const CategoryImage = () => {

    const [categoryImage, setCategoryImage] = useState()

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const categoyImages = async () => {
        const response = await dispatch(getcategoryimages())
        console.log('sfsa', response.payload);
        setCategoryImage(response.payload.CategoryData)
    }

    useEffect(() => {
        categoyImages()
    }, [])



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
                                <h1>Category Images</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item active">Package Category</li>
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

                                    {categoryImage && (
                                        <div className="card-body">
                                            <table
                                                id="example1"
                                                className="table table-bordered table-striped"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th>Sl. No.</th>
                                                        {/* <th>Category Name</th> */}
                                                        <th >Image</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {categoryImage.map((data, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{index == 0 ? 'Incredible India'
                                                                : index == 1 ? 'Wild Africa'
                                                                    : index == 2 ? 'Beautiful Asia'
                                                                        : index == 3 ? 'Himalayan Adventure'
                                                                            : index == 4 ? 'Colorful Festival' : null}</td>
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
                                                                    to={`/packages/loadcategoryimage/${data._id}`}
                                                                >
                                                                    <i className="fas fa-pen fas"></i>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th>Sl. No.</th>
                                                        {/* <th>Text</th> */}
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
export default CategoryImage;
