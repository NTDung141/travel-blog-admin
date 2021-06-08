import React, { useEffect, useState } from "react";
import './Menu.css';
import '../AdminPage/AdminPage.css';
import {
    Route,
    NavLink
} from "react-router-dom";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";

const menu = [
    {
        name: "Dash Board",
        to: "/dashboard",
        exact: true
    },
    {
        name: "Bài viết",
        to: "/posts",
        exact: true
    },
    {
        name: "Thể loại",
        to: "/categories",
        exact: true
    },
    {
        name: "Người dùng",
        to: "/users",
        exact: true
    },
    {
        name: "Report",
        to: "/reports",
        exact: true
    }
]

const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
    return (
        <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => {
            var active = match ? "nav-item active" : "nav-item";
            return (
                <li className={active}>
                    <NavLink to={to} className="nav-link">
                        {label}
                    </NavLink>
                </li>
            )
        }} />
    );
}

const showMenu = (menu) => {
    var result = null;
    if (menu.length > 0) {
        result = menu.map((item, index) => {
            return (
                <MenuLink label={item.name} to={item.to} activeOnlyWhenExact={item.exact} />
            )
        })
    }
    return result;
}

function Menu() {
    /* Phần đăng nhập */
    const adminEmail = "loveya227@gmail.com"
    const [admin, setAdmin] = useState({
        name: "",
        avatarLink: ""
    })

    useEffect(() => {
        const getAdminDetail = async () => {
            try {
                const res = await axios.get(`/user?email=${adminEmail}`)
                if (res) {
                    console.log(res.data)
                    setAdmin({
                        name: res.data.name,
                        avatarLink: ReactHtmlParser(res.data.avatarLink)
                    })
                }
            } catch (error) {
                console.log(error);
            }
        }
        getAdminDetail();
    }, [])


    /* Phần menu */
    return (
        <div className="left-panel">
            <div className="admin-info">
                <div className="admin-avatar" style={{ backgroundImage: `url(${admin.avatarLink})` }}></div>
                <div className="admin-name">{admin.name}</div>
            </div>
            <ul className="nav flex-column">
                {showMenu(menu)}
            </ul>
        </div >
    );
}

export default Menu;