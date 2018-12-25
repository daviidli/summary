import {Theme, WithStyles} from "@material-ui/core";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import withStyles from "@material-ui/core/styles/withStyles";
import * as React from 'react';
import './App.css';
import InputController from "./components/InputController";
import SummaryController from "./components/SummaryController";

const muiTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#1e88e5"
        },
        secondary: {
            main: "#f44336",
        },
    },
});

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
    }
});

export interface Props extends WithStyles<typeof styles> {

}

interface State {
    mainText: string
}

class App extends React.Component<Props, State> {
    private summaryChild: any = React.createRef<SummaryController>();

    constructor(props: any) {
        super(props);

        this.state = {
            mainText: ""
        };
    }

    public handleText = (text: string) => {
        if (text !== "" && this.summaryChild.current !== null) {
            this.setState({mainText: text});
            this.summaryChild.current.performSummary();
        }
    };

    public render() {
        return (
            <div className="App">
                <MuiThemeProvider theme={muiTheme}>
                    <div className={this.props.classes.root}>
                        <div style={{margin: "5%", width: "auto"}}>
                            <InputController sendText={this.handleText}/>
                            <SummaryController ref={this.summaryChild} mainText={this.state.mainText}/>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default withStyles(styles)(App);
