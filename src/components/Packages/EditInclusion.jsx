import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { AllPackages, addinclusion, loadsingleinclusion, updateinclusion } from '../../redux/Slice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const EditInclusion = () => {

    const [inclusion, setInclusion] = useState({})
    const [img, setImg] = useState()
    const [pic, setPic] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { inclusionId } = useParams()

    const loadInclusion = async (req, res) => {
        const response = await dispatch(loadsingleinclusion(inclusionId))
        console.log('payload',response.payload);
        setInclusion(response.payload.inclusionData)
    }

    useEffect(() => {
        loadInclusion()
    }, [])

    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const handleError = (errors) => { }
    const formOptions = {

        text: {
            // required: {
            //     value: true,
            //     message: '*Please Enter Text'
            // }
        },
        img: {
            required: {
                value: true,
                message: '*Please Choose Image'
            }
        }
    }

    // const handleChange = (e)=>{
    //     setSlug({[e.target.name]:e.target.value})
    // }

    const handleImageUpload = (e) => {
        setImg(e.target.files[0].name) //for mongodb
        setPic(e.target.files[0])  //for storage
    }
    const handleForm = async (input, e) => {
        e.preventDefault()
        reset()
        console.log('pic', pic)
        const formData = new FormData()

        formData.append('inclusionId',inclusionId)
        formData.append('text', input.text ? input.text : inclusion.text)
        formData.append('img', img)
        formData.append('pic', pic)
        const response = await dispatch(updateinclusion(formData))
        console.log('add', response.payload.status)
        if (response.payload.status == 1) {
            navigate('/packageinclusionlist')
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
                                <h1><b>INCLUSION ITEM UPDATION FORM</b></h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                                    <li className="breadcrumb-item "><Link to='/packageinclusionlist'>Inclusion List</Link></li>
                                    <li className="breadcrumb-item active">Edit Inclusion</li>
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
                                        <h3 className="card-title">Form To Update Inclusion Item</h3>
                                    </div>
                                    {/* <!-- /.card-header --> */}
                                    {/* <!-- form start --> */}
                                    <form id="quickForm" onSubmit={handleSubmit(handleForm, handleError)}>
                                        <div className="card-body">

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Text </label>
                                                <input type="text" className="form-control"
                                                    placeholder="Enter Text"
                                                    defaultValue={inclusion.text}
                                                    {...register('text', formOptions.text)} />
                                                <p className='error'>{errors.text?.message}</p>
                                            </div>



                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Picture</label>
                                                        <input type="file" className="form-control"
                                                            placeholder="Choose Picture"
                                                            name="img" onChange={handleImageUpload}
                                                        />
                                                        <p className='error'>{errors.img?.message}</p>
                                                    </div>
                                                </div>


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



export default EditInclusion
