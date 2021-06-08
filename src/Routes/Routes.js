import React from "react";
import AdminCategory from "../Components/AdminCategory/AdminCategory";
import AdminCategoryForm from "../Components/AdminCategory/AdminCategoryForm";
import AdminPage from "../Components/AdminPage/AdminPage";
import AdminPost from "../Components/AdminPost/AdminPost";
import AdminReport from "../Components/AdminReport/AdminReport";
import AdminReportDetails from "../Components/AdminReport/AdminReportDetails";
import AdminUser from "../Components/AdminUser/AdminUser";

const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb3ZleWEyMjdAZ21haWwuY29tIiwiaWF0IjoxNjIzMDU0MjQzLCJleHAiOjE2MjMwNTQ4NDN9.j4EVOITphp6ml3HrQnODHP_TNVvU4WY9NfEmHYz3OVg";


const routes = [
    {
        path: "/dashboard",
        exact: true,
        main: () => <AdminPage token={token} />
    },
    {
        path: "/posts",
        exact: true,
        main: () => <AdminPost token={token} />
    },
    {
        path: "/categories",
        exact: true,
        main: () => <AdminCategory token={token} />
    },
    {
        path: "/categoriesAdd",
        exact: true,
        main: () => <AdminCategoryForm token={token} isAdd={true} />
    },
    {
        path: "/categoriesUpdate/:id/:name",
        exact: true,
        main: () => <AdminCategoryForm token={token} />
    },
    {
        path: "/users",
        exact: true,
        main: () => <AdminUser token={token} />
    },
    {
        path: "/reports",
        exact: true,
        main: () => <AdminReport token={token} />
    },
    {
        path: "/reportDetail/:id",
        exact: true,
        main: () => <AdminReportDetails token={token} />
    }
];

export default routes