import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState({
    name: "",
    model: "",
    cc: 0,
    country: "",
  });

  const fetchData = () => {
    fetch("/api")
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      });
  };
  const createData = async () => {
    try {
      const response = await fetch("/api/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      const result = await response.text();
      console.log(result);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const updateData = async (id) => {
    const updatedData = {
      name: "Updated name",
      model: "Updated model",
      cc: 750,
      country: "updated country",
    };

    try {
      const response = await fetch(`/api/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const result = await response.text();
      console.log(result);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteData = async (id) => {
    try {
      const response = await fetch(`/api/delete/${id}`, {
        method: "DELETE",
      });
      const result = await response.text();
      console.log(result);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   fetch("/api")
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setData(result);
  //     });
  // }, []);
  return (
    <>
      <div className="card">
        <h1>Data from the database:</h1>
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              Name: {item.name}, Model: {item.model}, CC:{" "}
              {item.cc}, Country: {item.country}
              <button onClick={() => updateData(item.id)}>Update</button>
              <button onClick={() => deleteData(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="card">
        <h1>Create:</h1>
        <form>
          <label>
            Name:
            <input
              type="text"
              value={newData.name}
              onChange={(e) => setNewData({ ...newData, name: e.target.value })}
            />
          </label>
          {/* <label>
            Brand:
            <input
              type="text"
              value={newData.brand}
              onChange={(e) =>
                setNewData({ ...newData, brand: e.target.value })
              }
            />
          </label> */}
          <label>
            Model:
            <input
              type="text"
              value={newData.model}
              onChange={(e) =>
                setNewData({ ...newData, model: e.target.value })
              }
            />
          </label>
          <label>
            CC:
            <input
              type="number"
              value={newData.cc}
              onChange={(e) =>
                setNewData({ ...newData, cc: parseInt(e.target.value) })
              }
            />
          </label>
          <label>
            Country:
            <input
              type="text"
              value={newData.country}
              onChange={(e) =>
                setNewData({ ...newData, country: e.target.value })
              }
            />
          </label>
          <button type="button" onClick={createData}>
            Create
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
