import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";
import * as React from "react";

export interface ISelected {
    textRankFull: boolean;
    textRank: boolean;
    rakeFull: boolean;
    rake: boolean;
}

export interface Props {
    isDisabled: any;
}

interface State {
    selected: ISelected
}

export default class OptionsSelector extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            selected: {
                textRankFull: false,
                textRank: false,
                rakeFull: false,
                rake: false
            }
        };
    }

    public readonly handleChange = (name: string) => (e: any) => {
        this.setState((state: any) => {
            const newState = state;
            newState.selected[name] = !state.selected[name];
            this.props.isDisabled(newState.selected.rake || newState.selected.textRank);
            return newState;
        });
    };

    public readonly getSelections = () => {
        return this.state.selected;
    };

    public render() {
        return (
            <div>
                <FormControl component="div">
                    <FormGroup row={true}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.selected.textRank}
                                    onChange={this.handleChange("textRank")}
                                    value="textRank"
                                    color="primary"
                                />
                            }
                            label="TextRank Summary"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.selected.rake}
                                    onChange={this.handleChange("rake")}
                                    value="rake"
                                    color="primary"
                                />
                            }
                            label="RAKE Summary"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.selected.textRankFull}
                                    onChange={this.handleChange("textRankFull")}
                                    value="textRankFull"
                                    color="primary"
                                />
                            }
                            label="TextRank Full Ranks"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.selected.rakeFull}
                                    onChange={this.handleChange("rakeFull")}
                                    value="rakeFull"
                                    color="primary"
                                />
                            }
                            label="RAKE Full Ranks"
                        />
                    </FormGroup>
                </FormControl>
            </div>
        );
    }
}