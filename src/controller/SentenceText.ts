import {ISentenceData} from "./ISentenceText";

const STOPWORDS = [ "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "could", "did", "do", "does", "doing", "down", "during", "each", "few", "for", "from", "further", "had", "has", "have", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "it", "it's", "its", "itself", "let's", "me", "more", "most", "my", "myself", "nor", "of", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "she", "she'd", "she'll", "she's", "should", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "we", "we'd", "we'll", "we're", "we've", "were", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "would", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves" ];

export default class SentenceText {
    private static tokenizeSentence(sentence: string) {
        const result = [];

        const words = sentence.toLowerCase().replace(/[.,:]/g, "").split(" ");
        for (const word of words) {
            if (STOPWORDS.indexOf(word) < 0) {
                result.push(word);
            }
        }

        return result;
    }

    private readonly source: string;
    private readonly sentenceTokens: ISentenceData[];

    constructor(sentence: string) {
        if (sentence.length === 0) {
            throw new Error("text length === 0");
        }
        this.source = sentence;
        this.sentenceTokens = this.initializeSentenceTokens();
    }

    public getSentences(): string[] {
        return this.sentenceTokens.map((o: ISentenceData) => o.sentence);
    }

    public getTokens(): string[][] {
        return this.sentenceTokens.map((o: ISentenceData) => o.data);
    }

    public getSentenceTokens(): ISentenceData[] {
        return this.sentenceTokens;
    }

    private initializeSentenceTokens(): ISentenceData[] {
        const sentences: string[] = this.findSentences();
        const result: ISentenceData[] = [];
        for (const s of sentences) {
            const tokens: string[] = SentenceText.tokenizeSentence(s);
            if (tokens.length !== 0) {
                result.push({sentence: s, data: tokens});
            }
        }
        
        return result;
    }

    private findSentences(): string[] {
        const sentences: string[] = [];
        const ends: number[] = this.findSentenceEnds();
        let prev = 0;

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
        const indexes = [];
        const reg = /[.!?;]/g;
        let match = reg.exec(this.source);

        while (match !== null) {
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
            match = reg.exec(this.source);
        }

        return indexes;
    }

    private checkPeriod(text: string) {
        const abbr = ["Mr", "Ms", "Mrs", "Dr"];

        if (this.source[0] === " " && abbr.indexOf(text.substring(1, 3)) > -1) {
            return false;
        }

        if (abbr.indexOf(text.substring(0, 3)) > -1) {
            return false;
        }

        return !(text[3] === " " || text[3] === "\n");
    }
}
