import React, { useState } from "react";
import Loader from "./loader";
import Api from "../libs/api";
import { Book } from "../utils/type";
import PdfViewer from "./pdfviewer";

function Search() {
  const [loading, setLoading] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await Api.get(`books?keyword=${searchTerm}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Erreur lors de la recherche", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex-1 z-0">{loading && <Loader />}</div>
      <div className="flex flex-row gap-4 w-full mx-auto mt-8">
        <div className="bg-white px-4 pt-3 rounded-sm border-gray-200 flex-1">
          <h2 className="text-2xl font-bold mb-4">Rechercher un mémoire</h2>
          <hr />
          <div className="mt-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <div className="mb-4">
                <input
                  type="text"
                  id="searchTerm"
                  name="searchTerm"
                  placeholder="Titre du mémoire ou nom(s) d'un auteur"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center mb-3 px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-800 transition ease-in-out duration-150"
              >
                Rechercher
              </button>
            </form>
            {!loading && searchResults.length > 0 ? (
              <table className="gap-3 table-auto min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-50 text-left dark:bg-meta-4">
                    <th className="min-w-[120] py-4 px-4 font-medium text-black text-sm dark:text-white xl:pl-11">
                      Titre
                    </th>
                    <th className="min-w-[120] py-4 px-4 font-medium text-black text-sm dark:text-white">
                      Auteur(s)
                    </th>
                    <th className="min-w-[120] py-4 px-4 font-medium text-black text-sm dark:text-white">
                      Filière
                    </th>
                    <th className="min-w-[120] py-4 px-4 font-medium text-black text-sm dark:text-white">
                      Année
                    </th>
                    <th className="min-w-[120] py-4 px-4 font-medium text-black text-sm dark:text-white">
                      Ouvrir
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((result: any) => (
                    <tr key={result.id}>
                      <td className="border-b text-black border-[#eee] py-5 px-4 pl-p text-sm dark:border-strokedark xl:pl-11">
                        {result.title}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 pl-p text-sm dark:border-strokedark xl:pl-11">
                            {result.authors.map((author:any, index: any)=>(<span key={index}>{author.noms+" "}</span>))}
                          </td>
                      <td className="border-b border-[#eee] py-5 px-4 pl-p text-sm dark:border-strokedark xl:pl-11">
                        {result.filiere}
                      </td>
                      
                      <td className="border-b border-[#eee] py-5 px-4 pl-p text-sm dark:border-strokedark xl:pl-11">
                        {result.year}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 pl-p text-sm dark:border-strokedark xl:pl-11">
                        <a
                          href="#"
                          onClick={() => setSelectedPdf(result.pdfLink)}
                          className="text-blue-500"
                        >
                          Voir le PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Aucun mémoire ne correspond à votre recherche!!</p>
            )}
            {selectedPdf && <PdfViewer pdfUrl={selectedPdf} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
