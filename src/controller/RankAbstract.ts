import {IRank} from "./IRank";
import SentenceAbstract from "./SentenceAbstract";

export default abstract class RankAbstract {
    protected sa: SentenceAbstract;
    private readonly originalOrderRank: IRank[];
    private readonly sortedRank: IRank[];

    protected constructor(sa: SentenceAbstract) {
        this.sa = sa;
        this.initialize();
        this.originalOrderRank = this.rank();
        this.sortedRank = this.sortRank();
    }

    public getOriginalOrderRank(): IRank[] {
        return this.originalOrderRank;
    }

    public getSortedRank(): IRank[] {
        return this.sortedRank;
    }

    public getRankedSummary(n: number) {
        return this.sortedRank.slice(0, n);
    }

    public getOriginalOrderSummary(n: number) {
        const topN = this.sortedRank.slice(0, n).map((r) => r.sentence);
        const result = [];

        for (const s of this.originalOrderRank) {
            if (topN.indexOf(s.sentence) > -1) {
                result.push(s);
            }
        }

        return result;
    }

    protected abstract initialize(): void;
    protected abstract rank(): IRank[];

    private sortRank(): IRank[] {
        const sorted: IRank[] = this.originalOrderRank.slice();

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