import Student from "./Student";
import { BootstrapUser } from "../rest/spec";

export default class CurrentStudent extends Student {
    public static deserialize(data: BootstrapUser): CurrentStudent {
        const student = super.deserialize(data);

        student.self = true;    

        return student;
    }
}