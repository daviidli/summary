import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import * as React from "react";
import InputField from "./InputField";

const styles = (theme: Theme) => createStyles({
    form: {
        marginTop: theme.spacing.unit * 3,
    },
    button: {
        marginTop: theme.spacing.unit,
    }
});

export interface Props extends WithStyles<typeof styles> {
    sendText: any;
}

interface State {
    mainText: string;
}

class InputController extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            mainText: ""
        };
    }

    public readonly handleInput = (e: any) => {
        this.setState({mainText: e.target.value});
    };

    public readonly handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.sendText(this.state.mainText);
    };

    public render() {
        return (
            <div>
                <form className={this.props.classes.form}>
                    <InputField
                        name="mainText"
                        title="Text to Summarize"
                        value={this.state.mainText}
                        placeholder=""
                        handleChange={this.handleInput}
                     />
                    <Button variant="contained" color="primary" onClick={this.handleSubmit} className={this.props.classes.button}>
                        Summarize
                    </Button>
                </form>
            </div>
        );
    }
}

export default withStyles(styles)(InputController);