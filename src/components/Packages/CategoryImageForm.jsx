import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import {
  addbottombanner,
  getAllHomeStay,
  updatebottombanner,
  updatecategoryimage,
} from "../../redux/Slice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
//import sun editor
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const CategoryImageForm = () => {
  const { catImageId } = useParams();

  const [img, setImg] = useState();
  const [catPic, setCatPic] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleError = (errors) => {};
  const formOptions = {
    img: {
      required: {
        value: true,
        message: "*Please Choose Image",
      },
    },
  };

  const handleImageUpload = (e) => {
    setImg(e.target.files[0].name);
    setCatPic(e.target.files[0]);
  };
  const handleForm = async (input, e) => {
    e.preventDefault();
    reset();
    console.log("cat pic", catPic);
    const formData = new FormData();
    formData.append("img", img);
    formData.append("catPic", catPic);

    const response = await dispatch(
      updatecategoryimage({ formData, catImageId })
    );
    console.log("add", response.payload.status);
    if (response.payload.status == 1) {
      navigate("/packages/categoryimage");
    }
  };
  return (
    <div>
      <Layout />
      {/* <!-- Main content --> */}
      <div className="content-wrapper">
        {/* <!-- Content Header (Page header) --> */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>CATEGORY IMAGE UPDATION FORM</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              {/* <!-- left column --> */}
              <div className="col-md-12">
                {/* <!-- jquery validation --> */}
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">
                      Form To Update Category Image
                    </h3>
                  </div>
                  {/* <!-- /.card-header --> */}
                  {/* <!-- form start --> */}
                  <form
                    id="quickForm"
                    onSubmit={handleSubmit(handleForm, handleError)}
                  >
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Upload Image
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              placeholder="Enter Bottom Banner"
                              //   name="img"
                              onChange={handleImageUpload}
                            />
                            {/* <p className="error">{errors.img?.message}</p> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- /.card-body --> */}
                    <div className="card-footer">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
                {/* <!-- /.card --> */}
              </div>
              {/* <!--/.col (left) --> */}

              {/* <!--/.col (right) --> */}
            </div>
            {/* <!-- /.row --> */}
          </div>
          {/* <!-- /.container-fluid --> */}
        </section>
      </div>
    </div>
  );
};

export default CategoryImageForm;
