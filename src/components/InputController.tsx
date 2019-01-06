import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import * as React from "react";
import {loadURL} from "../controller/URL";
import InputField from "./InputField";
import InputFieldShort from "./InputFieldShort";
import OptionsSelector from "./OptionsSelector";

const styles = (theme: Theme) => createStyles({
    button: {
        marginTop: theme.spacing.unit * 3,
    },
    grid: {
        marginLeft: 1,
        marginBottom: theme.spacing.unit,
        marginTop: theme.spacing.unit * 3
    },
    buttonTwo: {
        marginTop: theme.spacing.unit
    },
    text: {
        marginBottom: theme.spacing.unit * 2
    }
});

export interface Props extends WithStyles<typeof styles> {
    sendText: any;
}

interface State {
    url: string;
    mainText: string;
    sumLength: number;
}

class InputController extends React.Component<Props, State> {
    private optionsChild: any = React.createRef<OptionsSelector>();

    constructor(props: any) {
        super(props);

        this.state = {
            url: "",
            mainText: "",
            sumLength: 5
        };
    }

    public readonly handleInput = (e: any) => {
        this.setState({mainText: e.target.value});
    };

    public readonly handleUrlInput = (e: any) => {
        this.setState({url: e.target.value});
    };

    public readonly handleSubmit = (e: any) => {
        e.preventDefault();
        if (this.optionsChild.current !== null) {
            this.props.sendText(this.state.mainText, this.optionsChild.current.getSelections(), this.optionsChild.current.getSumLength());
        }
    };

    public readonly loadFromWebsite = (e: any) => {
        e.preventDefault();

        loadURL(this.state.url).then((data) => {
            this.setState({
                mainText: data
            });
        });
    };

    public render() {
        return (
            <div>
                <form>
                    <Grid container={true} spacing={8} className={this.props.classes.grid}>
                        <Grid item={true} xs={true} sm={true} md={true} lg={true} key={"website"}>
                            <InputFieldShort
                                name="website"
                                title="Link to Website"
                                value={this.state.url}
                                placeholder=""
                                handleChange={this.handleUrlInput}
                            />
                        </Grid>
                        <Grid item={true} xs={12} sm={3} md={2} lg={2} key={"button"}>
                            <Button variant="contained" color="primary" onClick={this.loadFromWebsite} className={this.props.classes.buttonTwo}>
                                Parse Website
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <form>
                    <InputField
                        name="mainText"
                        title="Text to Summarize"
                        value={this.state.mainText}
                        placeholder=""
                        handleChange={this.handleInput}
                        className={this.props.classes.text}
                     />
                    <OptionsSelector ref={this.optionsChild} />
                    <Button variant="contained" color="primary" onClick={this.handleSubmit} className={this.props.classes.button}>
                        Summarize
                    </Button>
                </form>
            </div>
        );
    }
}

export default withStyles(styles)(InputController);