interface ICompanyEmployeesRepository {
    inviteEmployee(company_id, employee_id): Promise<void>
}

export {ICompanyEmployeesRepository}