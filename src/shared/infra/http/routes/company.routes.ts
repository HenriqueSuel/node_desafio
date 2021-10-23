
import { CompanyController } from "@modules/company/services/company/CompanyController";
import { Router } from "express";
import { ensureAuthenticatedCompany } from "../middlewares/ensureAuthenticatedCompany";

const companyRoutes = Router();


const companyController = new CompanyController();


companyRoutes.post('/', companyController.create)
companyRoutes.patch('/', ensureAuthenticatedCompany, companyController.update)
companyRoutes.post('/login', companyController.login)
companyRoutes.post('/invite', ensureAuthenticatedCompany, companyController.inviteEmployees)


export { companyRoutes }