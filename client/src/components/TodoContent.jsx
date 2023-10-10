import { useState, useEffect } from "react";
import { createTodo, baseUrl } from "../store/actions/actionCreator";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import { deleteTodo } from "../store/actions/actionCreator";

export default function TodoContent({ todos, categories }) {
  const dispatch = useDispatch();
  const [formTodo, setFormTodo] = useState({
    name: "",
    categoryId: "",
  });

  useEffect(() => {
    for (let i in todos) {
      const box = document.getElementById(todos[i].id);
      if (todos[i].status) {
        box.classList.add("status-done");
      }
    }
  }, [todos]);

  const handleInputTodo = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newFormTodo = {
      ...formTodo,
    };
    newFormTodo[field] = value;
    setFormTodo(newFormTodo);
  };

  const submitTodo = (e) => {
    e.preventDefault();
    const element = document.getElementById("category-select");
    dispatch(createTodo(formTodo));
    setFormTodo({
      name: "",
      categoryId: "",
    });
    element.value = "";
  };

  const handleCloseInput = () => {
    let element = document.getElementById("add-category");
    element.classList.add("hidden");
    let btn = document.getElementById("btn-category");
    btn.classList.remove("hidden");
  };

  const updateTodo = async (e) => {
    await axios({
      method: "PATCH",
      url: baseUrl + "/todos/" + e.target.value,
      headers: {
        access_token: sessionStorage.access_token,
      },
      data: {
        status: e.target.checked,
      },
    });
    const label = document.getElementById(e.target.value);
    if (e.target.checked) {
      label.classList.add("status-done");
    } else {
      label.classList.remove("status-done");
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id))
  }
  return (
    <div className="main-content" onClick={handleCloseInput}>
      <h1>All Tasks</h1>
      <div className="form-task">
        <form onSubmit={submitTodo}>
          <input
            type="text"
            name="name"
            value={formTodo.name}
            onChange={handleInputTodo}
            placeholder="Add new task"
          />
          <select
            id="category-select"
            name="categoryId"
            defaultValue={formTodo.categoryId}
            onChange={handleInputTodo}>
            <option value="" disabled>
              Category
            </option>
            {categories.length > 0 ? (
              categories.map((el) => {
                return (
                  <option value={el.id} key={el.id}>
                    {el.name}
                  </option>
                );
              })
            ) : (
              <></>
            )}
          </select>
          <input type="submit" value="Submit" />
        </form>
        <div className="tasks">
          {todos.length > 0 ? (
            todos.map((el) => {
              return (
                <div className="sub-task" key={el.id}>
                  <input
                    className="todo-box"
                    type="checkbox"
                    name={el.name}
                    value={el.id}
                    onClick={updateTodo}
                    defaultChecked={el.status}
                  />
                  <label className="form-control" id={el.id}>
                    {el.name}
                  </label>
                  <span style={{ backgroundColor: el.Category.color }}>
                    {el.Category.name}
                  </span>
                  <button className="btn-delete" onClick={() => handleDelete(el.id)} value={el.id}><FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon></button>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
