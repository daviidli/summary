import {Theme, WithStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";
import * as React from "react";
import {IRank} from "../controller/IRank";
import CollapseCard from "./CollapseCard";
import RankComponent from "./RankComponent";

const percentColours = [
    { percent: 0.0, color: { r: 192, g: 57, b: 43 } },
    { percent: 1.0, color: { r: 106, g: 176, b: 76 } }
];

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
    },
    TR: {
        marginTop: theme.spacing.unit,
    }
});

interface IRankColour {
    percentage: number,
    sentence: string,
    colour: string
}

export interface Props extends WithStyles<typeof styles> {
    rank: IRank[] | string;
    summary: boolean;
    title: string;
}

interface State {
    ranking: [];
}

class RankController extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            ranking: []
        };
    }

    public getRankColour = (rank: IRank[]) => {
        const rankColour: IRankColour[] = [];
        
        for (const r of rank) {
            const colour = this.getPercentageColour(r.percentage);
            rankColour.push({percentage: r.percentage, sentence: r.sentence, colour});
        }

        return rankColour;
    };

    public getPercentageColour = (percent: number) => {
        let i;
        for (i = 1; i < percentColours.length - 1; i++) {
            if (percent <= percentColours[i].percent) {
                break;
            }
        }
        
        const lower = percentColours[i - 1];
        const upper = percentColours[i];
        const range = upper.percent - lower.percent;
        const rangePct = (percent - lower.percent) / range;
        const pctLower = 1 - rangePct;
        const pctUpper = rangePct;
        const colour = {
            r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
            g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
            b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
        };
        
        return 'rgb(' + [colour.r, colour.g, colour.b].join(',') + ')';
    };

    public actions = () => {
        if (typeof this.props.rank === "string") {
            return (
                <div>
                    <Typography variant="body1" style={{textAlign: "left"}}>
                        {this.props.rank}
                    </Typography>
                </div>
            );
        } else {
            const rColour = this.getRankColour(this.props.rank);
            return (
                <div>
                    {this.summaryCard()}
                    {rColour.map((r: IRankColour) => {
                        return (
                            <RankComponent value={r.percentage} sentence={r.sentence} key={r.sentence} colour={r.colour}/>
                        );
                    })}
                </div>
            );
        }
    };

    public render() {
        return (
            <div className={this.props.classes.TR}>
                <CollapseCard
                    heading={this.props.title}
                    actions={this.actions()}
                    margin={-20}
                />
            </div>
        );
    }

    private summaryCard = () => {
        if (this.props.summary && typeof this.props.rank !== "string") {
            return (
                <Card style={{margin: 10}}>
                    <CardContent style={{backgroundColor: "#1e88e5"}}>
                        <Typography variant="body1" style={{textAlign: "left"}}>
                            {this.props.rank.reduce((acc: string, v: IRank) => acc += " " + v.sentence, "")}
                        </Typography>
                    </CardContent>
                </Card>
            );
        } else {
            return;
        }
    }
}

export default withStyles(styles)(RankController);