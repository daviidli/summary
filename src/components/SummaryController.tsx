// import {Theme, WithStyles} from "@material-ui/core";
// import createStyles from "@material-ui/core/styles/createStyles";
// import withStyles from "@material-ui/core/styles/withStyles";
import * as React from "react";
import {IRank} from "../controller/IRank";
import Rake from "../controller/Rake";
import SentenceKeyword from "../controller/SentenceKeyword";
import SentenceText from "../controller/SentenceText";
import TextRank from "../controller/TextRank";
import {ISelected} from "./OptionsSelector";
import TextRankController from "./RankController";

// const styles = (theme: Theme) => createStyles({
//     TR: {
//         marginTop: theme.spacing.unit * 3,
//     }
// });

export interface Props {
    mainText: string;
    selected: ISelected;
}

export default class SummaryController extends React.Component<Props, {}> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div>
                {this.showSummary()}
            </div>
        );
    }

    private readonly showSummary = () => {
        const summary: any = [];
        
        if (this.props.selected.textRank) {
            let rank: IRank[] | string = [];
            try {
                const st: SentenceText = new SentenceText(this.props.mainText);
                const tr = new TextRank(st);
                rank = tr.getOriginalOrderSummary(5);
            } catch (err) {
                rank = err.message;
            }
            summary.push(<TextRankController title={"TextRank Summary"} text={this.props.mainText} rank={rank} summary={true}/>);
        }
        
        if (this.props.selected.rake) {
            let rank: IRank[] | string = [];
            try {
                const sk: SentenceKeyword = new SentenceKeyword(this.props.mainText);
                const rk = new Rake(sk);
                rank = rk.getOriginalOrderSummary(5);
            } catch (err) {
                rank = err.message;
            }
            summary.push(<TextRankController title={"RAKE Summary"} text={this.props.mainText} rank={rank} summary={true}/>);
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
            summary.push(<TextRankController title={"TextRank"} text={this.props.mainText} rank={rank} summary={false}/>);
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
            summary.push(<TextRankController title={"RAKE"} text={this.props.mainText} rank={rank} summary={false}/>);
        }
        
        return summary;
    };
}