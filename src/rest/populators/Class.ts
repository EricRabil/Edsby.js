import { BasePerson, APIResponse, NRID, NRIDNode, FeedPost } from "../spec";
import { NODE_NID, superagent } from "../Constants";
import { INSTANCE_DATA } from "../../Constants";

export namespace ClassPopulators {
    export interface ClassCourseQuery {
        data: {
            [col: string]: {
                roster?: {
                    eportavail: boolean;
                    item: BasePerson[];
                }
            }
        }
    }

    export async function getStudents(nid: string): Promise<BasePerson[]> {
        const url = NODE_NID(INSTANCE_DATA, nid);

        const body = JSON.parse((await superagent.get(url)
                                .query({
                                    xds: "Course"
                                })).text) as APIResponse<[ClassCourseQuery]>;

        const data = body.slices[0].data;

        let people: BasePerson[] = [];

        for (let key in data) {
            if (!data[key] || typeof data[key] !== "object") continue;
            const obj = data[key];
            for (key in obj) {
                if (key !== "roster") continue;
                people = obj.roster!.item;
                break;
            }
            if (people.length > 0) break;
        }

        return people;
    }

    interface FeedAlignment {
        profpic?: string;
        footer?: {
            date: string;
        };
        normal?: {
            body: string;
            name: {
                user: string;
            }
        };
    };

    export interface ClassFeedQuery {
        data: {
            item: {
                [rid: string]: {
                    /**
                     * post author nid
                     */
                    createid: number;
                    left: FeedAlignment;
                    right: FeedAlignment;
                    /**
                     * original post nid
                     * for original post it is equal to post nid
                     * for comments it is equal to parent nid
                     */
                    thread: string;
                } & NRIDNode;
            }
        }
    }

    export async function getClassFeed(nid: string): Promise<FeedPost[]> {
        const url = NODE_NID(INSTANCE_DATA, nid);

        const body = JSON.parse((await superagent.get(url)
                                .query({
                                    xds: "CourseFeed"
                                })).text) as APIResponse<[ClassFeedQuery]>;

        const data = body.slices[0].data;

        const posts: FeedPost[] = [];

        for (let post of posts) {
            const footer = post.right.footer || post.left.footer;
            const timestamp = new Date(Date.parse(footer.date));
            posts.push({...post, timestamp});
        }
        
        posts.sort(((a, b) => +b - +a));

        return posts;
    }

    interface AssignmentEntry {
        columns: {
            /**
             * the value of this is the total possible points
             */
            0: number;
        };
        /**
         * This NID is equal to the grade NID!
         */
        nid: number;
        name: string;
        cdate: string;
        rid: number;
        thread: number;
        date: string;
        esubmit: number;
        graded: number;
        noavg: boolean;
        published: "0" | "1";
        scheme: string;
        sdate: string;
        state: "0" | "1";
        summative: "0" | "1";
        type: "0" | "1" | "2";
        weighting: {
            0: number;
        }
    }

    interface GradeEntry {
        a: string;
        cols: {
            /**
             * the value of this is the points earned
             */
            0: number;
        }
        v: number;
    }

    export interface ClassGradesQuery {
        data: {
            loaddata: {
                gradebook: {
                    terms: {
                        [rid: string]: AssignmentEntry;
                    };
                };
                grades: {
                    [nid: string]: GradeEntry;
                };
            }
        }
    }
}

export default ClassPopulators;