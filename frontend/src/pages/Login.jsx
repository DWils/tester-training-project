import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { loginSchema } from "../schema/loginSchema";



 const Login = () =>{
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setServerError("");
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email: data.email,
        password: data.password,
      });

      setSuccessMessage("Connexion réussie !");
      console.log("Token:", response.data.token); // Stocker le token si nécessaire
      reset(); // Réinitialiser le formulaire après connexion
    } catch (error) {
      setServerError(error.response?.data?.message || "Identifiants incorrects");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      {serverError && <p className="text-red-500">{serverError}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <div>
        <label className="block text-gray-700">Email</label>
        <input type="email" {...register("email")} className="border p-2 w-full rounded" />
        <p className="text-red-500">{errors.email?.message}</p>
      </div>

      <div>
        <label className="block text-gray-700">Mot de passe</label>
        <input type="password" {...register("password")} className="border p-2 w-full rounded" />
        <p className="text-red-500">{errors.password?.message}</p>
      </div>

      <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded w-full" disabled={isSubmitting}>
        {isSubmitting ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}
export default Login;