import { IEmployeesDTO } from "@modules/employees/dtos/employessDTO";
import { Employees } from "../entities/Employees";



interface IEmployeesRepository {
    create(company: IEmployeesDTO): Promise<Employees>;
    existingEmployeesVerifier({email, cpf}: { email?: string, cpf?:string}): Promise<Employees>;
    login({password, email}): Promise<Employees>;
    getInvite(id): Promise<Employees>;
}

export {IEmployeesRepository}