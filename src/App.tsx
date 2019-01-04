import {Theme, WithStyles} from "@material-ui/core";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import withStyles from "@material-ui/core/styles/withStyles";
import * as React from 'react';
import './App.css';
import InputController from "./components/InputController";
import {ISelected} from "./components/OptionsSelector";
import SummaryController from "./components/SummaryController";

const muiTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#3490FF"
        },
        secondary: {
            main: "#FF005E",
        },
    },
});

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        margin: "2%",
        marginLeft: "4%",
        marginRight: "4%"
    },
    inputs: {
        marginBottom: theme.spacing.unit * 3
    }
});

export interface Props extends WithStyles<typeof styles> {

}

interface State {
    mainText: string,
    selected: ISelected,
    sumLength: number
}

class App extends React.Component<Props, State> {
    private summaryChild: any = React.createRef<SummaryController>();

    constructor(props: any) {
        super(props);

        this.state = {
            mainText: "",
            selected: {
                textRankFull: false,
                textRank: false,
                rakeFull: false,
                rake: false
            },
            sumLength: 5
        };
    }

    public handleText = (text: string, selected: ISelected, sumLength: number) => {
        this.setState({mainText: text, selected, sumLength}, () => {
            if (this.summaryChild.current !== null) {
                this.summaryChild.current.showSummary();
            }
        });
    };

    public render() {
        return (
            <div className="App">
                <MuiThemeProvider theme={muiTheme}>
                    <div className={this.props.classes.root}>
                        <img src={"summary.png"} alt={"summary"} style={{height: 100, width: "auto"}}/>
                        <div className={this.props.classes.inputs}>
                            <InputController sendText={this.handleText} className={this.props.classes.inputs}/>
                        </div>
                        <SummaryController ref={this.summaryChild} mainText={this.state.mainText} selected={this.state.selected} sumLength={this.state.sumLength}/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default withStyles(styles)(App);
