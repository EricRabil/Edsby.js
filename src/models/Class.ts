import { IClass } from "./spec";
import Student from "./Student";
import Teacher from "./Teacher";

export default class Class implements IClass {
    courseCode: string;
    teacherNid: number;
    teacherName: string;
    classmates: Student[];
    teacher?: Teacher;
    nid: string;
    rid: string;

    public static 
}