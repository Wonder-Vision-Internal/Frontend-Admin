import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Layout from '../Layout'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AllPackages, addpackagetab } from '../../redux/Slice'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
//import sun editor
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const PackageTab = () => {

    const [packagenames,setPackageNames] = useState()
    const [short_description, setShort_description] = useState()
   
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { slug } = useParams()

    const getpackagenames = async () => {
        const response = await dispatch(AllPackages())
        setPackageNames(response.payload.packages)
        return
    }
useEffect(()=>{
    getpackagenames()
},[])
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const handleError = (errors) => { }
    const formOptions = {
        slug: {
            required: {
                value: true,
                message: '*Please Choose Package'
            }
        },
        title: {
            required: {
                value: true,
                message: '*Please Enter Name'
            }
        }
    }



    const handleForm = async (data, e) => {

        e.preventDefault()
        reset()
        console.log('slug',slug);
     
        console.log('data.slug',data.slug);
        let slug1 = slug ? slug : data.slug
        let formData = new FormData()
        formData.append('slug',slug1)
        formData.append('title',data.title)
        formData.append('content',short_description)
        
      
        if(slug1 == undefined){
            toastr.error('Please Select Package')
        }
        const response = await dispatch(addpackagetab( formData ))
        if(response.payload.status == 1){
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
                                <h1><b>CREATE PACKAGE TAB</b></h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                                    <li className="breadcrumb-item "><Link to='/packages'>Packages</Link></li>
                                    <li className="breadcrumb-item active">Add Package Tab</li>
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
                                        <h3 className="card-title">Form To Create A Package Tab</h3>
                                    </div>
                                    {/* <!-- /.card-header --> */}
                                    {/* <!-- form start --> */}
                                    <form id="quickForm" onSubmit={handleSubmit(handleForm, handleError)}>
                                        <div className="card-body">
                                            {!slug ? <div className='row'>
                                                <div className='col-md-4'>
                                              <div className="form-group">
                                              <label>Packages</label>
                                              <select className="form-control select2" style={{ width: '100%' }}
                                                  {...register('slug', formOptions.slug)}>
                                                  <option value=''>Choose Package</option>
                                                  {packagenames && packagenames.map((data, index) => (
                                                      <option value={data.slug} key={index}>{data.title}</option>
                                                  ))}
  
                                              </select>
                                              <p className='error'>{errors.slug?.message}</p>
                                          </div></div> </div>: null}
                                           
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Tab Name</label>
                                                <input type="text" name="title" className="form-control"
                                                    placeholder="Enter the Tab Name"
                                                    {...register('title', formOptions.title)} />
                                                <p className='error'>{errors.title?.message}</p>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Description</label>
                                                <SunEditor
                                                height="500"
                                                setDefaultStyle="font-size: 16px;"
                                                    onChange={(event) => setShort_description(event)}
                                                     />
                                                    
                                            </div>


                                        </div>
                                        {/* <!-- /.card-body --> */}
                                        <div className="card-footer">
                                            <button type="submit" className="btn btn-primary">Submit</button>
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

export default PackageTab
