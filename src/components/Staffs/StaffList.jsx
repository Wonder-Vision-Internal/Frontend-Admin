import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout";
import { useDispatch } from "react-redux";
import { getallstaffs, searchbyempid } from "../../redux/Slice";
import ReactPaginate from "react-paginate";


const StaffsList = () => {

    const [staff, setStaff] = useState()
    const [search, setSearch] = useState({ item: '' })
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    let itemsPerPage = 10;
    const getStaffs = async () => {

        const response = await dispatch(getallstaffs({ currentPage, itemsPerPage }));
        console.log('staff',response.payload.staffData);
        setStaff(response.payload.staffData);
        setTotalPages(response.payload.totalPages);
        return;
    };

    useEffect(() => {
        getStaffs()
    }, [currentPage]);

    const searchEmployees = async () => {
        const response = await dispatch(searchbyempid(search.emp_id))
        setStaff(response.payload.staffData);
    }

    useEffect(() => {
        if (search.emp_id) {
            searchEmployees()
        }
    }, [search])

    useEffect(() => {
        getStaffs()
    }, [search.emp_id === ''])


    const handleClick = async (req, res) => {
        searchEmployees()
    }

    const handlePageChange = ({ selected: pageIndex }) => {
        setCurrentPage(pageIndex + 1);
    };


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
                                <h1>Staffs' List</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item active">Staffs' List</li>


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
                                    {/* <div className="card-header"> */}
                                    {/* <Button className='btn bg-gradient-primary' onClick={handleClick}>ADD PACKAGE</Button> */}
                                    {/* <h3 className="card-title"></h3> */}
                                    {/* </div> */}
                                    {/* <!-- /.card-header --> */}

                                    <div className="card-body">
                                        <div className="row">
                                            <div className="input-group col-md-4">
                                                {/* <!-- Date --> */}

                                            </div>
                                            <div className="input-group col-md-4">
                                                <div className="form-group">
                                                    <label>Search By Employee ID</label>
                                                    <div className="input-group">
                                                        <input type="search" name='emp_id' className="form-control form-control-md"
                                                            placeholder="Enter Employee ID"
                                                            onChange={async (e) => {
                                                                setSearch({ [e.target.name]: e.target.value })
                                                                console.log('search', search);
                                                            }} />
                                                        <div className="input-group-append">
                                                            <button type="submit" className="btn btn-md btn-default" onClick={handleClick}>
                                                                <i className="fa fa-search"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="input-group col-md-4">
                                                <div className="form-group">
                                                    <label ></label>
                                                    <div>
                                                        <Link to='/addstaff'>
                                                            <button className="btn btn-primary addition"
                                                                style={{ marginLeft: '200px' }}>ADD STAFF</button></Link>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        {staff &&
                                            <section className="content">
                                                <div className="container-fluid">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            {staff.map((data, index) => (
                                                                <div className="card" key={index}>
                                                                    <div className="card-body">
                                                                        <div style={{ float: "right" }}>
                                                                            <button type='button' className="btn btn-danger">Points : {data.points}</button>&nbsp;&nbsp;&nbsp;
                                                                            <Link to={`/permissions/${data.emp_id}`}>Set Permissions</Link>&nbsp;&nbsp;
                                                                            <Link
                                                                                to={`/editstaff/${data.emp_id}`}>
                                                                                <i className="fas fa-pen fas"></i>
                                                                            </Link>&nbsp;&nbsp;
                                                                            {/* <Link 
                                                                            to={`/about/loadvisionmission/${data.emp_id}`}
                                                                        >
                                                                            <i className="fas fa-trash"></i>
                                                                        </Link> */}
                                                                        </div>
                                                                        <b>Employee ID : </b>{data.emp_id}<br />
                                                                        <b>Name : </b>{data.name}<br />
                                                                        <b>Email ID : </b>{data.mail}<br />
                                                                        <b>Contact Number : </b>{data.phone}<br />
                                                                        <b>Address : </b>{data.address}<br />
                                                                        <b>User Type : </b>{data.user_type === 'sub-admin' ? 'Sub Admin' : null}<br />
                                                                        <b>Created On : </b>{data.created_at}<br />
                                                                        {data.updated_at ? <b>Updated On : </b> : null}{data.updated_at ? data.updated_at : null}<br />
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        }
                                        <div className="float-right">
                                            <ReactPaginate
                                                breakLabel="..."
                                                onPageChange={handlePageChange}
                                                // initialPage={0}
                                                //forcePage ={currentPage}
                                                pageRangeDisplayed={5}
                                                pageCount={totalPages && totalPages}
                                                previousLabel="<<Previous"
                                                nextLabel="Next>>"
                                                renderOnZeroPageCount={null}
                                                activeClassName={"active"}
                                                breakClassName={"page-item"}
                                                breakLinkClassName={"page-link"}
                                                containerClassName={"pagination"}
                                                pageClassName={"page-item"}
                                                pageLinkClassName={"page-link"}
                                                previousClassName={"page-item"}
                                                previousLinkClassName={"page-link"}
                                                nextClassName={"page-item"}
                                                nextLinkClassName={"page-link"}
                                            />
                                        </div>
                                    </div>


                                    {/* <!-- /.card-body --> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
export default StaffsList;
