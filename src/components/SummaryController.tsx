import Grid from "@material-ui/core/Grid/Grid";
import * as React from "react";
import {IRank} from "../controller/IRank";
import Rake from "../controller/Rake";
import SentenceKeyword from "../controller/SentenceKeyword";
import SentenceText from "../controller/SentenceText";
import TextRank from "../controller/TextRank";
import {loadURL} from "../controller/URL";
import {ISelected} from "./OptionsSelector";
import RankController from "./RankController";

interface ISummary {
    title: string;
    rank: IRank[];
    summary: boolean;
    gridUnits: any;
}

export interface Props {
    mainText: string;
    selected: ISelected;
    sumLength: number;
}

interface State {
    toRender: ISummary[];
}

export default class SummaryController extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            toRender: []
        }
    }

    public render() {
        return (
            <div>
                <Grid container={true} spacing={16}>
                    {this.state.toRender.map((sum: ISummary) => {
                        return (
                            <Grid item={true} xs={12} md={sum.gridUnits} key={sum.title}>
                                <RankController title={sum.title} rank={sum.rank} summary={sum.summary}/>
                            </Grid>
                        );
                    })}
                </Grid>
            </div>
        );
    }

    public showSummary = () => {
        const summary: ISummary[] = [];
        const promises: any = [];
        const numSelected: number = this.getNumberOfSelected();
        const gridUnits: any = numSelected > 1 ? 6 : 12;
        // console.log("show summary");

        if (this.props.selected.rake) {
            if (this.props.mainText.indexOf(" ") < 0) {
                promises.push(loadURL(this.props.mainText).then((data: string) => {
                    const sk: SentenceKeyword = new SentenceKeyword(data);
                    const rk = new Rake(sk);
                    const rank = rk.getOriginalOrderSummary(this.props.sumLength);
                    return summary.push({title: "RAKE Summary", rank, summary: true, gridUnits});
                }).catch((err) => {
                    return summary.push({title: "RAKE Summary", rank: err.toString(), summary: true, gridUnits});
                }));
            } else {
                try {
                    const sk: SentenceKeyword = new SentenceKeyword(this.props.mainText);
                    const rk = new Rake(sk);
                    const rank = rk.getOriginalOrderSummary(this.props.sumLength);
                    summary.push({title: "RAKE Summary", rank, summary: true, gridUnits});
                } catch (err) {
                    summary.push({title: "RAKE Summary", rank: err.toString(), summary: false, gridUnits});
                }
            }
        }

        if (this.props.selected.textRank) {
            if (this.props.mainText.indexOf(" ") < 0) {
                promises.push(loadURL(this.props.mainText).then((data: string) => {
                    const st: SentenceText = new SentenceText(data);
                    const tr = new TextRank(st);
                    const rank = tr.getOriginalOrderSummary(this.props.sumLength);
                    return summary.push({title: "TextRank Summary", rank, summary: true, gridUnits});
                }).catch((err) => {
                    return summary.push({title: "TextRank Summary", rank: err.toString(), summary: true, gridUnits});
                }));
            } else {
                try {
                    const st: SentenceText = new SentenceText(this.props.mainText);
                    const tr = new TextRank(st);
                    const rank = tr.getOriginalOrderSummary(this.props.sumLength);
                    summary.push({title: "TextRank Summary", rank, summary: true, gridUnits});
                } catch (err) {
                    summary.push({title: "TextRank Summary", rank: err.toString(), summary: false, gridUnits});
                }
            }
        }

        if (this.props.selected.textRankFull) {
            if (this.props.mainText.indexOf(" ") < 0) {
                promises.push(loadURL(this.props.mainText).then((data: string) => {
                    const st: SentenceText = new SentenceText(data);
                    const tr = new TextRank(st);
                    const rank = tr.getSortedRank();
                    return summary.push({title: "TextRank", rank, summary: false, gridUnits});
                }).catch((err) => {
                    return summary.push({title: "TextRank", rank: err.toString(), summary: false, gridUnits});
                }));
            } else {
                try {
                    const st: SentenceText = new SentenceText(this.props.mainText);
                    const tr = new TextRank(st);
                    const rank = tr.getSortedRank();
                    summary.push({title: "TextRank", rank, summary: false, gridUnits});
                } catch (err) {
                    summary.push({title: "TextRank", rank: err.toString(), summary: false, gridUnits});
                }
            }
        }

        if (this.props.selected.rakeFull) {
            if (this.props.mainText.indexOf(" ") < 0) {
                promises.push(loadURL(this.props.mainText).then((data: string) => {
                    const sk: SentenceKeyword = new SentenceKeyword(data);
                    const rk = new Rake(sk);
                    const rank = rk.getSortedRank();
                    return summary.push({title: "RAKE", rank, summary: false, gridUnits});
                }).catch((err) => {
                    return summary.push({title: "RAKE", rank: err.toString(), summary: false, gridUnits});
                }));
            } else {
                try {
                    const sk: SentenceKeyword = new SentenceKeyword(this.props.mainText);
                    const rk = new Rake(sk);
                    const rank = rk.getSortedRank();
                    summary.push({title: "RAKE", rank, summary: false, gridUnits});
                } catch (err) {
                    summary.push({title: "RAKE", rank: err.toString(), summary: false, gridUnits});
                }
            }
        }

        if (promises === []) {
            return;
        }

        Promise.all(promises).then(() => {
            this.setState({toRender: summary});
            // console.log(summary);
        })
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