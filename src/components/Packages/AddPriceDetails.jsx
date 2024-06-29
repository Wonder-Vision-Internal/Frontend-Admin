import React from 'react'
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Layout from '../Layout';
import { Link,useParams,useNavigate } from 'react-router-dom';
import { addpricedetails } from '../../redux/Slice';

const AddPriceDetails = () => {

    const dispatch = useDispatch()
    const {slug} = useParams()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
      const handleError = (errors) => { };
      const formOptions = {
        // description: {
        //   required: {
        //     value: true,
        //     message: '*Please Enter Description'
        //   }
        // },
        price: {
          required: {
            value: true,
            message: '*Please Enter Price'
          }
        }
      };

    const handleForm = async(data, e) => {
        e.preventDefault();
        console.log('data', data);
        let formData = new FormData();
        formData.append('slug',slug)
        formData.append('description', data.description ? data.description : '')
        formData.append('price', data.price)
        const res = await dispatch(addpricedetails(formData))
        if(res.payload.status == 1){
            navigate('/packages')
        }
    
      }


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
                    <h1>
                      <b>ADD PACKAGE PRICE DETAILS</b>
                    </h1>
                  </div>
                  <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item">
                        <Link to="/home">Home</Link>
                      </li>
                      <li className="breadcrumb-item ">
                        <Link to="/packages">Packages</Link>
                      </li>
                      <li className="breadcrumb-item active">  <Link to={`/packages/loadsinglepackage/${slug}`}>Edit Package</Link></li>
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
                          
                        </div>
                        {/* <!-- /.card-header --> */}
                        {/* <!-- form start --> */}
                        <form
                          id="quickForm"
                          onSubmit={handleSubmit(handleForm, handleError)}
                        >
                          <div className="card-body">
                          
    
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Description</label>
                              <input
                                                              
                                className="form-control"
                                placeholder="Enter the Price"
                                
                                {...register("description", formOptions.description)}
                              />
                              <p className="error">{errors.description?.message}</p>
                            </div>
    
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Price</label>
                              <input
                                type="number"
                                
                                className="form-control"
                                placeholder="Enter the Price"
                                
                                {...register("price", formOptions.price)}
                              />
                              <p className="error">{errors.price?.message}</p>
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
      )
  
}

export default AddPriceDetails
