import { Company } from "../entities/Company";

interface IUpadate {
    id:string;
    name_company: string;
    owner_name: string;
    phone: string;
}

interface ICompanyRepository {
    create(company: ICompanyDto): Promise<Company>;
    findById(id): Promise<Company>;
    existingCompanyVerifier(cnpj: string, email?: string): Promise<Company>;
    update({id, name_company,owner_name, phone}:IUpadate): Promise<Company>;
    login({password, email}): Promise<Company>;
}

export {ICompanyRepository}