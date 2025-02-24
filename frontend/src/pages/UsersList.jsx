// src/components/UsersList.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/users/')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Erreur lors de la récupération des utilisateurs', error));
  }, []);

  return (
    <div>
      <h1>Liste des Utilisateurs</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} - Rôles: {user.roles.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
