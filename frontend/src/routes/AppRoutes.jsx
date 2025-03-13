import React from 'react'
import {Route, Routes} from 'react-router-dom';
import HomeView from "../views/HomeView.jsx";
import ProductListView from "../views/ProductListView.jsx";
import ProductDetailView from "../views/ProductDetailView.jsx";
import AddProductView from "../views/AddProductView.jsx";
import UserListView from "../views/UserListView.jsx";
import RegisterView from "../views/RegisterView.jsx";
import LoginView from "../views/LoginView.jsx";
import CartView from "../views/CartView.jsx";
import EditUserView from "../views/EditUserView.jsx";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";

const AppRoutes = () => {
    const { user } = useContext(UserContext);

    return (
        <Routes>
            <Route path="/" element={<HomeView/>}/>
            <Route path="/products"
                   element={(user && user.role === 'CUSTOMER') || !user ? <HomeView/> :
                       <ProductListView/>}/>
            <Route path="/products/:id" element={<ProductDetailView/>}/>
            <Route path="/add-product" element={user ? <AddProductView/> : <HomeView/>}/>
            <Route path="/users" element={<UserListView/>}/>
            <Route path="/register" element={<RegisterView/>}/>
            <Route path="/login" element={<LoginView />} />
            <Route path="/cart" element={<CartView/>}/>
            <Route path="/edit-user/:id" element={<EditUserView/>}/>
        </Routes>
    )
}
export default AppRoutes;
