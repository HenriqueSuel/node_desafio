import { container } from "tsyringe";
import { CompanyRepository } from "@modules/company/infra/repositories/implementations/CompanyRepository";
import { ICompanyRepository } from "@modules/company/infra/repositories/ICompanuRepository";
import { IEmployeesRepository } from "@modules/employees/infra/repositories/IEmployeesRepository";
import { EmployeesRepository } from "@modules/employees/infra/repositories/implementations/EmployeesRepository";

container.registerSingleton<ICompanyRepository>(
    "CompanyRepository",
    CompanyRepository
  );

container.registerSingleton<IEmployeesRepository>(
    "EmployeesRepository",
    EmployeesRepository
  );
