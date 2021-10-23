import { ICompanyRepository } from "@modules/company/infra/repositories/ICompanuRepository";
import { IEmployeesRepository } from "@modules/employees/infra/repositories/IEmployeesRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateToken } from "@utils/createToken";
import { ERROR } from "@utils/message/errorMessage";
import { compare, hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

@injectable()
class CompanyService {
    constructor(
        @inject("CompanyRepository")
        private companyRepository: ICompanyRepository,
        @inject("EmployeesRepository")
        private employeesRepository: IEmployeesRepository
      ) {}

      async create(companyData:ICompanyDto) {

        const companyFound = await this.companyRepository.existingCompanyVerifier(companyData.cnpj, companyData.email);

        
        if(companyFound) {
          throw new AppError(ERROR.COMPANY.EXISTING_COMPANY);
        }

        const passwordHash = await hash(companyData.password, 8);

        const company = await this.companyRepository.create({...companyData, password: passwordHash});

        const token = CreateToken(company.id);
        
        delete company.id;
        delete company.password;

        return {
          company,
          token
        }
      }

      async update({ id, name_company, owner_name, phone }) {
        const company = await this.companyRepository.update({id, name_company, owner_name, phone });
        delete company.id;
        delete company.password;

        return 
      }

      async login({email, password}) {
        const company = await this.companyRepository.existingCompanyVerifier(email);
         
        if(!company) {
          throw new AppError('ERROR.COMPANY.LOGIN_FAIL');
        }
        
        const passwordMatch = await compare(password, company.password);

        if (!passwordMatch) {
          throw new AppError(ERROR.COMPANY.LOGIN_FAIL);
        }

        const token = CreateToken(company.id);
        delete company.id;
        delete company.password;

        return {...token, company}

      }

      async inviteEmployees( company_id, cpf ) {
        const employee = await this.employeesRepository.existingEmployeesVerifier({cpf});
         
        if(!employee) {
          throw new AppError(ERROR.EMPLOYEES.SEARCH);
        }
        
        const company = await this.companyRepository.findById(company_id)

        if(!company) {
          throw new AppError(ERROR.COMPANY.SEARCH);
        }

        company.invitations = [employee];


        await this.companyRepository.create(company);

        return company;

      }
}

export {CompanyService}