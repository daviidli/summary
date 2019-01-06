import {ISentenceData} from "./ISentenceAbstract";

export default abstract class SentenceAbstract {

    private readonly STOPWORDS: string[] = [ "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "could", "did", "do", "does", "doing", "down", "during", "each", "few", "for", "from", "further", "had", "has", "have", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "it", "it's", "its", "itself", "let's", "me", "more", "most", "my", "myself", "nor", "of", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "she", "she'd", "she'll", "she's", "should", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "we", "we'd", "we'll", "we're", "we've", "were", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "would", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves" ];
    private readonly source: string;
    private readonly sentenceData: ISentenceData[];

    protected constructor(text: string) {
        if (text.length === 0) {
            throw new Error("no text to parse");
        }

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
            const sentence = this.source.substring(prev, e + 1).replace(/[:()"\n“”]/g, "");
            if (sentence !== "" && sentence !== " ") {
                sentences.push(sentence);
            }

            let next: number;
            const space: number = this.source.indexOf(" ", e) + 1;
            const newLine: number = this.source.indexOf("\n", e);


            if (space < 0 && newLine < 0) {
                next = e + 2;
            } else if (space < 0){
                next = newLine < 0 ? e + 2: newLine;
            } else if (newLine < 0) {
                next = space < 0 ? e + 2 : space;
            } else {
                next = Math.min(space, newLine);
            }

            prev = next;
        }

        return sentences;
    }

    private findSentenceEnds(): number[] {
        const indexes: number[] = [];
        const reg: any = /[.!?;]/g;
        let match: any;

        while ((match = reg.exec(this.source)) !== null) {
            if (match[0] === ".") {
                if (!this.checkPeriod(match.index)) {
                    continue;
                }
            }

            indexes.push(match.index);
        }

        return indexes;
    }

    private checkPeriod(period: number) {
        const abbr: string[] = ["Mr", "Ms", "Mrs", "Dr"];

        // if the period is used for Mr, Ms, Dr
        if (abbr.indexOf(this.source.substring(period - 2, period)) > -1) {
            return false;
        }

        // if the period is used for Mrs
        if (abbr.indexOf(this.source.substring(period - 3, period)) > -1) {
            return false;
        }

        // if the period is a decimal point for a number
        return !(period + 1 <= this.source.length && /\d/.test(this.source[period - 1]) && /\d/.test(this.source[period + 1]));
    }
}
