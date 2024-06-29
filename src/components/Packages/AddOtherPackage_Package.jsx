import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import {
    AllPackages,    
  addotherpackage,
     
} from "../../redux/Slice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const AddOtherPackage_Package = () => {
  const [homestay, setHomeStay] = useState(); 
  const [packages, setPackages] = useState(); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleError = (errors) => {};

  const gethomestaynames = async () => {
    const response = await dispatch(getAllHomeStay());
    setHomeStay(response.payload.details);
    return;
  };

  useEffect(() => {
    gethomestaynames();
  }, []);

  const getpackagenames = async () => {
    const response = await dispatch(AllPackages())
    console.log('allpackages',response.payload);
    setPackages(response.payload.packages)
    return
}

useEffect(() => {
    getpackagenames()
}, [])

const formOptions = {
    main_slug:{
        required:{
            value:true,
            message:'*Please Choose Main Package'
        }       
    },
    other_slug:{
        required:{
            value:true,
            message:'*Please Choose Other Package'
        }
    }
}

const handleForm =async (data) => {
console.log('data',data);
const formData = new FormData()
formData.append('main_slug',data.main_slug)
formData.append('other_slug',data.other_slug)
const res = await dispatch(addotherpackage(formData))
console.log('r',res);
if(res.payload.status == 1){
    navigate('/package/otherpackages')    
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
                <h1>Add Other Package</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/package/otherpackages">Other Packages</Link>
                  </li>
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
                  <form action="" onSubmit={handleSubmit(handleForm,handleError)}>
                  <div
                    className="row"
                    style={{
                      marginLeft: "20px",
                      marginTop: "10px",
                    }}>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Choose Main Package</label>
                        <select
                          name="slug"                          
                          className="form-control select2"
                          style={{ width: "100%" }}
                          {...register('main_slug',formOptions.main_slug)}>
                            
                          <option value="">Select Package</option>
                          {packages &&
                            packages.map((data, index) => (
                              <option value={data.slug} key={index}>
                                {data.title}
                              </option>
                            ))}
                        </select>
                        <p className="error">{errors.main_slug?.message}</p>
                      </div>
                    </div>                   
                  </div>  
                  
                  <div
                    className="row"
                    style={{
                      marginLeft: "20px",
                      marginTop: "10px",
                    }}>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Choose Other Package</label>
                        <select
                          name="slug"                          
                          className="form-control select2"
                          style={{ width: "100%" }}
                          {...register('other_slug',formOptions.other_slug)}>
                            
                          <option value="">Select Package</option>
                          {packages &&
                            packages.map((data, index) => (
                              <option value={data.slug} key={index}>
                                {data.title}
                              </option>
                            ))}
                        </select>
                        <p className="error">{errors.other_slug?.message}</p>
                      </div>
                    </div>                   
                  </div>  
                 
                  <div className="row" 
                  style={{
                    marginLeft: "28px",
                    marginTop: "10px",
                  }}>
                    <button className="btn btn-primary" >Submit</button></div>                          
                  <br />
                  </form>
                 
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AddOtherPackage_Package;
