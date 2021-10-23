interface IEmployeesDTO {
    id?:string;
    cpf: string;
    email:string;
    password: string;
    full_name: string;
    phone: string;
    created_at?: Date;
} 

export {IEmployeesDTO}