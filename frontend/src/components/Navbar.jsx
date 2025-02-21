// src/components/Navbar.jsx


const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex space-x-4">
        <li><a href="/" className="text-white">Accueil</a></li>
        <li><a href="/login" className="text-white">Se connecter</a></li>
        <li><a href="/register" className="text-white">S&apos;inscrire</a></li>
      </ul>
    </nav>
  )
}

export default Navbar
