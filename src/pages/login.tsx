import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../libs/api";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  noms: yup.string().required("Le nom complet est nécessaire !"),
  matricule: yup.string().required("Ce champs est requis"),
});

function Login() {
  const navigate = useNavigate();
  const [erreurs, setErreurs] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: any) => {
    console.log(data);
    Api.post("login", data)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        reset();
        navigate("/home");
      })
      .catch((err) =>{
        if(err.hasOwnProperty("response")){
            setErreurs(() => Object.entries(err.response.data.errors).map(([_,messagesList]:any) => messagesList).flat())
        }else{
          setErreurs(["Server Error"]);
        }
      });
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mx-auto h-10 w-auto texl-3xl font-bold ">
          ENSPD Biblio
        </h1>
        <h2 className="mt-10  text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Connectez vous
        </h2>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {
          erreurs.length ? <div className="bg-red-500 p-4 text-white">
            <ul>
              {
                erreurs.map( erreur => <li> {erreur}</li>)
              }
            </ul>
          </div> : null
        }
          <form className="space-y-6" onSubmit={handleSubmit(onSubmitHandler)}>
            <div>
              <label
                htmlFor="name"
                className="block text-start text-sm font-medium leading-6 text-gray-900"
              >
                Nom Complet
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  required
                  {...register("noms")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mot de passe(Matricule)
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  {...register("matricule")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="text-sm text-end">
                <a
                  href="#"
                  className="font-semibold text-end text-indigo-600 hover:text-indigo-500"
                >
                  Mot de passe oublié?
                </a>
              </div>
            </div>

            <div>
              <input
                type="submit"
                value="Se Connecter"
                className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-100  duration-300 mt-5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
