import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Layout from "../Layout";
import {
  AllPackages,
  addbooking,
  getAllHomeStay,
  getpricedetails,
} from "../../redux/Slice";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
//import sun editor
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const BookingForm = () => {
  const [homestay, setHomeStay] = useState();
  const [packages, setPackages] = useState();
  const [radio, setRadio] = useState();
  const [payment_mode, setPayment_mode] = useState('');
  const [priceDetails, setPriceDetails] = useState([]);
  const [price, setPrice] = useState(0);
  const [sharing, setSharing] = useState();
  const [total, setTotal] = useState();
  const [advance, setAdvance] = useState();
  const [index, setIndex] = useState(2);
  const [date, setDate] = useState([]);
  const [travelDate, setTravelDate] = useState();
  const [travellerDetails, setTravellerDetails] = useState([
    { name: "", age: "", gender: "" },
  ]);
  const [slug, setSlug] = useState();
  const [err, setErr] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleError = (errors) => {};
  const formOptions = {
    r1: {
      required: {
        value: true,
        message: "*Please Choose Homestay/Package",
      },
    },
    slug: {
      required: {
        value: true,
        message: "*Please Choose Location",
      },
    },
    name: {
      required: {
        value: true,
        message: "*Please Enter Name",
      },
    },
    phone: {
      required: {
        value: true,
        message: "*Please Enter Contact Number",
      },
    },
    mail: {
      required: {
        value: true,
        message: "*Please Enter Email ID",
      },
    },
    address: {
      required: {
        value: true,
        message: "*Please Enter Address",
      },
    },
    person: {
      required: {
        value: true,
        message: "*Please Enter Total Number of Persons",
      },
    },
    travellers: {
      required: {
        value: true,
        message: "*Please Add Atleast One traveller",
      },
    },
    check_in_date: {
      required: {
        value: true,
        message: "*Please Choose Check-In Date",
      },
    },
    check_out_date: {
      required: {
        value: true,
        message: "*Please Choose Check-Out Date",
      },
    },
    room_details: {
      required: {
        value: true,
        message: "*Please Enter Room Details",
      },
    },
    payment_mode: {
      required: {
        value: true,
        message: "*Please Choose Payment Mode",
      },
    },
    transactionId: {
      required: {
        value: true,
        message: "*Please Enter Transaction ID",
      },
    },
    amount: {
      required: {
        value: true,
        message: "*Please Enter Amount Paid",
      },
    },
  };

  const gethomestaynames = async () => {
    const response = await dispatch(getAllHomeStay());
    setHomeStay(response.payload.details);
    return;
  };

  const getPackages = async () => {
    const response = await dispatch(AllPackages());
    setPackages(response.payload.packages);
    return;
  };

  useEffect(() => {
    getPackages();
  }, []);
  const getDetails = async () => {
    const res = await dispatch(getpricedetails({ slug }));
    console.log('pr',res.payload);
    if(res.payload.priceDetails && res.payload.priceDetails[0] && res.payload.priceDetails[0].price ){
      setPriceDetails(res.payload.priceDetails);
      setPrice(Number(res.payload.priceDetails[0].price));
      priceCalc(1, res.payload.priceDetails[0].price);
    }
    else{
      setPriceDetails([]);
      setPrice(0);
    }
    if(res.payload.priceDetails && res.payload.priceDetails[0] && res.payload.priceDetails[0].price ){
      setSharing(res.payload.priceDetails[0].description);    
    }

    let str = await res.payload.date;
    if(str){
      setDate(str.split("&"));
      setTravelDate(str.split("&")[0]);
    }
    else{
      setDate([]);
      setTravelDate()
    }
  };

  useEffect(() => {
    if (slug) {
      getDetails();
    }
  }, [slug]);
  const handleRadio = (e) => {
    setRadio(e.target.value);
  };
  useEffect(() => {
    priceCalc(travellerDetails.length, price);
  }, [price, travellerDetails.length]);

  const priceCalc = (person, price) => {
    setTotal(price * person + 0.05 * price * travellerDetails.length);
  };

  function getAdvanceAmount() {
    let advance_amount =
      index == 2
        ? total
        : index == 1
        ? total * 0.5
        : index == 0
        ? total * 0.25
        : null;
    setAdvance(advance_amount);
  }

  useEffect(() => {
    getAdvanceAmount();
  }, [total, index]);
  const handlePayment = (e) => {
    setPayment_mode(e.target.value);
  };

  const handleAddPassenger = () => {
    setErr("");
    let len = travellerDetails.length;

    if (
      travellerDetails[len - 1].name === "" ||
      travellerDetails[len - 1].age === "" ||
      travellerDetails[len - 1].gender === ""
    ) {
      setErr("*Please Enter Details");
    } else {
      let newTraveller = [...travellerDetails];
      newTraveller.push({ name: "", age: "", gender: "" });
      setTravellerDetails([...newTraveller]);
    }
  };

  const handleTravellerChange = (e, index) => {
    setErr("");
    let { name, value } = e.target;
    if ((name === "name" || name === "gender") && /\d/.test(value)) {
      e.target.value = "";
      setErr("*Only alphabets are allowed");
      return;
    } else if (name === "age" && isNaN(value)) {
      e.target.value = "";
      setErr("*Only numbers are allowed");
      return;
    } else {
      let newTraveller = [...travellerDetails];
      if (name === "gender") {
        value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      }
      newTraveller[index][name] = value;
      setTravellerDetails(newTraveller);
    }
  };

  const handleDelete = async (index) => {
    if (travellerDetails.length == 1) {
      setErr("*Add at least one traveller");
    } else {
      const newTravellerDetails = await [...travellerDetails];
      newTravellerDetails.splice(index, 1);
      setTravellerDetails(newTravellerDetails);
      setErr("");
    }
  };

  const handleForm = async (data) => {
    console.log("data", data);
    const formData = new FormData();
    formData.append("slug", slug);
    formData.append("name", data.name);
    formData.append("mail", data.mail);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    formData.append("person", data.person);
    formData.append("payment_mode", payment_mode);
    formData.append("date", travelDate);
    formData.append("sharing", sharing);
    formData.append("travellers", JSON.stringify(travellerDetails));
    formData.append("amount", advance);
    formData.append("due", total - advance);
    formData.append(
      "transactionId",
      payment_mode === "online" ? data.transaction_id : ""
    );
    formData.append("gst_no", data.gst_no ? data.gst_no : "");
    formData.append("payment_status", data.payment_status);
    formData.append("emp_id", localStorage.getItem("userType"));

    const response = await dispatch(addbooking(formData));

    if (response.payload.status == 1) {
      console.log("points", response.payload);
      localStorage.setItem("points", response.payload.points);
      navigate("/bookings");
    }
  };
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
                  <b>BOOKING FORM</b>
                </h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/bookings">Booking List</Link>
                  </li>
                  <li className="breadcrumb-item active">Booking Form</li>
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
                    <h3 className="card-title">Form to Create New Booking</h3>
                  </div>
                  {/* <!-- /.card-header --> */}
                  {/* <!-- form start --> */}
                  <form
                    id="quickForm"
                    onSubmit={handleSubmit(handleForm, handleError)}
                  >
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-5">
                          <div className="form-group">
                            <label>Package</label>
                            <select
                              className="form-control "
                              style={{ width: "100%" }}
                              onChange={(e) => setSlug(e.target.value)}
                            >
                              <option value="">Choose Package</option>
                              {packages &&
                                packages.map((data, index) => (
                                  <option value={data.slug} key={index}>
                                    {data.title}
                                  </option>
                                ))}
                            </select>
                            <p className="error">{errors.slug?.message}</p>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Name</label>
                        <input
                          type="text"
                          className="form-control col-md-8"
                          placeholder="Enter the Name"
                          {...register("name", formOptions.name)}
                        />
                        <p className="error">{errors.name?.message}</p>
                      </div>
                      <div className="row">
                        <div className="form-group col-md-6">
                          <label htmlFor="exampleInputEmail1">Email ID</label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Email ID"
                            {...register("mail")}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="exampleInputEmail1">
                            Contact Number
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Contact Number"
                            {...register("phone", formOptions.phone)}
                          />
                          <p className="error">{errors.phone?.message}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 form-group">
                          <label htmlFor="exampleInputEmail1">Address</label>
                          <textarea
                            type="text"
                            style={{ height: "120px" }}
                            className="form-control"
                            placeholder="Enter Address"
                            {...register("address", formOptions.address)}
                          />
                          <p className="error">{errors.address?.message}</p>
                        </div>
                        <div className="col-md-2 form-group">
                          <label htmlFor="exampleInputEmail1">Head Count</label>
                          <input
                            type="Number"
                            className="form-control"
                            {...register("person", formOptions.person)}
                          />
                          <p className="error">{errors.person?.message}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          {priceDetails.length > 0 &&
                            priceDetails.map(
                              (x, idx) =>
                                x.description && (
                                  <div className="form-check-inline" key={idx}>
                                    <input
                                      type="radio"
                                      name="description"
                                      defaultChecked={idx == 0}
                                      onClick={() => {
                                        setSharing(x.description);
                                        setPrice(x.price);
                                      }}
                                    />
                                    &nbsp;{x.description}&nbsp;
                                  </div>
                                )
                            )}
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-md-12">
                          {date.length > 0 ?
                            date.map((x, index) => (
                              <div className="form-check-inline" key={index}>
                                <input
                                  type="radio"
                                  name="date"
                                  defaultChecked={index == 0}
                                  onClick={() => setTravelDate(x)}
                                />
                                &nbsp;{x}&nbsp;
                              </div>
                            )) : null} 
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12 form-group mt-2">
                          <label htmlFor="exampleInputEmail1">
                            Traveller Details
                          </label>
                          <hr />
                          {travellerDetails &&
                            travellerDetails.map((traveller, index) => (
                              <div
                                key={index}
                                className="d-flex justify-content-space-between align-items-center"
                              >
                                <div className="col-5">
                                  <label
                                    htmlFor={`travellerName${travellerDetails.length}`}
                                    className="form-label"
                                  >
                                    Traveller {index + 1}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    name="name"
                                    value={traveller.name}
                                    onChange={(e) =>
                                      handleTravellerChange(e, index)
                                    }
                                  />
                                </div>
                                <div className="col-2">
                                  <label
                                    htmlFor={`travellerName${travellerDetails.length}`}
                                    className="form-label"
                                  >
                                    Age
                                  </label>
                                  <input
                                    className="form-control"
                                    // placeholder="Age"
                                    name="age"
                                    value={traveller.age}
                                    onChange={(e) =>
                                      handleTravellerChange(e, index)
                                    }
                                  />
                                </div>
                                <div className="col-2">
                                  <label
                                    htmlFor={`travellerName${travellerDetails.length}`}
                                    className="form-label"
                                  >
                                    Gender
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    // placeholder="Gender"
                                    name="gender"
                                    value={traveller.gender}
                                    onChange={(e) =>
                                      handleTravellerChange(e, index)
                                    }
                                  />
                                </div>
                                <button
                                  className="btn btn-default mt-4 ml-3"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleDelete(index);
                                  }}
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                                {index == travellerDetails.length - 1 ? (
                                  <button
                                    type="button"
                                    className="btn btn-default mt-4 ml-2"
                                    onClick={handleAddPassenger}
                                  >
                                    <i class="fas fa-user-plus"></i>
                                  </button>
                                ) : null}
                              </div>
                            ))}
                          <p style={{ color: "red" }}>
                            {err !== "" ? err : null}
                          </p>
                        </div>
                      </div>

                      <div className="mt-2">
                        <label>Pay in Advance</label>
                        <hr />
                        <div className="col-md-12 form-check-inline">
                          <label
                            className="col-md-3"
                            onClick={() => {
                              setIndex(0);
                              setAdvance(total * 0.25);
                            }}
                          >
                            <input type="radio" name="payment" />
                            &nbsp;25%
                          </label>
                          <label
                            className="col-md-3"
                            onClick={() => {
                              setIndex(1);
                              setAdvance(total * 0.5);
                            }}
                          >
                            <input type="radio" name="payment" />
                            &nbsp;50%
                          </label>
                          <label
                            className="col-md-3"
                            onClick={() => {
                              setIndex(2);
                              setAdvance(total);
                            }}
                          >
                            <input
                              type="radio"
                              name="payment"
                              defaultChecked={true}
                            />
                            &nbsp;Full Payment
                          </label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <label>Price Details</label>
                          <hr />
                          <label htmlFor="">Price per Head</label>
                          <span className="ml-5">{price && price}</span>
                          <br />
                          <label htmlFor="">Sub Total</label>
                          <span className="ml-5">
                            {price && price * travellerDetails.length}
                          </span>
                          <br />
                          <label htmlFor="">5% GST</label>
                          <span className="ml-5">
                            {price && price * 0.05 * travellerDetails.length}
                          </span>
                          <br />
                          <label htmlFor="">Total</label>
                          <span className="ml-5">{total}</span>
                          <br />
                          <label htmlFor="">Advance</label>
                          <span className="ml-5">{advance}</span>
                          <br />
                          <label htmlFor="">Amount Due</label>
                          <span className="ml-5">{total - advance}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label htmlFor="">GST Number</label>
                          <input
                            type="text"
                            className="form-control mt-3  mb-3"
                            {...register("gst_no")}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group clearfix">
                            <div className="col-md-6 d-inline">
                              <input
                                type="radio"
                                id="radioPrimary1"
                                name="payment_mode"
                                // value="online"
                                onClick={() => setPayment_mode("online")}
                                {...register(
                                  "payment_mode",
                                  formOptions.payment_mode
                                )}
                              />
                              &nbsp;&nbsp;
                              <label htmlFor="radioPrimary1">
                                Online Payment
                              </label>
                            </div>
                            <div className="col-md-6 d-inline">
                              <input
                                type="radio"
                                id="radioPrimary1"
                                name="payment_mode"
                                value="offline"
                                onClick={() => setPayment_mode("offline")}
                                {...register("payment_mode")}
                              />
                              <label for="radioPrimary1">
                                &nbsp;&nbsp;Offline Payment
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      {errors.payment_mode && (
                        <p className="error">{errors.payment_mode.message}</p>
                      )}
                      {payment_mode === "online" ? (
                        <div className=" row form-group">
                          <div className="col-md-6">
                            <label htmlFor="">Transaction ID</label>
                            <input
                              type="text"
                              className="form-control"
                              {...register(
                                "transactionId",
                                formOptions.transactionId
                              )}
                            />
                            <p className="error">
                              {errors.transactionId?.message}
                            </p>
                          </div>
                          <div className="col-md-6">
                            <label className="ml-3">Payment Status</label><br />
                            <select
                              name=""
                              id="" className="ml-3"
                              {...register("payment_status")}
                            >
                              <option className="form-control" value="p">
                                Pending
                              </option>
                              <option value="c" className="form-control">
                                Completed
                              </option>
                            </select>
                            <p className="error">{errors.amount?.message}</p>
                          </div>
                        </div>
                      ) : payment_mode === "offline" ?
                      <div className="col-md-6">
                      <label>Payment Status</label>&nbsp;&nbsp;&nbsp;&nbsp;
                      <select
                        name=""
                        id=""
                        {...register("payment_status")}
                      >
                        <option className="form-control" value="p">
                          Pending
                        </option>
                        <option value="c" className="form-control">
                          Completed
                        </option>
                      </select>
                      <p className="error">{errors.amount?.message}</p>
                    </div> : null}
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
  );
};

export default BookingForm;
