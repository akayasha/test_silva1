import React, { useState, useEffect } from "react";
import axios from "axios";
import createData from "./create";
import readData from "./read";
import deleteData from "./delete";
import updateData from "./update";
import "./App.css";

const CrudTable = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [days, setDays] = useState("");
  const [activity, setActivity] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/data");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async () => {
    const newData = { id, days, activity };
    const createdItem = await createData(newData);
    if (createdItem) {
      setData([...data, createdItem]);
      setId("");
      setDays("");
      setActivity("");
    }
  };

  const handleRead = (id) => {
    readData(data, id);
  };

  const handleDelete = async (id) => {
    const deleted = await deleteData(id);
    if (deleted) {
      const updatedData = data.filter((item) => item.id !== id);
      setData(updatedData);
    }
  };

  const handleUpdate = async (id) => {
    const newData = { days, activity };
    const updated = await updateData(id, newData);
    if (updated) {
      const updatedData = data.map((item) => {
        if (item.id === id) {
          return { ...item, ...newData };
        }
        return item;
      });
      setData(updatedData);
      setId("");
      setDays("");
      setActivity("");
    }
  };

  return (
    <div className="crud-table">
    <h1>CRUD Table</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Days</th>
          <th>Activity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.days}</td>
            <td>{item.activity}</td>
            <td>
              <button onClick={() => handleRead(item.id)}>Read</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <h2>Create/Update Form</h2>
    <div className="form-group">
      <input
        type="text"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Days"
        value={days}
        onChange={(e) => setDays(e.target.value)}
      />
      <input
        type="text"
        placeholder="Activity"
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
      />
    </div>
    <div className="button-group">
      <button onClick={handleCreate}>Create</button>
      <button onClick={() => handleUpdate(id)}>Update</button>
    </div>
  </div>
);
};

export default CrudTable;