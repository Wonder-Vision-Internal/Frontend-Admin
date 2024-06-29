import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { deletepackagetab, get_tab_names, updatepackagetab } from '../../redux/Slice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
//import sun editor
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const EditPackageTab = () => {

    const [tab, setTab] = useState()
    const [detailsId,setDetailsId] = useState()
    const [input,setInput] = useState()    
    const [short_description, setShort_description] = useState()
    const [details, setDetails] = useState()
    const [filter, setFilter] = useState()
    let [index,setIndex] = useState()

    const { slug } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    

    const getTabNames = async () => {

        const response = await dispatch(get_tab_names(slug))
        console.log('tab names', response.payload)
        setTab(JSON.parse(response.payload.tabDetails.other_details))
        console.log('tab',JSON.parse(response.payload.tabDetails.other_details));
        setDetailsId(response.payload.tabDetails._id)
        return
    }

    useEffect(() => {
        getTabNames()
    }, [])

    const handleTab = (e) => {        
        setFilter(e.target.value)
        return
    }

    useEffect(() => {        
        loadDetails()
    }, [filter])

    const loadDetails = async () => {        
        {tab && tab.map((x,idx) => {            
            if( x.title === filter){
                console.log('x',x);            
                setDetails(x)                
                setIndex(idx)                
                return
            }           
        })}
    }
 

    const handleChange = (e) => {
        // setInput({ ...input, [e.target.name]: e.target.value })
        setDetails({...details,title:e.target.value})
    }


    const handleSubmit = async (e) => {
        e.preventDefault()        
        if(details.title.length != 0 && short_description.length != 0){            
        
       let formData = new FormData()
       
       formData.append('index',index)
       formData.append('detailsId',detailsId)
       formData.append('title',details.title)
       formData.append('content',short_description)

        const response = await dispatch(updatepackagetab(formData))
        //console.log('add', response.payload.status)
        if (response.payload.status == 1) {
            navigate('/packages')
        }
    }
    else{
        toastr.error('Field Cannot Be Left Blank')
        return
    }
    }

    const handleDelete = async() => {
        let val = await window.confirm('Do you want to delete this tab ?')
        console.log('val',val);
        if(val){
            let formData = new FormData()
            formData.append('index',index)
            formData.append('slug',slug)
            let res = await dispatch(deletepackagetab(formData))
            if(res.payload.status==1){
                navigate(-1)
            }
        }
        else{
            return 
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
                                <h1><b>PACKAGE TAB UPDATION FORM</b></h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                                    <li className="breadcrumb-item "><Link to='/packages'>Package List</Link></li>
                                    <li className="breadcrumb-item active">Edit Package Tab</li>
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
                                        <h3 className="card-title">Form To Update Package Tab</h3>
                                    </div>
                                    {/* <!-- /.card-header --> */}
                                    {/* <!-- form start --> */}
                                    {tab &&
                                        <div className="row" style={{
                                            marginLeft: '20px',
                                            marginTop: '10px',
                                            
                                        }}>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Choose Tab</label>
                                                    <select name='title' onChange={handleTab}
                                                        className="form-control select2" style={{ width: '100%' }}>
                                                        <option value="">Select Tab</option>
                                                        {tab && tab.map((data, index) => (
                                                            <option value={data.title} key={index}>{data.title}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-3"></div>
                                            {details && 
                                            <div className="col-md-4 d-flex justify-content-end align-items-center">
                                                <button className='btn btn-danger' onClick={handleDelete}>{details.title}&nbsp;&nbsp;
                                                <i className='fas fa-trash'></i></button>
                                            </div>}
                                        </div>}
                                        {details &&
                                    <form id="quickForm" onSubmit={handleSubmit}>
                                        
                                            <div className="card-body">
                                            <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Title</label>
                                                    <input type="text" className="form-control"
                                                        placeholder="Enter Title"
                                                        name='title'
                                                        value={details.title}                                                        
                                                        onChange={handleChange} />
                                                    {/* <p className='error'>{errors.title?.message}</p> */}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Description</label>
                                                    <SunEditor
                                                    height="500"
                                                    setDefaultStyle="font-size: 16px;"
                                                        onChange={(event) => setShort_description(event)}
                                                        setContents={details.content} />
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



export default EditPackageTab
