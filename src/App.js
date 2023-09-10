import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
  
const getLocalStorage = () =>{
  let list = localStorage.getItem('list')
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }
  return []
}


function App() {
  const [name, setName] = useState("");              // for forms
  const [list, setList] = useState(getLocalStorage());              //for displaying list
  const [isEditing, setIsEditing] = useState(false); //for editing the list
  const [editID, setEditID] = useState(null);        //editingId to see which item is edited
  const [alert, setAlert] = useState({
    show: false,                                     //for alert function & asking for the msg & type
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      //  display alert of item not added
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      // deal with edit

      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      )
      setName('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true,"success", "item changed")

    } else {
      //  show alert of item added
      showAlert(true, "success", "item added to the list");
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
      };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };

  const deleteItem = (id) => {
    showAlert(true, "danger", "item deleted");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  useEffect (() =>{
  localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && (
          <Alert type={alert.type} msg={alert.msg} removeItem={showAlert} />
        )}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            className="grocery"
            type="text"
            value={name}
            placeholder="e.g. eggs..."
            onChange={(e) => setName(e.target.value)}
          />

          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>

      {list.length > 0 && (
        <div className="grocery-container">
          <List
            items={list}
            deleteItem={deleteItem}
            editItem={editItem}
            list={list}
          />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
