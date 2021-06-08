import '../AdminPage/AdminPage.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactHtmlParse from "react-html-parser";

function AdminPost(props) {

    const { token } = props

    const [postList, setPostList] = useState([]);

    const [pagination, setPagination] = useState({
        page: 0,
        size: 10
    })

    useEffect(() => {
        const getPostList = async () => {
            try {
                const res = await axios.get(`/post?page=${pagination.page}&size=${pagination.size}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                if (res) {
                    setPostList(res.data);
                    console.log(res);
                }
            } catch (error) {
                console.log(error);
            }
        }

        getPostList();
    }, [pagination])

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

    const elmPost = postList.map((post, index) => {
        console.log(post)
        return (
            <tr>
                <th scope="row">{index + 1 + (pagination.page * pagination.size)}</th>
                <td>{post.author ? post.author.name : "Chưa có"}</td>
                <td>{post.title.length > 40 ? ReactHtmlParse(post.title.slice(0, 40) + "...") : ReactHtmlParse(post.title)}</td>
                <td>{new Date(post.publishedDate).toLocaleString()}</td>
                <td className="text-center">{post.commentCount}</td>
                <td className="text-center">{post.bookmarkedCount}</td>
            </tr>
        )
    })

    return (
        <div class="AdminPost">
            <div class="right-panel">
                <div class="post-list">
                    <h2 class="list-name">Danh sách bài viết</h2>
                    <h5 class="web-name">LangThang.com</h5>
                    <hr></hr>
                    <div class="post-table">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Tác giả</th>
                                    <th scope="col">Tiêu đề</th>
                                    <th scope="col">Ngày viết</th>
                                    <th scope="col" className="text-center">Số comment</th>
                                    <th scope="col" className="text-center">Số bookmark</th>
                                </tr>
                            </thead>
                            <tbody>
                                {elmPost}
                            </tbody>
                        </table>
                    </div>

                </div>

                <div class="pagination">
                    <button class="btn btn-secondary mr-5" disabled={pagination.page === 0} onClick={onClickPrev}>
                        <i className="far fa-chevron-double-left mr-5"></i>
                        Prev
                    </button>
                    <button className="btn btn-secondary mr-5" disabled={true}>{pagination.page + 1}</button>
                    <button class="btn btn-secondary" disabled={postList.length < pagination.size} onClick={onClickNext}>
                        Next
                        <i className="far fa-chevron-double-right ml-5"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminPost;