import * as yup from 'yup';

export const registerSchema = yup.object({
  name: yup.string().required("Le nom est requis").min(3, "Au moins 3 caractères"),
  email: yup.string().email("Email invalide").required("L'email est requis"),
  password: yup.string().min(6, "Le mot de passe doit avoir au moins 6 caractères").required("Le mot de passe est requis"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Les mots de passe ne correspondent pas")
    .required("La confirmation du mot de passe est requise"),
}).required();