import { IEmployeesDTO } from "@modules/employees/dtos/employessDTO";
import { getRepository, Repository } from "typeorm";
import { Employees } from "../../entities/Employees";
import { IEmployeesRepository } from "../IEmployeesRepository";

class EmployeesRepository implements IEmployeesRepository {
    private repository: Repository<Employees>
    
    constructor(){
        this.repository = getRepository(Employees);
    }

    async create(employees:IEmployeesDTO ): Promise<Employees> {
        const employessCreate = this.repository.create({...employees});
        
        return await this.repository.save(employessCreate);
    }

    async existingEmployeesVerifier({email, cpf}):Promise<Employees> {
        const employessFoundQuery = await this.repository.createQueryBuilder('existingCompanyVerifier')
       
        if(email) {
            employessFoundQuery .orWhere('email = :email', { email })
        }

        if(cpf) {
            employessFoundQuery.orWhere('cpf = :cpf', { cpf })
        }
        
        const employessFound = await employessFoundQuery.getOne();
        return employessFound;
    }

    async login({password, email }):Promise<Employees> {
        return await this.repository.findOne({ password,email });
    }

    async getInvite(id):Promise<Employees> {
        return await this.repository.findOne({
            relations: ['invitations'],
            where: { id }
        });
    }
}

export {EmployeesRepository}