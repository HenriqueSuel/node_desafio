import { Router } from "express";
import { companyRoutes } from "./company.routes";
import { employeesRoutes } from "./employees.routes";

const router = Router();

router.use("/company", companyRoutes);
router.use("/employees", employeesRoutes);

export { router };