import { DEBUG, DEBUG_TREE, IS_NODE } from "../Constants";

type ReportLevel = "log" | "warn" | "error" | "debug";
type ReportEffect = "bold" | "italic" | "strike" | "underline";
type ReportManifest = string | Error | object;
type ReportStyled = {
    content: ReportManifest,
    emphasis?: number,
    color?: string,
    font?: string,
    effects?: ReportEffect[]
};
export type Report = ReportManifest | ReportStyled;

/**
 * Transpiles report styling to CSS.
 * @param report the report to style
 */
const generateCSS: (report: ReportStyled) => string = report => {
    let css = "";
    if (report.emphasis) {
        css += `font-size:${12 + report.emphasis};`;
    }
    if (report.color) {
        css += `color:${report.color};`;
    }
    if (report.font) {
        css += `font-family:${report.font};`;
    }
    if (report.effects) {
        for (let effect of report.effects) {
            switch (effect) {
                case "bold":
                css += `font-weight:bold;`;
                break;
                case "italic":
                css += `font-style:italic;`;
                break;
                case "strike":
                css += `text-decoration:line-through;`;
                break;
                case "underline":
                css += `text-decoration:underline;`;
                break;
            }
        }
    }
    return css;
};

const levelStyles: {[key: string]: string} = {
    log: generateCSS({content: ""}),
    warn: generateCSS({content: "", color: "#c47900", effects: ["italic"]}),
    error: generateCSS({content: "", color: "red", effects: ["bold"]}),
    debug: generateCSS({content: "", color: "green", effects: ["italic"]})
}

function isArray(value: any, type: string): value is Array<any> {
    if (!value || !Array.isArray(value)) {
        return false;
    }
    for (let entry of value) {
        if (typeof entry !== type) {
            return false;
        }
    }
    return true;
}

function isReportStyled(report: any): report is ReportStyled {
    return typeof report === "object"
        && !(report instanceof Error)
        && (typeof report.content === "string" || report.content instanceof Error)
        && (typeof report.emphasis === "undefined" || typeof report.emphasis === "number")
        && (typeof report.color === "undefined" || typeof report.color === "string")
        && (typeof report.font === "undefined" || typeof report.font === "string")
        && (typeof report.effects === "undefined" || isArray(report.effects, "string"));
}

export class Debugger {
    static report(level: ReportLevel, message: Report | Report[]) {
        if (!message) {
            return;
        }
        if (DEBUG) {
            const process = (report: Report) => {
                if (!report) {
                    return;
                }
                level = level === "debug" ? "log" : level;
                if (!IS_NODE && isReportStyled(report)) {
                    if (!report.content) {
                        return;
                    }
                    if (typeof report.content === "object") {
                        console[level](report.content);
                        return;
                    };
                    DEBUG_TREE.Log.push({level, content: report.content, timestamp: Date.now()});
                    console[level](`%c${report.content}`, generateCSS(report));
                    return;
                }
                DEBUG_TREE.Log.push({level, content: report, timestamp: Date.now()});
                if (typeof report === "object") {
                    console[level](report);
                    return;
                }
                console[level](`${level} ${IS_NODE ? '' : '%c'}${report}`, levelStyles[level]);
            };
            if (Array.isArray(message)) {
                for (let msg of message) {
                    process(msg);
                }
            } else {
                process(message);
            }
        }
    }

    static log(...message: Report[]) {
        Debugger.report("log", message);
    }

    static warn(...message: Report[]) {
        Debugger.report("warn", message);
    }

    static error(...message: Report[]) {
        Debugger.report("error", message);
    }

    static debug(...message: Report[]) {
        Debugger.report("debug", message);
    }
}

if (DEBUG) {
    DEBUG_TREE.Debugger = Debugger;
    DEBUG_TREE.Log = [];
}