import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const url = import.meta.env.VITE_BASE_API_URL;


function CarouselModel({ setShow, show, formData, setFormData, getData }) {
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleGetImgURL = async (value) => {
    const formData = new FormData();
    formData.append("file", value);

    try {
      const response = await axios.post(`${url}/add-img`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.filename;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleUpdate = async () => {
    const { __v, ...formDataWithoutV } = formData;
    try {
      const res = await axios.post(
        `${url}/update-testimonials-crousel/${formData._id}`,
        {
          ...formDataWithoutV,
          userImg: `${import.meta.env.VITE_BASE_API_URL}/${await handleGetImgURL(formData.userImg)}`,
          screenImg: `${import.meta.env.VITE_BASE_API_URL}/${await handleGetImgURL(formData.screenImg)}`,
        }
      );
      if (res.status === 200) {
        toastr.success("Successful Update");
        await getData();
      }
    } catch (error) {
      console.log("Erorr", error);
      toastr.error("Something went wrong");
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="card card-primary">
                    <div className="card-header">
                      <h5>Edit Form</h5>
                    </div>
                    <div id="quickForm">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="userImg">User Image</label>
                              <input
                                type="file"
                                className="form-control"
                                name="userImg"
                                onChange={handleChange}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="screenImg">Screen Image</label>
                              <input
                                type="file"
                                className="form-control"
                                name="screenImg"
                                onChange={handleChange}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="userName">User Name</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter User Name"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="title">Title</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CarouselModel;
