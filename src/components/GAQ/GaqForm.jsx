import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { addgaq, getgaqbypackage} from '../../redux/Slice'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { AllPackages } from '../../redux/Slice'

const GaqForm = () => {

    let [packageDetails, setPackageDetails] = useState([{}])
    let [filter,setFilter] = useState({slug:''})
    let [tab,setTab] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getPackages = async () => {
        const response = await dispatch(AllPackages())
        setPackageDetails(response.payload.packages)
        return
    }

    const getTab = async () => {
        if(filter.slug){
            const response = await dispatch(getgaqbypackage(filter.slug))
            const convertedGaq = JSON.parse(response.payload.gaqData[0].gaqDetails[0].gaq_details)
            console.log('converted', convertedGaq);
            setTab(convertedGaq)
            return
        }
    }

    useEffect(() => {
        getPackages()
    }, [])

    useEffect(() => {
        console.log('filter',filter);
        getTab()
    }, [filter.slug])

    const handleChange = async(e)=>{
        setFilter({...filter,[e.target.name]:e.target.value})
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const handleError = (errors) => { }
    const formOptions = {
       
        
        title: {
            required: {
                value: true,
                message: '*Please Enter Title'
            }
        },
        desc: {
            required: {
                value: true,
                message: '*Please Enter Description'
            }
        }
    }



    const handleForm = async (input,e) => {
        console.log('input', input)
        console.log('filter',filter);
        e.preventDefault()
        let formData = new FormData()
        formData.append('title',input.title)
        formData.append('desc',input.desc)
        formData.append('slug',filter.slug)
        formData.append('tab_name',filter.tab_name)
      
        const response = await dispatch(addgaq(formData))
        console.log('gaq tab', response.payload)
        if (response.payload.status == 1) {
            navigate('/gaqlist')
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
                                <h1><b>GAQ CREATION FORM</b></h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                                    <li className="breadcrumb-item "><Link to='/gaqlist'>GAQ List</Link></li>
                                    <li className="breadcrumb-item active">Add GAQ</li>
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
                                        <h3 className="card-title">Form To Create New GAQ</h3>
                                    </div>
                                    {/* <!-- /.card-header --> */}
                                    {/* <!-- form start --> */}
                                    <form id="quickForm" onSubmit={handleSubmit(handleForm, handleError)}>
                                        <div className="card-body">

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Package</label>
                                                        <select className="form-control select2"
                                                        name='slug' 
                                                        onChange={handleChange}
                                                        style={{ width: '100%' }}
                                                      >
                                                            <option value=''>Select Package</option>
                                                            {packageDetails && packageDetails.map((data, index) => (
                                                                <option value={data.slug} key={index}>{data.title}</option>
                                                            ))}

                                                        </select>
                                                        <p className='error'>{errors.slug?.message}</p>
                                                    </div>

                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>GAQ Tab</label>
                                                        <select className="form-control select2"
                                                        name='tab_name' 
                                                        onChange={handleChange}
                                                        style={{ width: '100%' }}
                                                             >
                                                            <option value=''>Select GAQ Tab</option>
                                                            {tab && tab.map((data, index) => (
                                                                <option value={data.tab_name} key={index}>{data.tab_name}</option>
                                                            ))}

                                                        </select>
                                                        {/* <p className='error'>{errors.slug?.message}</p> */}
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Title</label>
                                                <input type="text" className="form-control"
                                                    placeholder="Enter Title"
                                                    style={{width:'517px'}}
                                              {...register('title',formOptions.title)}/>
                                                <p className='error'>{errors.title?.message}</p>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Description</label>
                                                <input type="text" className="form-control"
                                                    placeholder="Enter Description"
                                                    style={{width:'517px'}}
                                                    {...register('desc',formOptions.desc)}/>
                                                <p className='error'>{errors.desc?.message}</p>
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

export default GaqForm
