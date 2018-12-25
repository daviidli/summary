import Grid from "@material-ui/core/Grid/Grid";
import * as React from "react";
import {IRank} from "../controller/IRank";
import Rake from "../controller/Rake";
import SentenceKeyword from "../controller/SentenceKeyword";
import SentenceText from "../controller/SentenceText";
import TextRank from "../controller/TextRank";
import {ISelected} from "./OptionsSelector";
import TextRankController from "./RankController";

export interface Props {
    mainText: string;
    selected: ISelected;
    sumLength: number;
}

export default class SummaryController extends React.Component<Props, {}> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div>
                <Grid container={true} spacing={16}>
                    {this.showSummary()}
                </Grid>
            </div>
        );
    }

    private readonly showSummary = () => {
        const summary: any = [];
        const numSelected: number = this.getNumberOfSelected();
        const gridUnits: any = numSelected > 1 ? 6 : 12;

        if (this.props.selected.textRank) {
            let rank: IRank[] | string = [];
            try {
                const st: SentenceText = new SentenceText(this.props.mainText);
                const tr = new TextRank(st);
                rank = tr.getOriginalOrderSummary(this.props.sumLength);
            } catch (err) {
                rank = err.message;
            }
            summary.push((
                <Grid item={true} xs={12} md={gridUnits}>
                    <TextRankController title={"TextRank Summary"} text={this.props.mainText} rank={rank} summary={true}/>
                </Grid>
            ));
        }
        
        if (this.props.selected.rake) {
            let rank: IRank[] | string = [];
            try {
                const sk: SentenceKeyword = new SentenceKeyword(this.props.mainText);
                const rk = new Rake(sk);
                rank = rk.getOriginalOrderSummary(this.props.sumLength);
            } catch (err) {
                rank = err.message;
            }
            summary.push((
                <Grid item={true} xs={12} md={gridUnits}>
                    <TextRankController title={"RAKE Summary"} text={this.props.mainText} rank={rank} summary={true}/>
                </Grid>
            ));
        }
        
        if (this.props.selected.textRankFull) {
            let rank: IRank[] | string = [];
            try {
                const st: SentenceText = new SentenceText(this.props.mainText);
                const tr = new TextRank(st);
                rank = tr.getSortedRank();
            } catch (err) {
                rank = err.message;
            }
            summary.push((
                <Grid item={true} xs={12} md={gridUnits}>
                    <TextRankController title={"TextRank"} text={this.props.mainText} rank={rank} summary={false}/>
                </Grid>
            ));
        }
        
        if (this.props.selected.rakeFull) {
            let rank: IRank[] | string = [];
            try {
                const sk: SentenceKeyword = new SentenceKeyword(this.props.mainText);
                const rk = new Rake(sk);
                rank = rk.getSortedRank();
            } catch (err) {
                rank = err.message;
            }
            summary.push((
                <Grid item={true} xs={12} md={gridUnits}>
                    <TextRankController title={"RAKE"} text={this.props.mainText} rank={rank} summary={false}/>
                </Grid>
            ));
        }
        
        return summary;
    };

    private readonly getNumberOfSelected = () => {
        let num: number = 0;
        for (const k of Object.keys(this.props.selected)) {
            if (this.props.selected[k] === true) {
                num++;
            }
        }
        return num;
    };
}