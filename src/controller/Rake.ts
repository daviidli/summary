import {Matrix} from "mathjs";
import * as math from "mathjs";
import {IRank} from "./IRank";
import SentenceKeyword from "./SentenceKeyword";
import {ISentenceData} from "./ISentenceAbstract";

export default class Rake {
    private static findAllCombinations(arr: string[]): string[][] {
        const combinations: string[][] = [];

        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                combinations.push([arr[i], arr[j]]);
            }
        }

        return combinations;
    }

    private sk: SentenceKeyword;
    private readonly keywordScores: Map<string, number>;
    private readonly originalOrderRank: IRank[];
    private readonly sortedRank: IRank[];

    constructor(sk: SentenceKeyword) {
        this.sk = sk;
        this.keywordScores = new Map<string, number>();
        this.calculateKeywordScores(this.coOccurrenceGraph());
        this.originalOrderRank = this.rake();
        this.sortedRank = this.sortRank();
    }

    public getOriginalOrderRank(): IRank[] {
        return this.originalOrderRank;
    }

    private rake(): IRank[] {
        const result: IRank[] = [];
        const sentenceKeywords: ISentenceData[] = this.sk.getSentenceData();

        for (const s of sentenceKeywords) {
            let sentenceScore: number = 0;

            for (const kw of s.data) {
                let words: string[];
                if (kw.indexOf(" ") > -1) {
                    words = kw.split(" ");
                } else {
                    words = [kw];
                }

                for (const word of words) {
                    const score = this.keywordScores.get(word);
                    if (score === undefined) {
                        throw new Error("word does not have a score");
                    }
                    sentenceScore += score;
                }
            }

            result.push({rank: sentenceScore, sentence: s.sentence, data: s.data});
        }

        return result;
    }
    
    private coOccurrenceGraph(): number[][] {
        const allKeywords: string[] = this.sk.getAllKeywords();

        if (allKeywords.length === 0) {
            throw new Error("no keywords present");
        }
        
        const graph: any = (math.zeros(allKeywords.length, allKeywords.length) as Matrix).toArray();
        
        const sentenceKeywords = this.sk.getData();
        for (const keywords of sentenceKeywords) {
            for (const keyword of keywords) {
                // if keyword is made up of more than one word
                if (keyword.indexOf(" ") > -1) {
                    const compoundKeywords: string[] = keyword.split(" ");
                    for (const c of compoundKeywords) {
                        const i = allKeywords.indexOf(c);
                        graph[i][i] += 1;
                    }

                    // find all possible combinations of words for keyword
                    const words: string[][] = Rake.findAllCombinations(compoundKeywords);
                    for (const c of words) {
                        const x = allKeywords.indexOf(c[0]);
                        const y = allKeywords.indexOf(c[1]);

                        graph[x][y] += 1;
                        graph[y][x] += 1;
                    }
                } else {
                    const i = allKeywords.indexOf(keyword);
                    graph[i][i] += 1;
                }
            }
        }
        
        return graph;
    }

    private calculateKeywordScores(graph: number[][]): Map<string, number> {
        const allWords = this.sk.getAllKeywords();

        for (const word of allWords) {
            const i = allWords.indexOf(word);

            const deg = math.sum(graph[i]);
            const freq = graph[i][i];
            const score = deg/freq;

            this.keywordScores.set(word, score);
        }

        return this.keywordScores;
    };

    private sortRank(): IRank[] {
        const sorted: IRank[] = this.originalOrderRank;

        sorted.sort((a, b) => {
            if (a.rank > b.rank) {
                return -1;
            }
            if (a.rank < b.rank) {
                return 1;
            }
            return 0;
        });

        return sorted;
    }
}