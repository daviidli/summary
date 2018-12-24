import {Theme, WithStyles} from "@material-ui/core";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import withStyles from "@material-ui/core/styles/withStyles";
import * as React from 'react';
import './App.css';
import InputController from "./components/InputController";
import TextRankController from "./components/TextRankController";

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
    },
    TR: {
        marginTop: theme.spacing.unit * 3,
    }
});

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

export interface Props extends WithStyles<typeof styles> {

}

interface State {
    mainText: string
}

class App extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            mainText: ""
        };
    }

    public handleText = (text: string) => {
        if (text !== "") {
            this.setState({mainText: text});
        }
    };

    public render() {
        return (
            <div className="App">
                <MuiThemeProvider theme={muiTheme}>
                    <div className={this.props.classes.root}>
                        <div style={{margin: "5%", width: "auto"}}>
                            <InputController sendText={this.handleText}/>
                            <TextRankController text={this.state.mainText} className={this.props.classes.TR}/>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default withStyles(styles)(App);
