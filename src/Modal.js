import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPage, clearCurrent, editPage } from "./JS/actions/pageActions";

const Modal = ({ open, content, setStatutModal }) => {
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("");
  const [form, setForm] = useState("");
  const [link, setLink] = useState("");

  const dispatch = useDispatch();
  const pageToEdit = useSelector((state) => state.pageReducer.currentPage);

  useEffect(() => {
    if (pageToEdit) {
      setTitle(pageToEdit.title);
      setIcon(pageToEdit.icon);
      setColor(pageToEdit.color);
      setForm(pageToEdit.form);
      setLink(pageToEdit.link);
    }
  }, [pageToEdit]);

  const handleCancel = () => {
    dispatch(clearCurrent());
    setStatutModal(false);
  };

  const handleConfirm = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", title);
    data.append("file", icon);
    data.append("color", color);
    data.append("form", form);
    data.append("link", link);

    content === "Add"
      ? dispatch(addNewPage(data))
      : dispatch(editPage(pageToEdit._id, data));

    setTitle("");
    setIcon("");
    setColor("");
    setForm("");
    setLink("");

    setStatutModal(false);
  };

  return (
    <>
      <div className={open ? "confirm show" : "confirm"}>
        <div className="confirm-content">
          <h4>{content === "Add" ? "Add a new page" : "Update page"}</h4>
          <p>
            {content === "Add"
              ? "Please fill in this form to create an page."
              : "change this form to update the current page"}
          </p>

          <form>
            <label>
              <b>Title</b>
            </label>
            <input
              type="text"
              name="title"
              value={title || ""}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              required
            />
            <label>
              <b>Icon</b>
            </label>
            <input
              type="file"
              name="icon"
              file={icon || ""}
              onChange={(e) => setIcon(e.target.files[0])}
              required
            />
            <label>
              <b>Color</b>
            </label>
            <input
              type="text"
              name="color"
              value={color || ""}
              onChange={(e) => setColor(e.target.value)}
              placeholder="Enter color"
              required
            />
            <label>
              <b>Form</b>
            </label>
            <input
              type="text"
              name="form"
              value={form || ""}
              onChange={(e) => setForm(e.target.value)}
              placeholder="Enter form"
              required
            />
            {content === "Add" && (
              <>
                <label>
                  <b>Link</b>
                </label>
                <input
                  type="text"
                  name="link"
                  value={link || ""}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="Enter link"
                  required
                />
              </>
            )}
          </form>
        </div>

        <div className="confirm-btns">
          <button onClick={(e) => handleConfirm(e)}>
            {content === "Add" ? "Confirm" : "Save"}
          </button>
          <button onClick={() => handleCancel()}>Cancel</button>
        </div>
      </div>
      <div className="overlay" onClick={() => handleCancel()} />
    </>
  );
};

export default Modal;
