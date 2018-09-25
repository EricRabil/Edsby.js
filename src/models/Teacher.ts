import { ITeacher, IClass } from "./spec";
import { BasePerson } from "../rest/spec";

export default class Teacher implements ITeacher {
    name: string;
    classes: Map<number, IClass[]>;
    nid: string;

    public static deserialize(data: BasePerson) {
        const teacher = new Teacher();
        teacher.name = data.name;
        teacher.nid = data.nid;
        teacher.classes = new Map();

        return teacher;
    }
}