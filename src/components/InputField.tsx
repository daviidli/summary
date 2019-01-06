import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField/TextField";
import * as React from "react";

const styles = (theme: Theme) => createStyles({
    textField: {
        margin: theme.spacing.unit * 0.5,
        // width: "99.5%",
        width: "100%"
    }
});

export interface Props extends WithStyles<typeof styles> {
    name: string;
    title: string;
    value: string;
    placeholder: string;
    handleChange: any;
    className: any;
}

function InputField(props: Props) {
    return (
        <div className={props.className}>
            <TextField
                className={props.classes.textField}
                id={props.name}
                name={props.name}
                label={props.title}
                multiline={true}
                rows="12"
                value={props.value}
                variant="outlined"
                onChange={props.handleChange}
                placeholder={props.placeholder}
            />
        </div>
    );
}

export default withStyles(styles)(InputField);