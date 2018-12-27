import {ISentenceData} from "./ISentenceAbstract";
import SentenceAbstract from "./SentenceAbstract";

export default class SentenceText extends SentenceAbstract {
    constructor(source: string) {
        super(source);
    }

    protected initializeSentenceData(): ISentenceData[] {
        const sentences: string[] = this.findSentences();
        const result: ISentenceData[] = [];
        for (const s of sentences) {
            const tokens: string[] = this.extractTokens(s);
            if (tokens.length !== 0) {
                result.push({sentence: s, data: tokens});
            }
        }
        
        return result;
    }

    private extractTokens(sentence: string): string[] {
        const result = [];

        const stopwords = super.getStopWords();
        const words = sentence.toLowerCase().replace(/[.,]/g, "").split(" ");
        for (const word of words) {
            if (stopwords.indexOf(word) < 0) {
                result.push(word);
            }
        }

        return result;
    }
}
