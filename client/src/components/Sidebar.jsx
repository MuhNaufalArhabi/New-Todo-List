import { createCategory } from "../store/actions/actionCreator";
import { useDispatch } from "react-redux";

export default function Sidebar({ categories }) {
  const dispatch = useDispatch();
  const handleAddCategory = (e) => {
    e.preventDefault();
    let element = document.getElementById("add-category");
    element.classList.remove("hidden");
    let btn = document.getElementById("btn-category");
    btn.classList.add("hidden");
  };

  const handleInputCategory = (e) => {
    let value = e.target.value;
    if (e.key === "Enter") {
      dispatch(createCategory(value));
      let element = document.getElementById("add-category");
      element.classList.add("hidden");
      let btn = document.getElementById("btn-category");
      btn.classList.remove("hidden");
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <div className="category active">All Tasks</div>
        {categories.length > 0 ? (
          categories.map((el) => {
            return (
              <div className="category" key={el.id}>
                {el.name}
              </div>
            );
          })
        ) : (
          <></>
        )}
        <div className="add-new-category" id="btn-category">
          <span onClick={handleAddCategory}>+ New Category</span>
        </div>
        <div className="category hidden" id="add-category">
          <div style={{ width: "144.89px" }}>
            <input id="category-input" type="text" placeholder="New Category" onKeyUp={handleInputCategory} />
          </div>
        </div>
      </div>
    </div>
  );
}
