// Register.js
import { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // BUG: Le mot de passe est en texte clair

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `/register?username=${username}&password=${password}`; // BUG: Les identifiants apparaissent dans l'URL
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom d'utilisateur</label>
          <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input type="text" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} /> {/* BUG */}
        </div>
        <button type="submit" className="btn btn-primary mt-3">S'inscrire</button>
      </form>
    </div>
  );
};

export default Register;