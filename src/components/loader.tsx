import React from "react";

function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75">
      <div className="p-8 bg-white rounded-md shadow-md w-full max-w-sm">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 border-t-4 border-blue-500 rounded-full animate-spin"></div>
          <p className="text-sm">Veuillez patienter...</p>
        </div>
      </div>
    </div>
  );
}

export default Loader;
