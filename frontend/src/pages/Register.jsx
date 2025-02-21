import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { registerSchema } from "../schema/registerSchema";


const Register = () => {
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setServerError("");
    setSuccessMessage("");

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      setSuccessMessage("Inscription réussie !");
      reset(); // Réinitialiser le formulaire après soumission
    } catch (error) {
      setServerError(error.response?.data?.message || "Une erreur est survenue");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      {serverError && <p className="text-red-500">{serverError}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <div>
        <label className="block text-gray-700">Nom</label>
        <input {...register("name")} className="border p-2 w-full rounded" />
        <p className="text-red-500">{errors.name?.message}</p>
      </div>

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

      <div>
        <label className="block text-gray-700">Confirmer le mot de passe</label>
        <input type="password" {...register("confirmPassword")} className="border p-2 w-full rounded" />
        <p className="text-red-500">{errors.confirmPassword?.message}</p>
      </div>

      <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded w-full" disabled={isSubmitting}>
        {isSubmitting ? "Envoi..." : "S'inscrire"}
      </button>
    </form>
  );
}
export default Register;
