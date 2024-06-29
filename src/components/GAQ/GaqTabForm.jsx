import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { addgaqtab, addstories, getAllHomeStay } from '../../redux/Slice'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { AllPackages } from '../../redux/Slice'

const GaqTabForm = () => {

    const [packageDetails, setPackageDetails] = useState([{}])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getPackages = async () => {
        const response = await dispatch(AllPackages())
        setPackageDetails(response.payload.packages)
        return
    }

    // console.log('package details', packageDetails)

    useEffect(() => {
        getPackages()
    }, [])

    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const handleError = (errors) => { }
    const formOptions = {
        slug: {
            required: {
                value: true,
                message: '*Please Choose Package'
            }
        },
        tab_name: {
            required: {
                value: true,
                message: '*Please Enter Tab Name'
            }
        }
    }

    const handleForm = async (input) => {
        console.log('input', input)

        const formData = new FormData()
        formData.append('slug',input.slug)
        formData.append('tab_name',input.tab_name)
        const response = await dispatch(addgaqtab(formData))
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
                                <h1><b>GAQ TAB CREATION FORM</b></h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                                    <li className="breadcrumb-item "><Link to='/gaqlist'>GAQ List</Link></li>
                                    <li className="breadcrumb-item active">Add GAQ Tab</li>
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
                                        <h3 className="card-title">Form To Create New GAQ Tab</h3>
                                    </div>
                                    {/* <!-- /.card-header --> */}
                                    {/* <!-- form start --> */}
                                    <form id="quickForm" onSubmit={handleSubmit(handleForm, handleError)}>
                                        <div className="card-body">

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Package</label>
                                                        <select className="form-control select2" style={{ width: '100%' }}
                                                            {...register('slug', formOptions.slug)} >
                                                            <option value=''>Select Package</option>
                                                            {packageDetails && packageDetails.map((data, index) => (
                                                                <option value={data.slug}>{data.title}</option>
                                                            ))}

                                                        </select>
                                                        <p className='error'>{errors.slug?.message}</p>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Tab Name</label>
                                                <input type="text" className="form-control"
                                                    placeholder="Enter Tab Name"
                                                    style={{width:'517px'}}
                                                    {...register('tab_name', formOptions.tab_name)} />
                                                <p className='error'>{errors.tab_name?.message}</p>
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

export default GaqTabForm
