import { AppError } from "@shared/errors/AppError";
import { CnpjValidator } from "@utils/CnpjValidator";
import { ERROR } from "@utils/message/errorMessage";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CompanyService } from "./CompanyService";


class CompanyController {

    async create(request: Request, response: Response): Promise<Response> {
        const { cnpj, email,name_company,owner_name,password,phone } = request.body as unknown as ICompanyDto

        if(!CnpjValidator(cnpj)) {
            throw new AppError(ERROR.COMPANY.CNPJ);
        }

        const companyService = container.resolve(CompanyService);

        const company = await companyService.create({ cnpj, email,name_company,owner_name,password,phone })

        return response.status(201).json(company);
    } 

    async update(request: Request, response: Response): Promise<Response> {
        const { id } = request['company'];
        const  { name_company, owner_name, phone }  = request.body as unknown as ICompanyDto

        const companyService = container.resolve(CompanyService);

        const company = await companyService.update({ id, name_company, owner_name, phone })

        return response.status(201).json(company);
    } 

    async login(request: Request, response: Response): Promise<Response> {
        const  { email, password }  = request.body as unknown as ICompanyDto

        const companyService = container.resolve(CompanyService);

        const infoCompany = await companyService.login({email, password })

        return response.status(201).json({...infoCompany});
    } 
    
    async inviteEmployees(request: Request, response: Response): Promise<Response> {
        const { id } = request['company'];
        const  { cpf }  = request.body

        const companyService = container.resolve(CompanyService);

        const infoCompany = await companyService.inviteEmployees(id,cpf)

        return response.status(200).json({...infoCompany});
    } 

}

export {CompanyController};