interface ICompanyDto {
    id?:string;
    cnpj: string;
    email:string;
    password: string;
    name_company: string;
    owner_name: string;
    phone: string;
    created_at?: Date;
} 