// import * as rp from "request-promise-native";
import {ISentenceData} from "./ISentenceAbstract";

export default abstract class SentenceAbstract {
    // private static isURL(text: string): boolean {
    //     const exp: any = /[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
    //     const regex: any = new RegExp(exp);
    //
    //     return regex.test(text);
    // }

    // private static loadURL(url: string): string {
    //     const rp = require("request-promise-native");
    //     const newUrl: string = "https://api.allorigins.ml/get?url=" + encodeURIComponent(url) + "&callback=?";
    //
    //     return rp(newUrl).then((html: string) => {
    //         const extractor = require("unfluff");
    //         const data = extractor(html);
    //         console.log("Yes");
    //         console.log(data);
    //
    //         return data;
    //     }).catch((err: any) => {
    //         console.log(err);
    //         return "failed to read URL";
    //     });
    // }

    private readonly STOPWORDS: string[] = [ "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "could", "did", "do", "does", "doing", "down", "during", "each", "few", "for", "from", "further", "had", "has", "have", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "it", "it's", "its", "itself", "let's", "me", "more", "most", "my", "myself", "nor", "of", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "she", "she'd", "she'll", "she's", "should", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "we", "we'd", "we'll", "we're", "we've", "were", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "would", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves" ];
    private readonly source: string;
    private readonly sentenceData: ISentenceData[];

    protected constructor(text: string) {
        if (text.length === 0) {
            throw new Error("text length === 0");
        }

        // if (text.indexOf(" ") < 0 && SentenceAbstract.isURL(text)) {
        //     this.source = SentenceAbstract.loadURL(text);
        // } else {
        //     this.source = text;
        // }
        this.source = text;

        this.sentenceData = this.initializeSentenceData();
    }

    public getSentences(): string[] {
        return this.sentenceData.map((o: ISentenceData) => o.sentence);
    }

    public getData(): string[][] {
        return this.sentenceData.map((o: ISentenceData) => o.data);
    }

    public getSentenceData(): ISentenceData[] {
        return this.sentenceData;
    }

    protected abstract initializeSentenceData(): ISentenceData[];

    protected getStopWords(): string[] {
        return this.STOPWORDS;
    }

    protected findSentences(): string[] {
        const sentences: string[] = [];
        const ends: number[] = this.findSentenceEnds();
        let prev: number = 0;

        for (const e of ends) {
            const sentence = this.source.substring(prev, e + 1).replace(/[:()@#"'\n“”]/g, "");
            if (sentence !== "") {
                sentences.push(sentence);
            }
            prev = e + 2;
        }

        return sentences;
    }

    private findSentenceEnds(): number[] {
        const indexes: number[] = [];
        const reg: any = /[.!?;]/g;
        let match: any;

        while ((match = reg.exec(this.source)) !== null) {
            if (match[0] === ".") {
                if (!this.checkPeriod(this.source.substring(match.index - 3))) {
                    continue;
                }
                if (match.index + 2 < this.source.length) {
                    if (!(this.source[match.index + 1] === " " || this.source[match.index + 1] === "\n")) {
                        continue;
                    }
                }
            }

            indexes.push(match.index);
        }

        return indexes;
    }

    private checkPeriod(text: string) {
        const abbr: string[] = ["Mr", "Ms", "Mrs", "Dr"];

        if (this.source[0] === " " && abbr.indexOf(text.substring(1, 3)) > -1) {
            return false;
        }

        if (abbr.indexOf(text.substring(0, 3)) > -1) {
            return false;
        }

        return !(text[3] === " " || text[3] === "\n");
    }
}
