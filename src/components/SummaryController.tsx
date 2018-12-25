// import {Theme, WithStyles} from "@material-ui/core";
// import createStyles from "@material-ui/core/styles/createStyles";
// import withStyles from "@material-ui/core/styles/withStyles";
import * as React from "react";
import {IRank} from "../controller/IRank";
import Rake from "../controller/Rake";
import SentenceKeyword from "../controller/SentenceKeyword";
import SentenceText from "../controller/SentenceText";
import TextRank from "../controller/TextRank";
import OptionsSelector from "./OptionsSelector";
import TextRankController from "./RankController";

// const styles = (theme: Theme) => createStyles({
//     TR: {
//         marginTop: theme.spacing.unit * 3,
//     }
// });

export interface ISelected {
    textRankFull: boolean;
    textRank: boolean;
    rakeFull: boolean;
    rake: boolean;
}

export interface Props {
    mainText: string;
}

interface State {
    selected: ISelected;
}

export default class SummaryController extends React.Component<Props, State> {
    private optionsChild: any = React.createRef<OptionsSelector>();

    constructor(props: any) {
        super(props);

        this.state = {
            selected: {
                textRankFull: false,
                textRank: false,
                rakeFull: false,
                rake: false
            }
        };
    }

    public readonly performSummary = () => {
        const selection: any = this.optionsChild.current.getSelections();
        this.setState({selected: selection});
    };

    public render() {
        return (
            <div>
                <OptionsSelector ref={this.optionsChild}/>
                {this.showSummary()}
            </div>
        );
    }

    private readonly showSummary = () => {
        const summary: any = [];
        
        if (this.state.selected.textRank) {
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
        
        if (this.state.selected.rake) {
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
        
        if (this.state.selected.textRankFull) {
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
        
        if (this.state.selected.rakeFull) {
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

// export default withStyles(styles)(SummaryController);