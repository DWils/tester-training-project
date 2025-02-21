import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("Email invalide").required("L'email est requis"),
  password: yup.string().min(6, "Le mot de passe doit avoir au moins 6 caractères").required("Le mot de passe est requis"),
}).required();