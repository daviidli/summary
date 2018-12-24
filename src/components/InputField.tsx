import {createStyles, TextField, Theme, withStyles, WithStyles} from "@material-ui/core";
import * as React from "react";

const styles = (theme: Theme) => createStyles({
    textField: {
        margin: theme.spacing.unit * 0.5,
        width: "99.5%",
    }
});

export interface Props extends WithStyles<typeof styles> {
    name: string;
    title: string;
    value: string;
    placeholder: string;
    handleChange: any;
}

function InputField(props: Props) {
    return (
        <div className="form-group">
            <TextField
                className={props.classes.textField}
                id={props.name}
                name={props.name}
                label={props.title}
                multiline={true}
                rows="15"
                value={props.value}
                variant="outlined"
                onChange={props.handleChange}
                placeholder={props.placeholder}
            />
        </div>
    );
}

export default withStyles(styles)(InputField);