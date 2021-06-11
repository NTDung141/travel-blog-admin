import React from "react";
import AdminCategory from "../Components/AdminCategory/AdminCategory";
import AdminCategoryForm from "../Components/AdminCategory/AdminCategoryForm";
import AdminPage from "../Components/AdminPage/AdminPage";
import AdminPost from "../Components/AdminPost/AdminPost";
import AdminReport from "../Components/AdminReport/AdminReport";
import AdminReportDetails from "../Components/AdminReport/AdminReportDetails";
import AdminUser from "../Components/AdminUser/AdminUser";

const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb3ZleWEyMjdAZ21haWwuY29tIiwiaWF0IjoxNjIzMzk5Mjk2LCJleHAiOjE2MjMzOTk4OTZ9.FTU5wEi-1wO5JgYyBeCWFoM_2AnI7s8vuZ_RP6yI-64";


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