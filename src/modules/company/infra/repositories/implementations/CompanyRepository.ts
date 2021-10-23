import { getRepository, Repository } from "typeorm";
import { Company } from "../../entities/Company";
import { ICompanyRepository } from "../ICompanuRepository";


class CompanyRepository implements ICompanyRepository {
    private repository: Repository<Company>
    
    constructor(){
        this.repository = getRepository(Company);
    }

    async create(company: ICompanyDto): Promise<Company> {
        const companySave = this.repository.create({...company});
        
        return await this.repository.save(companySave);
    }

    async existingCompanyVerifier( email: string, cnpj?: string,):Promise<Company> {
        const companyFoundQuery = await this.repository.createQueryBuilder('existingCompanyVerifier')
        .where('email = :email', { email })

        if(cnpj) {
            console.log('Entrou');
            companyFoundQuery.orWhere('cnpj = :cnpj', { cnpj })
        }
        
        const companyFound = await companyFoundQuery.getOne();
        return companyFound;
    }

    async update({id, name_company,owner_name, phone}):Promise<Company> {
        await (await this.repository.update(id, {name_company,owner_name, phone}))
        return await this.repository.findOne(id);
    }

    async login({password, email }):Promise<Company> {
        return await this.repository.findOne({ password,email });
    }

    async findById(id):Promise<Company> {
        return await this.repository.findOne(id);
    }
}

export {CompanyRepository}