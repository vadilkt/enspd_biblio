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
    title: yup.string().required("Ce champ est requis !"),
    filiere: yup.string().required("Ce champs est requis !"),
    year: yup.string().required("Ce champs est requis !")
      .matches(/^[0-9]{4}$/, "Cette année n'est pas valide")
      .test({
        name: "year-range",
        message: "L'année doit être comprise entre 1999 et l'année en cours",
        test: (value) => {
          const year = parseInt(value, 10);
          return !isNaN(year) && year >= 1999 && year <= currentYear;
        },
      }),
    authors: yup.string().required("Ajouter un ou plusieurs auteurs séparés par un point-virgule (;)"),
  })
  .required();

const currentYear = new Date().getFullYear();

const token = localStorage.getItem("token");
const config = {
  headers: { Authorization: `Bearer ${token}` },
};
const NewBook= () => {
  const [authorsList, setAuthorsList] = useState<string[]>([]);
  const [file, setFile] = useState<any>();
  const [erreurs, setErreurs] = useState<any[]>([]);


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


    const fd = new FormData();

    for(let k in data){
      fd.append(k,data[k]);
    }

    fd.append("pdf",file);

    Api.post(
      "books",
    fd
    )
      .then((res: any) => {
        console.log(res);
        reset();
        navigate("/home/");
      })
      .catch((err: any) => {
        if(err.hasOwnProperty("response")){
          setErreurs(() => Object.entries(err.response.data.errors).map(([_,messagesList]:any) => messagesList).flat())
      }else{
        setErreurs(["Server Error"]);
      }
      });
  };

  const handleAuthorsChange = (e:any)=>{
    const authors = e.target.value.split(";").map((author: string)=> author.trim());
    setAuthorsList(authors);
  }

  const handleFile = (e: any) => {
    setFile(e.target.files[0]);
  }

  return (
    
      <section className="container my-auto mx-auto">
        <div className="rounded shadow-lg my-auto md:mx-auto p-4 pb-5 flex min-h-full flex-col lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-2xl font-bold mb-4">
              Enregistrer un nouveau mémoire
            </h2>
            <hr/>
            {
          erreurs.length ? <div className="bg-red-500 p-4 text-white">
            <ul>
              {
                erreurs.map( erreur => <li> {erreur}</li>)
              }
            </ul>
          </div> : null
        }
            <div>
              <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className="flex flex-grow md:flex-row justify-between">
                  <div className="mt-4 w-full">
                    <input
                      type="text"
                      autoComplete="titre"
                      required
                      placeholder="Titre du mémoire"
                      {...register("title")}
                      className="pl-2 block text-left w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <p className="text-red-500  text-xs block sm:inline">
                      {errors.title?.message}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="mt-2">
                    <input
                      type="text"
                      autoComplete="year"
                      required
                      placeholder="year"
                      title="Année de rédaction"
                      {...register("year")}
                      className="pl-2 block text-left w-ful
                      l rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <p className="text-red-500  text-xs block sm:inline">
                      {errors.year?.message}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="mt-2">
                    <input
                      type="text"
                      required
                      placeholder="Auteur(s)"
                      {...register("authors")}
                      onChange={handleAuthorsChange}
                      title="Les auteurs (séparés par un point-virgule(;)"
                      className="pl-2 block text-left w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <p className="text-red-500  text-xs block sm:inline">
                      {errors.authors?.message}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="mt-2">
                  </div>
                </div>
                <div className="mt-5 flex flex-col md:flex-row">
                  <select
                    {...register("filiere")}
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
                  <div className="mt-2">
                    <input
                      type="file"
                      required
                      placeholder=""
                      onChange={handleFile}
                      title="Votre document"
                      className="pl-2 block text-left w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    
                  </div>
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

export default NewBook;
