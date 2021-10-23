import { AppError } from "@shared/errors/AppError";
import { CreateToken } from "@utils/createToken";
import { ERROR } from "@utils/message/errorMessage";
import { compare, hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { IEmployeesDTO } from "../dtos/employessDTO";
import { IEmployeesRepository } from "../infra/repositories/IEmployeesRepository";

@injectable()
class EmployeesServices {
    constructor(
        @inject("EmployeesRepository")
        private employeesRepository: IEmployeesRepository
      ) {}

      async create(employessData:IEmployeesDTO) {
        const { email, cpf } = employessData
        const employessFound = await this.employeesRepository.existingEmployeesVerifier({email, cpf });

        
        if(employessFound) {
          throw new AppError(ERROR.EMPLOYEES.EXISTING_EMPLOYEES);
        }

        const passwordHash = await hash(employessData.password, 8);

        const employees = await this.employeesRepository.create({...employessData, password: passwordHash});

        const token = CreateToken(employees.id);
        
        delete employees.id;
        delete employees.password;

        return {
          employees,
          token
        }
      }

      async login({email, password}) {
        const employees = await this.employeesRepository.existingEmployeesVerifier(email);
         
        if(!employees) {
          throw new AppError(ERROR.EMPLOYEES.LOGIN_FAIL);
        }
        
        const passwordMatch = await compare(password, employees.password);

        if (!passwordMatch) {
          throw new AppError(ERROR.EMPLOYEES.LOGIN_FAIL);
        }



        const token = CreateToken(employees.id);
        delete employees.id;
        delete employees.password;

        return {...token, employees}

      }
      async search({email, cpf}) {
        const employees = await this.employeesRepository.existingEmployeesVerifier({email, cpf});
         
        if(!employees) {
          throw new AppError(ERROR.EMPLOYEES.SEARCH);
        }
        

        delete employees.id;
        delete employees.password;

        return employees
      }
      async getInvite(id) {
        const employees = await this.employeesRepository.getInvite(id);
         
        if(!employees) {
          throw new AppError(ERROR.EMPLOYEES.SEARCH);
        }
        
        return employees
      }
}

export {EmployeesServices}