import React, { useState } from "react";
import * as yup from "yup";
import { COUNTRIES } from "../utils/countries";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Api from "../libs/api";
import { FIELD } from "../utils/departements";

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Ce champ est requis !"),
    field: yup.string().required("Ce champs est requis !"),
    matricule: yup.string().required("Ce champs est requis !"),
    role: yup.string().required("Choisissez un rôle"),
    email: yup
      .string()
      .email("email invalide")
      .required("email invalide")
      .matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/, {
        message: "email invalide",
      })
  })
  .required();

const token = localStorage.getItem("token");
const config = {
  headers: { Authorization: `Bearer ${token}` },
};
const Register = () => {
  const ROLES = [
    { type: 0, label: "Administrateur"},
    { type: 1, label: "Etudiant" }
  ];
  const navigate = useNavigate();
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
    Api.post(
      "Users/register",
      {
        role: data.role,
        name: data.name,
        email: data.email,
        matricule: data.matricule,
        field: data.field,
      },
      config
    )
      .then((res: any) => {
        console.log(res);
        reset();
        navigate("/home/users");
      })
      .catch((err: any) => [console.log(err)]);
  };

  return (
    
      <section className="container my-auto mx-auto">
        <div className="rounded shadow-lg my-auto md:mx-auto p-4 pb-5 flex min-h-full flex-col lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-2xl font-bold mb-4">
              Enregistrer un nouvel utilisateur
            </h2>
            <hr/>
            <div>
              <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className="flex flex-grow md:flex-row justify-between">
                  <div className="mt-4 w-full">
                    <input
                      type="text"
                      autoComplete="nom"
                      required
                      placeholder="Nom(s)"
                      {...register("name")}
                      className="pl-2 block text-left w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <p className="text-red-500  text-xs block sm:inline">
                      {errors.name?.message}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="mt-2">
                    <input
                      type="email"
                      autoComplete="current-email"
                      required
                      placeholder="Email"
                      title="Entrez votre adresse mail"
                      {...register("email")}
                      className="pl-2 block text-left w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <p className="text-red-500  text-xs block sm:inline">
                      {errors.email?.message}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="mt-2">
                    <input
                      type="text"
                      required
                      placeholder="Matricule"
                      {...register("matricule")}
                      title="Entrez votre matricule"
                      className="pl-2 block text-left w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <p className="text-red-500  text-xs block sm:inline">
                      {errors.matricule?.message}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="mt-2">
                    <select
                      {...register("role")}
                      className="pl-2 rounded-tl-lg rounded-tr-lg border-gray-300 shadow-sm md:rounded-bl-lg md:rounded-tr-none"
                    >
                      <option value="">
                        Quel est le rôle de cet utilisateur?
                      </option>
                      {ROLES.map((role: any, index) => (
                        <option key={index} value={role.label}>
                          {role.label}
                        </option>
                      ))}
                    </select>
                    <p className=" text-red-500 text-xs block sm:inline">
                      {errors.role?.message}
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex flex-col md:flex-row">
                  <select
                    {...register("field")}
                    className="pl-2 rounded-tl-lg w-full rounded-tr-lg border-gray-300 shadow-sm md:w-full md:rounded-bl-lg md:rounded-tr-none"
                  >
                    <option data-countrycode="FR" value="">
                      Votre Filière
                    </option>
                    {FIELD.map((field: any, index) => (
                      <option
                        key={index}
                        value={field.name}
                      >
                        {field.name}
                      </option>
                    ))}
                  </select>
                  
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-100  duration-300 mt-5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    
  );
};

export default Register;
