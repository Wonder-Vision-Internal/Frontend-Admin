import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { gethomestaybyslug } from '../../redux/Slice'
import Layout from '../Layout'

const HomeStayDetails = () => {

const [homestay,setHomeStay] = useState({})

const {slug} = useParams()
const dispatch = useDispatch()

const gethomestay = async()=>{
const response = await dispatch(gethomestaybyslug(slug))
setHomeStay(response.payload.homeStayDetails)
console.log('response',response.payload);
}


useEffect(()=>{
    gethomestay()
},[])




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
                        {/* <h1>Package Details</h1> */}
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                            <li className="breadcrumb-item"><Link to='/homestaylist'>Home Stay List</Link></li>
                            <li className="breadcrumb-item active">Home Stay Details</li>
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
                            <div className="card-body">
                                <h3>{homestay && homestay.title}</h3>
                                <hr />
                                <p dangerouslySetInnerHTML={{ __html: homestay.content }}></p>
                                <h4 style={{marginTop:'35px'}}>Video</h4>
                                <hr />
                                <p dangerouslySetInnerHTML={{ __html: homestay.video_link }}></p>
                                <h4 style={{marginTop:'35px'}}>Main Image</h4>
                                <hr />
                                <img src={process.env.REACT_APP_BASE_IMG_URL + homestay.main_img}/>
                               
                                <h4 style={{marginTop:'35px'}}>Featured Image</h4>
                                <hr />
                                <img src={process.env.REACT_APP_BASE_IMG_URL + homestay.featured_img}/>
                            </div>
                        </div>
                        {/* <div className="card">
                            <div className="card-body">
                                <p dangerouslySetInnerHTML={{ __html: homestay?.content }}></p>
                            </div>
                        </div> */}
                        
                    </div>
                </div>
            </div>
        </section>
    </div>
</div>
  )
}

export default HomeStayDetails
