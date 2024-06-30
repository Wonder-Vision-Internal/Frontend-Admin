import axios from "axios";
import React from "react";
import Table from "react-bootstrap/Table";
const url = import.meta.env.VITE_BASE_API_URL;


function BestplaceTable({ setShow, setFormData, getDataapi, getData }) {
  const handleShow = (item) => {
    setShow(true);
    setFormData(item);
  };

  const handleDelete = async (value) => {
    try {
      let res = await axios.delete(
        `${url}/delete-best-places/${value}`
      );
      if (res.status === 200) {
        toastr.success("Successful Delete");
        await getData();
      }
    } catch (error) {
      console.log("Erorr", error);
      toastr.error("Something went wrong");
    }
  };


  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Image</th>
          <th>Title</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {getDataapi.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <img
                src={`${url}/${item.img}`}
                alt="Screen"
                style={{ width: "200px" }}
              />
            </td>
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td
              style={{
                display: "flex",
                justifyContent: "space-around",
                cursor: "pointer",
              }}
            >
              <div onClick={() => handleShow(item)}>
                <i className="fas fa-pen fas"></i>
              </div>
              <div>
                <i className="fas fa-trash" onClick={() => handleDelete(item._id)}></i>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default BestplaceTable;
