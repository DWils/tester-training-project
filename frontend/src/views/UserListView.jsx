import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiBackend from "../api/apiBackend.js";

const UserListView = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        apiBackend.get(`/api/users?page=${currentPage}&limit=${usersPerPage}`).then(response => {
            setUsers(response.data);
        });
    }, [currentPage, usersPerPage]);

    const handleEdit = (userId) => {
        navigate(`/edit-user/${userId}`);
    };

    const handleDelete = (userId) => {
        apiBackend.delete(`/api/users/${userId}`)
            .then(() => {
                setUsers(users.filter(user => user.id !== userId));
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(users.length / usersPerPage);

    return (
        <div>
            <h2>Liste des Utilisateurs</h2>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                            <button className="btn btn-primary" onClick={() => handleEdit(user.id)}>Modifier</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {[...Array(totalPages).keys()].map(number => (
                <button
                    key={number + 1}
                    onClick={() => handlePageChange(number + 1)}
                    className={`btn ${currentPage === number + 1 ? 'btn-primary' : 'btn-secondary'}`}
                >
                    {number + 1}
                </button>
            ))}
        </div>
    );
};

export default UserListView;