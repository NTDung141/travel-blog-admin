import '../AdminPage/AdminPage.css';
import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminUser(props) {
    const { token } = props

    const [userList, setUserList] = useState([]);

    const [pagination, setPagination] = useState({
        page: 1,
        size: 3
    })

    useEffect(() => {
        const getUserList = async () => {
            try {
                const res = await axios.get("/system/users", {
                    headers: { Authorization: `Bearer ${token}` }
                })
                if (res) {
                    setUserList(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getUserList();
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

    const onToAdmin = (user) => {
        const id = String(user.accountId)
        console.log(id)
        const toAdmin = async () => {
            try {
                const res = await axios.put(`/user/${id}/admin`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                console.log(res)
            } catch (error) {
                console.log(error);
            }
        }
        toAdmin();
    }

    var tmpMaxPage = userList.length / pagination.size;
    if ((userList.length) % (pagination.size) !== 0) {
        tmpMaxPage = tmpMaxPage + 1
    }
    const maxPage = parseInt(tmpMaxPage);

    const elmUser = userList.slice(pagination.size * (pagination.page - 1), pagination.size * (pagination.page - 1) + pagination.size).map((user, index) => {
        return (
            <tr>
                <th scope="row">{index + 1 + (pagination.page - 1) * pagination.size}</th>
                <td className="">
                    <div className="user-avatar" style={{ backgroundImage: `url(${user.avatarLink})` }}></div>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="text-center">{user.postCount}</td>
                <td className="text-center">{user.commentOnOwnPostCount}</td>
                <td className="text-center">{user.bookmarkOnOwnPostCount}</td>
                <td className="text-center">{user.followCount}</td>
                <td className="text-center">{user.role ? "Admin" : "User"}</td>
                <td>
                    <button className={user.role ? "btn btn-secondary" : "btn btn-primary"}
                        disabled={user.role}
                        onClick={() => onToAdmin(user)} >
                        {user.role ? "Admin" : "To Admin"}
                    </button>
                </td>
            </tr>
        )
    })

    return (
        <div className="AdminUser">
            <div className="right-panel">
                <div className="post-list">
                    <h2 className="list-name">Danh sách người dùng</h2>
                    <h5 className="web-name">LangThang.com</h5>
                    <hr></hr>
                    <div className="post-table">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col" className="text-center">#</th>
                                    <th scope="col" className="text-center">Người dùng</th>
                                    <th scope="col">Tên</th>
                                    <th scope="col">Email</th>
                                    <th scope="col" className="text-center">Số bài viêt</th>
                                    <th scope="col" className="text-center">Số comment</th>
                                    <th scope="col" className="text-center">Số bookmark</th>
                                    <th scope="col" className="text-center">Số follow</th>
                                    <th scope="col" className="text-center">Quyền hạn</th>
                                    <th scope="col" className="text-center">Admin</th>
                                </tr>
                            </thead>
                            <tbody>
                                {elmUser}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="pagination">
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

export default AdminUser;