import { Employees } from "@modules/employees/infra/entities/Employees";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";

@Entity("company")
class Company {

    @PrimaryColumn()
    id: string;

    @Column()
    cnpj: string;

    @Column()
    email:string;

    @Column()
    password: string;

    @Column()
    name_company: string;

    @Column()
    owner_name: string;

    @Column()
    phone: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToMany(() => Employees)
    @JoinTable({
      name: "company_employees",
      joinColumns: [{ name: "company_id" }],
      inverseJoinColumns: [{ name: "employee_id" }],
    })
    invitations: Omit<Employees, 'password' | 'id'> [];


    constructor() {
        if (!this.id) {
          this.id = v4();
        }
      }
}

export {Company}