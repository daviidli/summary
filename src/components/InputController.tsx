import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import * as React from "react";
import InputBox from "./InputBox";
import InputField from "./InputField";
import OptionsSelector from "./OptionsSelector";

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
    sumLength: number;
    disabled: boolean;
}

class InputController extends React.Component<Props, State> {
    private optionsChild: any = React.createRef<OptionsSelector>();

    constructor(props: any) {
        super(props);

        this.state = {
            mainText: "",
            sumLength: 5,
            disabled: true
        };
    }

    public readonly handleInput = (e: any) => {
        this.setState({mainText: e.target.value});
    };

    public readonly handleSubmit = (e: any) => {
        e.preventDefault();
        if (this.optionsChild.current !== null) {
            this.props.sendText(this.state.mainText, this.optionsChild.current.getSelections(), this.state.sumLength);
        }
    };

    public readonly updateDisabled = (disabled: boolean) => {
        this.setState({disabled: !disabled});
    };

    public readonly handleSum = (e: any) => {
        this.setState({sumLength: e.target.value});
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
                    <OptionsSelector ref={this.optionsChild} isDisabled={this.updateDisabled}/>
                    <InputBox
                        inputType={"number"}
                        disabled={this.state.disabled}
                        name={"sumLength"}
                        placeholder={"5"}
                        value={this.state.sumLength}
                        handleChange={this.handleSum}
                        title={"Summary Sentence Length"}
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