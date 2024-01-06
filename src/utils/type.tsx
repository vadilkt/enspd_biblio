export interface Book{
    id?:number;
    title: string;
    year: string;
    authors: string[]
    field: string;
    pdfLink: string;
}


export interface User{
    id?:number;
    name: string;
    mail: string;
    matricule: string[]
    role: string;
    field: string;
}

