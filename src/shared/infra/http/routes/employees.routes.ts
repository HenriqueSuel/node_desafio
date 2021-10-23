
import { EmployeesController } from "@modules/employees/services/EmployeesController";
import { Router } from "express";
import { ensureAuthenticatedCompany } from "../middlewares/ensureAuthenticatedCompany";
import { ensureAuthenticatedEmployees } from "../middlewares/ensureAuthenticatedEmployees";

const employeesRoutes = Router();


const employeesController = new EmployeesController();


employeesRoutes.post('/', employeesController.create)
employeesRoutes.post('/login', employeesController.login)
employeesRoutes.get('/search',ensureAuthenticatedCompany, employeesController.search)
employeesRoutes.get('/search/invite',ensureAuthenticatedEmployees, employeesController.getInvite)


export { employeesRoutes }