import {Matrix} from "mathjs";
import * as math from "mathjs";
import {IRank} from "./IRank";
import {ISentenceData} from "./ISentenceAbstract";
import RankAbstract from "./RankAbstract";
import SentenceKeyword from "./SentenceKeyword";

interface IRankTemp {
    rank: number,
    sentence: string,
    data: string[]
}

export default class Rake extends RankAbstract {
    private static findAllCombinations(arr: string[]): string[][] {
        const combinations: string[][] = [];

        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                combinations.push([arr[i], arr[j]]);
            }
        }

        return combinations;
    }

    private static calculatePercentage(rank: IRankTemp[]): IRank[] {
        const result: IRank[] = [];
        const ranks = rank.map((r) => r.rank);

        const min: number = Math.min(...ranks);
        const diff: number = Math.max(...ranks) - min;

        for (let i = 0; i < rank.length; i++) {
            const percentage: number = (ranks[i] - min) / diff;
            result.push({rank: rank[i].rank, percentage, sentence: rank[i].sentence, data: rank[i].data});
        }

        return result;
    }

    private keywordScores: Map<string, number>;

    constructor(sk: SentenceKeyword) {
        super(sk);
    }

    protected initialize(): void {
        this.keywordScores = new Map<string, number>();
        this.calculateKeywordScores(this.coOccurrenceGraph());
    }

    protected rank(): IRank[] {
        return this.rake();
    }

    private rake(): IRank[] {
        const result: IRankTemp[] = [];
        const sentenceKeywords: ISentenceData[] = this.sa.getSentenceData();

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

        return Rake.calculatePercentage(result);
    }
    
    private coOccurrenceGraph(): number[][] {
        const allKeywords: string[] = (this.sa as SentenceKeyword).getAllKeywords();

        if (allKeywords.length === 0) {
            throw new Error("no keywords present");
        }
        
        const graph: any = (math.zeros(allKeywords.length, allKeywords.length) as Matrix).toArray();
        
        const sentenceKeywords = this.sa.getData();
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
        const allWords: string[] = (this.sa as SentenceKeyword).getAllKeywords();

        for (const word of allWords) {
            const i: number = allWords.indexOf(word);

            const deg: number = math.sum(graph[i]);
            const freq: number = graph[i][i];
            const score: number = deg/freq;

            this.keywordScores.set(word, score);
        }

        return this.keywordScores;
    };
}