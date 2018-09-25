import { IStudent } from "./spec";
import { BasePerson, BootstrapUser } from "../rest/spec";

export default class Student implements IStudent {
    name: string;
    self: boolean;
    classes;
    schools;
    nid: string;

    public static deserialize(user: BasePerson | BootstrapUser) {
        const student = new Student();
        
        student.name = user.name;
        student.nid = user.nid;

        return student;
    }
}