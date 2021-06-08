import './AdminCategory.css';
import '../AdminPage/AdminPage.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminCategory(props) {

    const { token } = props;

    const [cateList, setCateList] = useState([]);

    const [pagination, setPagination] = useState({
        page: 1,
        size: 3
    })

    useEffect(() => {
        const getCateList = async () => {
            try {
                const res = await axios.get("/category", {
                    headers: { Authorization: `Bearer ${token}` }
                })
                if (res) {
                    setCateList(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        }

        getCateList();
    }, [])

    const onClickNext = () => {
        setPagination({
            ...pagination,
            page: pagination.page + 1
        })
    }

    const onClickPrev = () => {
        setPagination({
            ...pagination,
            page: pagination.page - 1
        })
    }

    const onDelete = (id) => {
        axios.delete(`/category/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
    }

    var tmpMaxPage = cateList.length / pagination.size;
    if ((cateList.length) % (pagination.size) !== 0) {
        tmpMaxPage = tmpMaxPage + 1
    }
    const maxPage = parseInt(tmpMaxPage);


    const elmCate = cateList.slice(pagination.size * (pagination.page - 1), pagination.size * (pagination.page - 1) + pagination.size).map((cate, index) => {
        var to = "/categoriesUpdate/" + String(cate.categoryId) + "/" + cate.categoryName;
        return (
            <tr>
                <th scope="row">{index + 1 + (pagination.page - 1) * pagination.size}</th>
                <td>{cate.categoryName}</td>
                <td className="text-center">{cate.postCount}</td>
                <td className="text-center">
                    <Link to={to} className="btn btn-warning">
                        <i className="fal fa-edit mr-5"></i>
                        Sửa
                    </Link>
                </td>
                <td className="text-center">
                    <button className="btn btn-danger" onClick={() => onDelete(cate.categoryId)}>
                        <i className="far fa-trash-alt mr-5"></i>
                        Xóa
                    </button>
                </td>
            </tr>
        )
    })

    return (
        <div class="">
            <div class="right-panel">
                <div class="post-list">
                    <h2 class="list-name">Danh sách thể loại</h2>
                    <h5 class="web-name">LangThang.com</h5>
                    <hr></hr>
                    <div class="post-table">
                        <Link to="/categoriesAdd" className="btn btn-primary right-align">
                            <i className="far fa-plus mr-5"></i>
                            Thêm mới
                        </Link>
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Tên thể loại</th>
                                    <th scope="col" className="text-center">Số lượng bài viết</th>
                                    <th scope="col" className="text-center">Sửa</th>
                                    <th scope="col" className="text-center">Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {elmCate}
                            </tbody>
                        </table>
                    </div>

                </div>

                <div class="pagination">
                    <button className="btn btn-secondary mr-5" disabled={pagination.page === 1} onClick={onClickPrev}>
                        <i className="far fa-chevron-double-left mr-5"></i>
                        Prev
                    </button>
                    <button className="btn btn-secondary mr-5" disabled={true}>{pagination.page}</button>
                    <button className="btn btn-secondary" disabled={pagination.page === maxPage} onClick={onClickNext}>
                        Next
                        <i className="far fa-chevron-double-right ml-5"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminCategory;