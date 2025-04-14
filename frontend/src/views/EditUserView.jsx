import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiBackend from "../api/apiBackend.js";
import Breadcrumb from "../components/Breadcrumb.jsx";

const EditUserView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        apiBackend.get(`/api/users/${id}`).then(response => {
            setUser(response.data);
        }).catch(error => {
            console.error('Error fetching user:', error);
        });
    }, [id]);

    const handleSave = (updatedUser) => {
        console.log('Updated User:', updatedUser); // Log the updated user object
        // Call the API to update the user  
        apiBackend.put(`/api/users/${updatedUser.id}`, updatedUser)
            .then(() => {
                navigate('/users');
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    };

    const handleCancel = () => {
        navigate('/users');
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Breadcrumb />
            <h2>Edit User</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSave(user); }}>
                <div className="form-group">
                    <label>Nom</label>
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Role</label>
                    <select
                        name="role"
                        value={user.role}
                        onChange={(e) => setUser({ ...user, role: e.target.value })}
                        className="form-control"
                    >
                        <option value="CUSTOMER">Client</option>
                        <option value="VENDOR">Vendeur</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-success">Enregistrer</button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>Annuler</button>
            </form>
        </div>
    );
};

export default EditUserView;