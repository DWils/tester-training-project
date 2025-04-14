import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup, Button } from 'react-bootstrap';
import apiBackend from "../api/apiBackend.js";
import Breadcrumb from "../components/Breadcrumb.jsx";

const UserListView = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [usersPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        apiBackend.get(`/api/users?page=${currentPage}&size=${usersPerPage}&sort=username`).then(response => {
            setUsers(response.data.content);
            setTotalPages(response.data.totalPages);
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

    return (
        <div className="body-view">
            <Breadcrumb/>
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
                            <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Supprimer</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <ButtonGroup>
                <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                >
                    Précédent
                </Button>
                {[...Array(totalPages).keys()].map(number => (
                    <Button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={currentPage === number ? 'btn-primary' : 'btn-secondary'}
                    >
                        {number + 1}
                    </Button>
                ))}
                <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                >
                    Suivant
                </Button>
            </ButtonGroup>
        </div>
    );
};

export default UserListView;