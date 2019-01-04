import * as $ from "jquery";

export function isURL(text: string): boolean {
    const exp: any = /[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
    const regex: any = new RegExp(exp);

    return regex.test(text);
}

export function loadURL(url: string): Promise<string> {
    const newUrl: string = "https://api.allorigins.ml/get?url=" + encodeURIComponent(url) + "&callback=?";

    return $.getJSON(newUrl).then((data: any) => {
        return parseParagraphs(data.contents);
    }).catch((err) => {
        return err;
    });
}

export function parseParagraphs(data: any): Promise<string> {
    return new Promise((fulfill, reject) => {
        let text: string = "";

        $(data).find("p").each((i: number, e: any) => {
            text += $(e).text() + "\n";
        });

        if (text !== "") {
            return fulfill(text);
        } else {
            return reject(Error("No paragraphs found on website"));
        }
    });
}