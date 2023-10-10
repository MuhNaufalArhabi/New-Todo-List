import vector1 from "../assets/vector1.png";
import vector2 from "../assets/vector2.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTodos, getAllCategory } from "../store/actions/actionCreator";
import Sidebar from "../components/Sidebar";
import TodoContent from "../components/TodoContent";

export default function HomePage() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  const newTodo = useSelector((state) => state.todo.newTodo);
  const categories = useSelector((state) => state.category.categories);
  const newCategory = useSelector((state) => state.category.newCategory);
  const deleteTodo = useSelector((state) => state.todo.deleteTodo);

  useEffect(() => {
    dispatch(getAllTodos());
    dispatch(getAllCategory());
  }, [newCategory, newTodo, dispatch]);

  useEffect(() => {
    dispatch(getAllTodos());
  }, [deleteTodo, dispatch]);

  return (
    <>
      <img
        className="background-home1"
        src={vector1}
        alt="vector"
      />
      <img
        className="background-home2"
        src={vector2}
        alt="vector"
      />
      <div className="container">
        <Sidebar categories={categories} />
        <TodoContent
          categories={categories}
          todos={todos}
        />
      </div>
    </>
  );
}
