import React, {useState, useEffect} from 'react';
import apiBackend from "../api/apiBackend.js";

const UserListView = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        apiBackend.get("/api/users").then(response => {
            setUsers(response.data);
        });
    }, []);

    const handleEdit = (user) => {
        setEditingUser(user);
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

    const handleSave = () => {
        apiBackend.put(`/api/users/${editingUser.id}`, editingUser)
            .then(() => {
                setUsers(users.map(user => user.id === editingUser.id ? editingUser : user));
                setEditingUser(null);
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    };

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

                {users.map((user) => (<tr>
                        <td>{user.id}</td>
                        <td>{editingUser && editingUser.id === user.id ? (
                            <input
                                type="text"
                                value={editingUser.username}
                                onChange={(e) => setEditingUser({...editingUser, username: e.target.value})}
                            />
                        ) : user.username}</td>
                        <td>
                            {editingUser && editingUser.id === user.id ? (
                                <button className="btn btn-success" onClick={handleSave}>Enregistrer</button>
                            ) : (
                                <button className="btn btn-primary" onClick={() => handleEdit(user)}>Modifier</button>
                            )}
                            <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Supprimer</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
        ;
};

export default UserListView;