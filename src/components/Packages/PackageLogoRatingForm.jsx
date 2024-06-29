import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { homestaylogoratinglist, AllPackages, updatehomestaylogorating, addhomepackagelogorating } from '../../redux/Slice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
//import sun editor
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const PackageLogoRatingForm = () => {


    const [mainText, setMainText] = useState({ score: '', text: '' })
    const [logoDetails, setLogoDetails] = useState({ text: '' })

    const [img, setImg] = useState()
    const [pic, setPic] = useState()
    const { type } = useParams()
    const { logoratingId } = useParams()
    const { slug } = useParams()
    const { index } = useParams()

    const [packages, setPackages] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getpackagenames = async () => {
        const response = await dispatch(AllPackages())
        console.log('allpackages', response.payload);
        setPackages(response.payload.packages)
        return
    }

    useEffect(() => {
        getpackagenames()
    }, [])

    const fetchLogoRating = async () => {
        console.log('type', type);
        const response = await dispatch(homestaylogoratinglist(slug))
        console.log('logo details', response.payload);
        setMainText(response.payload.expertFormData)
        // setLogoDetails(JSON.parse(response.payload.expertFormData.paragraph))
        JSON.parse(response.payload.expertFormData.paragraph).map((x, idx) => {
            if (idx == index) {
                setLogoDetails(x)
            }
        })
        // }
        // else {
        //     set('')
        // }
        console.log('maintext', mainText);
    }

    useEffect(() => {
        if (slug) {
            fetchLogoRating()
        }
    }, [])

    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const handleError = (errors) => { }
    const formOptions = {
        slug: {
            required: {
                value: true,
                message: '*Please Choose Home Stay Name'
            }
        },
        bottomText: {
            // required: {
            //     value: true,
            //     message: '*Please Enter Title'
            // }
        },
        text: {
            required: {
                value: true,
                message: '*Please Enter Description'
            }
        }
    }

    // const handleChange = (e)=>{
    //     setSlug({[e.target.name]:e.target.value})
    // }

    const handleImageUpload = (e) => {
        console.log('e', e.target);
        setImg(e.target.files[0].name)
        setPic(e.target.files[0])
    }
    const handleForm = async (input, e) => {
        e.preventDefault()
        reset()
        if (!logoratingId) {
            if (!input.slug) {
                toastr.error('Please Select HomeStay')
            }
        }

        console.log('input', input)

        const formData = new FormData()
        if (type === 'text') {
            formData.append('logoratingId', logoratingId)
            formData.append('bottomText', input.bottomText ? input.bottomText : mainText.text)
            formData.append('score', input.score ? input.score : mainText.score)
            formData.append('type', type)
            const response = await dispatch(updatehomestaylogorating(formData))
            console.log('add', response.payload.status)
            if (response.payload.status == 1) {
                navigate('/packagelogoratinglist')
            }
        }
        else if (type === 'logo') {
            formData.append('text', input.text ? input.text : mainText.text)
            formData.append('img', img)
            formData.append('pic', pic)
            formData.append('type', type)
            formData.append('index', index)
            formData.append('logoratingId', logoratingId)
            const response = await dispatch(updatehomestaylogorating(formData))
            console.log('add', response.payload.status)
            if (response.payload.status == 1) {
                navigate('/packagelogoratinglist')
            }
        }
        else {
            formData.append('slug', input.slug)
            formData.append('bottomText', input.bottomText)
            formData.append('score', input.score)
            formData.append('text', input.text)
            formData.append('img', img)
            formData.append('pic', pic)
            const response = await dispatch(addhomepackagelogorating(formData))
            console.log('add', response.payload.status)
            if (response.payload.status == 1) {
                navigate('/packagelogoratinglist')
            }
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
                                {
                                    logoratingId ? <h1><b>LOGO & RATING UPDATION FORM</b></h1>
                                        : <h1><b>LOGO & RATING INSERTION FORM</b></h1>
                                }
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                                    <li className="breadcrumb-item "><Link to='/packagelogoratinglist'>Logo Rating List</Link></li>
                                    {logoratingId ? <li className="breadcrumb-item active">Edit Logo & Rating</li>
                                    : <li className="breadcrumb-item active">Add Logo & Rating</li>}
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
                                        <h3 className="card-title">Form To Create New Logo Rating Document</h3>
                                    </div>
                                    {/* <!-- /.card-header --> */}
                                    {/* <!-- form start --> */}
                                    <form id="quickForm" onSubmit={handleSubmit(handleForm, handleError)}>
                                        <div className="card-body">
                                            {!logoratingId ?
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label>Packages</label>
                                                            <select className="form-control select2" style={{ width: '100%' }}
                                                                {...register('slug', formOptions.slug)}>
                                                                <option value=''>Choose package</option>
                                                                {packages && packages.map((data, index) => (
                                                                    <option value={data.slug} key={index}>{data.title}</option>
                                                                ))}

                                                            </select>
                                                            <p className='error'>{errors.slug?.message}</p>
                                                        </div>
                                                    </div>
                                                </div> : null}
                                            {type === 'text' ?
                                                <div>
                                                    <div className='row'>
                                                        <div className='col-md-2'>
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputEmail1">Rating</label>
                                                                <input type="number" step='0.01' className="form-control"
                                                                    defaultValue={mainText.score}
                                                                    {...register('score', formOptions.score)} />
                                                                {/* <p className='error'>{errors.bottomText?.message}</p> */}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Bottom Text</label>
                                                        <textarea type="text" className="form-control"
                                                            placeholder="Enter Bottom Text"
                                                            defaultValue={mainText.text}
                                                            {...register('bottomText', formOptions.bottomText)} />
                                                        {/* <p className='error'>{errors.bottomText?.message}</p> */}
                                                    </div>
                                                </div> :
                                                type === 'logo' ? null :
                                                    <div>
                                                        <div className='row'>
                                                            <div className='col-md-2'>
                                                                <div className="form-group">
                                                                    <label htmlFor="exampleInputEmail1">Rating</label>
                                                                    <input type="number" step='0.01' className="form-control"

                                                                        {...register('score', formOptions.score)} />
                                                                    {/* <p className='error'>{errors.bottomText?.message}</p> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputEmail1">Bottom Text</label>
                                                            <textarea type="text" className="form-control"
                                                                placeholder="Enter Bottom Text"
                                                                {...register('bottomText', formOptions.bottomText)} />
                                                            {/* <p className='error'>{errors.bottomText?.message}</p> */}
                                                        </div>
                                                    </div>
                                            }
                                            {type === 'logo' && logoratingId ?
                                                <div className='row'>
                                                    <div className='col-md-6'>
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputEmail1">Text</label>
                                                            <textarea type="text" className="form-control"
                                                                placeholder="Enter Description"
                                                                defaultValue={logoDetails.text}
                                                                {...register('text', formOptions.text)} />
                                                            <p className='error'>{errors.text?.message}</p>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputEmail1">Logo</label>
                                                            <input type="file" className="form-control"
                                                                placeholder="Enter Address"
                                                                name="img" onChange={handleImageUpload}

                                                            />
                                                            <p className='error'>{errors.img?.message}</p>
                                                        </div>

                                                    </div>
                                                </div>
                                                : !logoratingId ?
                                                    <div className='row'>
                                                        <div className='col-md-6'>
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputEmail1">Text</label>
                                                                <textarea type="text" className="form-control"
                                                                    placeholder="Enter Description"
                                                                    // defaultValue={logoDetails.text}
                                                                    {...register('text', formOptions.text)} />
                                                                <p className='error'>{errors.text?.message}</p>
                                                            </div>
                                                        </div>
                                                        <div className='col-md-6'>
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputEmail1">Logo</label>
                                                                <input type="file" className="form-control"
                                                                    placeholder="Enter Address"
                                                                    name="img" onChange={handleImageUpload}
                                                                />
                                                                <p className='error'>{errors.img?.message}</p>
                                                            </div>

                                                        </div>
                                                    </div> : null}
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



export default PackageLogoRatingForm
