import {ISentenceData} from "./ISentenceAbstract";
import SentenceAbstract from "./SentenceAbstract";

const DELIMITERS: string[] = [",", ":", "\"", "“", "”", "(", ")", "[", "]"];

export default class SentenceKeyword extends SentenceAbstract {
    constructor(source: string) {
        super(source);
    }

    public getAllKeywords(): string[] {
        const data: string[][] = super.getData();
        let all: string[] = [];

        for (const sentence of data) {
            const s: string[] = sentence.reduce((acc: string[], v: string) => {
                if (v.indexOf(" ") > -1) {
                    return acc.concat(v.split(" "));
                } else {
                    return acc.concat([v]);
                }
            }, []);
            all = all.concat(s);
        }

        return Array.from(new Set(all));
    }

    protected initializeSentenceData(): ISentenceData[] {
        const sentences: string[] = super.findSentences();
        const result: ISentenceData[] = [];
        for (const s of sentences) {
            const keywords: string[] = this.extractKeywords(s);
            if (keywords.length !== 0) {
                result.push({sentence: s, data: keywords});
            }
        }

        return result;
    }

    private extractKeywords(sentence: string): string[] {
        const stopwords = super.getStopWords();
        const keywords = [];

        let current = "";
        for (const word of sentence.toLowerCase().split(" ")) {
            if (stopwords.indexOf(word) > -1 || DELIMITERS.indexOf(word[word.length]) > -1) {
                if (current.length !== 0) {
                    keywords.push(current);
                    current = "";
                }
                continue;
            }

            current = current.length === 0 ? word : current + " " + word;
        }

        return keywords;
    }
}