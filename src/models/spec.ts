import { NRID, UniqueNID } from "../rest/spec";

export interface IStudent extends UniqueNID {
    name: string;
    self: boolean;
    classes: Map<number, IClass>;
    schools?: Map<string, ISchool>;
}

export interface IClass extends NRID {
    courseCode: string;
    teacherNid: number;
    teacherName: string;
    classmates: IStudent[];
    teacher?: ITeacher;
}

export interface ISchool extends NRID {
    name: string;
}

export interface ITeacher extends UniqueNID {
    name: string;
    classes: Map<number, IClass[]>;
}