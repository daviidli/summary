
import {Theme, WithStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Grid from "@material-ui/core/Grid/Grid";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";
import * as React from "react";

const styles = (theme: Theme) => createStyles({
    card: {
        margin: theme.spacing.unit,
    },
    root: {
        flexGrow: 1,
    },
    sentence: {
        textAlign: "left",
    },
    val: {
        fontSize: 20,
    }
});

export interface Props extends WithStyles<typeof styles> {
    colour: string;
    sentence: string;
    value: number;
    
}

function RankComponent(props: Props) {
    const colour = props.colour === "rgb(NaN,NaN,NaN)" ? "#616161" : props.colour;
    return (
        <Card className={props.classes.card}>
            <CardContent style={{backgroundColor: colour}}>
                <Grid container={true} className={props.classes.root} spacing={16}>
                    <Grid item={true} xs={4}>
                        <Typography variant="h6" className={props.classes.val}>
                            {(props.value * 100).toFixed(3)}%
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={8}>
                        <Typography variant="body1" className={props.classes.sentence}>
                            {props.sentence}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default withStyles(styles)(RankComponent);