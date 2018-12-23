import * as math from "mathjs";
import {Matrix} from "mathjs";
import {IRank} from "./IRank";
import RankAbstract from "./RankAbstract";
import SentenceText from "./SentenceText";

const EPS = 0.00001;
const DAMP = 0.60;

export default class TextRank extends RankAbstract {
    private static similarity(s1: string[], s2: string[]): number {
        const all: string[] = Array.from(new Set(s1.concat(s2)));

        const v1: any = (math.zeros(all.length) as Matrix).toArray();
        const v2: any = (math.zeros(all.length) as Matrix).toArray();

        for (const w of s1) {
            v1[all.indexOf(w)] += 1;
        }

        for (const w of s2) {
            v2[all.indexOf(w)] += 1;
        }

        return TextRank.cosine_similarity(v1, v2);
    }
    
    private static cosine_similarity(v1: number[], v2: number[]): number {
        return math.dot(v1, v2) / (TextRank.norm(v1) * TextRank.norm(v2));
    }
    
    private static norm(v: number[]): number {
        let norm = 0;
        for (const i of v) {
            norm += i * i;
        }
        return math.sqrt(norm);
    }

    private static rankSentences(matrix: number[][]): number[] {
        const length: number = matrix.length;
        if (length === 0) {
            return [];
        }

        let prev: any = Array(length).fill(1 / length);

        while (true) {
            const m: any = math.multiply(math.transpose(matrix), prev);
            const curr: any = math.add(math.multiply(m, DAMP), (1 - DAMP) / length);
            const delta: number = math.sum(math.abs(math.subtract(curr, prev) as number));

            if (Number.isNaN(delta)) {
                return [];
            }

            if (delta <= EPS) {
                return curr;
            }
            prev = curr;
        }
    }

    constructor(st: SentenceText) {
        super(st);
    }

    protected initialize(): void {
        return;
    }

    protected rank(): IRank[] {
        return this.textRank();
    }

    private textRank() {
        const result: IRank[] = [];
        const ranks: number[] = TextRank.rankSentences(this.similarity_matrix());
        const st = this.sa.getSentenceData();
        
        for (let i = 0; i < ranks.length; i++) {
            const r: IRank = {rank: ranks[i], sentence: st[i].sentence, data: st[i].data};
            result.push(r);
        }
        
        return result;
    }
    
    private similarity_matrix(): any {
        const tokens: string[][] = this.sa.getData();
        const length: number = tokens.length;
        let matrix: any = math.zeros(length, length) as Matrix;
        matrix = matrix.toArray();

        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                if (i === j) {
                    matrix[i][j] = 1;
                    continue;
                }
                matrix[i][j] = TextRank.similarity(tokens[i], tokens[j]);
            }

            const sum: number = math.sum(matrix[i]);
            if (sum > 0) {
                matrix[i] = matrix[i].map((a: number) => a / sum);
            }
        }

        return matrix;
    };
}