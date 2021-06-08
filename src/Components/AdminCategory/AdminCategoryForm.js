import './AdminCategory.css';
import '../AdminPage/AdminPage.css';
import { Link, Redirect, useParams } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

function AdminCategoryForm(props) {
    const { isAdd, token } = props;
    const { id, name } = useParams();

    var initialState = ""
    if (!isAdd) {
        initialState = name
    }

    const [category, setCategory] = useState(initialState);
    const [redirect, setRedirect] = useState(false);

    const postNewCate = async (data) => {
        const res = await axios.post("/category", data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        if (res) {
            alert("Thêm mới thành công!")
        }
    }

    const updateCate = async (data) => {
        try {
            const res = await axios.put(`/category/${id}`, data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            if (res) {
                alert("Cập nhật thành công!")
            }
        } catch (error) {

        }

    }

    const onChange = (event) => {
        setCategory(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append("name", category)
        if (isAdd) {
            if (category === "") {
                alert("Bạn chưa nhập tên thể loại")
            } else {
                postNewCate(data)
                setRedirect(true)
            }

        }
        else {
            if (category === "") {
                alert("Bạn chưa nhập tên thể loại")
            } else {
                updateCate(data)
                setRedirect(true)

            }

        }

    }
    if (!redirect) {
        return (
            <div className="cate-form">
                <h1 className="form-title">{isAdd ? "Thêm mới" : "Sửa"}</h1>
                <form onSubmit={onSubmit} >
                    <div className="mb-3">
                        <label className="form-label">Tên thể loại</label>
                        <input type="text" className="form-control" name="category" value={category} onChange={onChange} />
                    </div>

                    <div className="cate-group-button">
                        <button className="btn btn-primary mr-5" type="submit">OK</button>
                        <Link to="/categories" className="btn btn-danger">Hủy</Link>
                    </div>
                </form>
            </div>
        )
    }
    else return <Redirect to="/categories" />
}

export default AdminCategoryForm;