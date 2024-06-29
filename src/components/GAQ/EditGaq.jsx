import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { addgaq, getgaqbypackage, loadsinglegaq, updategaq } from '../../redux/Slice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { AllPackages } from '../../redux/Slice'

//import sun editor
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const EditGaq = () => {


    const [short_description, setShort_description] = useState()
    let [input, setInput] = useState('')
    let [tab, setTab] = useState()
    let [maingaq, setMaingaq] = useState({ title: '', desc: '' })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { gaqid } = useParams()
    const { tab_index } = useParams()
    const { title_index } = useParams()

    // let decodedTitle = decodeURIComponent(title)

    const getGaq = async () => {


        const response = await dispatch(loadsinglegaq({ gaqid, tab_index, title_index }))
        console.log('some', (response.payload.singleGaq));
        setTab((response.payload.singleGaq.tab_name))
        response.payload.singleGaq.tab_details.map((x, index) => {
            if (index == title_index) {
                setMaingaq(x)
            }
        })
        return
    }

    useEffect(() => {
        getGaq()
    }, [])




    const handleChange = async (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('gaqid', gaqid)
        formData.append('tab_name', input.tab_name ? input.tab_name : tab)
        formData.append('title', input.title ? input.title : maingaq.title)
        formData.append('desc', input.desc ? input.desc : maingaq.desc)
        formData.append('tab_index', tab_index)
        formData.append('title_index', title_index)
        const response = await dispatch(updategaq(formData))
        if (response.payload.status == 1) {
            navigate('/gaqlist')
        }
    }
    // const { register, handleSubmit, reset, formState: { errors } } = useForm()
    // const handleError = (errors) => { }
    // const formOptions = {
    //     tab_name: {
    //         // required: {
    //         //     value: true,
    //         //     message: '*Please Enter Tab Name'
    //         // }
    //     },
    //     title: {
    //         // required: {
    //         //     value: true,
    //         //     message: '*Please Enter Title'
    //         // }
    //     },
    //     desc: {
    //         // required: {
    //         //     value: true,
    //         //     message: '*Please Enter Description'
    //         // }
    //     }
    // }



    const handleForm = async (input, e) => {
        console.log('input', input)
        // console.log('filter', filter);
        // e.preventDefault()
        // // let formData = new FormData()
        // // formData.append('title',input.title)
        // // formData.append('desc',input.desc)
        // // formData.append('slug',filter.slug)
        // // formData.append('tab_name',filter.tab_name)
        // let gaqObj = {
        //     title: input.title,
        //     desc: input.desc,
        //     slug: filter.slug,
        //     tab_name: filter.tab_name
        // }
        // let slug = filter.slug
        // const response = await dispatch(addgaq({ gaqObj }))
        // console.log('gaq tab', response.payload)
        // if (response.payload.status == 1) {
        //     navigate('/gaqlist')
        // }
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
                                <h1><b>GAQ UPDATION FORM</b></h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                                    <li className="breadcrumb-item "><Link to='/gaqlist'>GAQ List</Link></li>
                                    <li className="breadcrumb-item active">Edit GAQ</li>
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
                                        <h3 className="card-title">Form To Update New GAQ</h3>
                                    </div>
                                    {/* <!-- /.card-header --> */}
                                    {/* <!-- form start --> */}
                                    {tab && maingaq &&
                                        <form id="quickForm" onSubmit={handleSubmit}>
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Tab Name</label>
                                                    <input type="text" className="form-control"
                                                        placeholder="Enter Tab Name"
                                                        name='tab_name'
                                                        defaultValue={tab}
                                                        style={{ width: '517px' }}
                                                        onChange={handleChange} />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Title</label>
                                                    <input type="text" className="form-control"
                                                        placeholder="Enter Title"
                                                        style={{ width: '517px' }}
                                                        name='title'
                                                        defaultValue={maingaq.title}
                                                        onChange={handleChange} />

                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Description</label>
                                                    <input type="text" className="form-control"
                                                        placeholder="Enter Description"
                                                        
                                                        name='desc'
                                                        defaultValue={maingaq.desc}
                                                        onChange={handleChange} />

                                                </div>

                                            </div>
                                            {/* <!-- /.card-body --> */}
                                            <div className="card-footer">
                                                <button type="submit" className="btn btn-primary">Submit</button>

                                            </div>
                                        </form>
                                    }
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

export default EditGaq
