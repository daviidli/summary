import {createStyles, withStyles, WithStyles} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import {Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classNames from 'classnames';
import * as React from 'react';

const styles = (theme: Theme) => createStyles({
    card: {
        marginTop: theme.spacing.unit * 2,
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.standard,
        }),
        marginLeft: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginRight: -8,
        },
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }
});

export interface Props extends WithStyles<typeof styles> {
    margin: number;
    actions: any;
    heading: string;
}

interface State {
    expanded: boolean;
}

class CollapseCard extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            expanded: false
        };
    }

    public readonly handleExpandClick = () => {
        this.setState((state: any) => ({ expanded: !state.expanded }));
    };

    public render() {
        return (
            <Card className={this.props.classes.card}>
                <CardActions>
                    <Typography variant="subtitle1" style={{marginLeft: 15}}>{this.props.heading}</Typography>
                    <IconButton
                        className={classNames(this.props.classes.expand, {
                            [this.props.classes.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit={true}>
                    <CardContent style={{marginTop: this.props.margin}}>
                        {this.props.actions}
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}

export default withStyles(styles)(CollapseCard);