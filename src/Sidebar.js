import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPage } from "./JS/actions/pageActions";
import Modal from "./Modal";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");

  const listOfPages = useSelector((state) => state.pageReducer.pages);

  const dispatch = useDispatch();

  const onDragStart = (event, nodeType, icon, color, form, link) => {
    event.dataTransfer.setData("application/reactflow/type", nodeType);
    event.dataTransfer.setData("application/reactflow/icon", icon);
    event.dataTransfer.setData("application/reactflow/color", color);
    event.dataTransfer.setData("application/reactflow/form", form);
    event.dataTransfer.setData("application/reactflow/link", link);
    event.dataTransfer.effectAllowed = "move";
  };

  const setStatutModal = () => {
    setOpen(false);
    setAction("");
  };

  const handleEdit = (id) => {
    dispatch(getCurrentPage(id));
  };

  return (
    <aside>
      <div className="description">Tools</div>

      {listOfPages.map((page) => (
        <div
          key={page._id}
          className="dndnode"
          onClick={() => {
            setOpen(true);
            setAction("Update");
            handleEdit(page._id);
          }}
          onDragStart={(event) =>
            onDragStart(
              event,
              "default",
              `${page.icon}`,
              `${page.color}`,
              `${page.form}`,
              `${page.link}`
            )
          }
          draggable
        >
          <img
            style={{
              height: "30px",
              width: "30px",
              objectFit: "contain",
              padding: "4px",
              background: page.color,
              borderRadius: page.form === "circular" ? "50%" : "4px",
            }}
            src={page.icon}
            alt=""
          />
        </div>
      ))}

      <button
        className="button"
        onClick={() => {
          setOpen(true);
          setAction("Add");
        }}
      >
        add new page
      </button>
      {open && (
        <Modal open={open} content={action} setStatutModal={setStatutModal} />
      )}
    </aside>
  );
};

export default Sidebar;
