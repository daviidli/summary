import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField/TextField";
import * as React from "react";

const styles = (theme: Theme) => createStyles({
    textField: {
        margin: theme.spacing.unit * 0.5,
        width: 200,
    }
});

export interface Props extends WithStyles<typeof styles> {
    disabled: boolean;
    name: string;
    title: string;
    value: number;
    placeholder: string;
    inputType: string;
    handleChange: any;
}

function InputBox(props: Props) {
    return (
        <div className="form-group">
            <TextField
                className={props.classes.textField}
                disabled={props.disabled}
                id={props.name}
                name={props.name}
                label={props.title}
                type={props.inputType}
                value={props.value}
                onChange={props.handleChange}
                placeholder={props.placeholder}
            />
        </div>
    );
}

export default withStyles(styles)(InputBox);