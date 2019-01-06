import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";
import * as React from "react";
import InputBox from "./InputBox";

export interface ISelected {
    textRankFull: boolean;
    textRank: boolean;
    rakeFull: boolean;
    rake: boolean;
}

interface State {
    selected: ISelected,
    sumLength: number,
    disabled: boolean
}

export default class OptionsSelector extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            selected: {
                textRankFull: false,
                textRank: false,
                rakeFull: false,
                rake: false
            },
            sumLength: 5,
            disabled: true,
        };
    }

    public readonly handleChange = (name: string) => (e: any) => {
        this.setState((state: any) => {
            const newState = state;
            newState.selected[name] = !state.selected[name];
            newState.disabled = !(newState.selected.rake || newState.selected.textRank);
            return newState;
        });
    };

    public readonly handleSum = (e: any) => {
        this.setState({sumLength: e.target.value});
    };


    public readonly getSelections = () => {
        return this.state.selected;
    };

    public readonly getSumLength = () => {
        return this.state.sumLength;
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
                <InputBox
                    inputType={"number"}
                    disabled={this.state.disabled}
                    name={"sumLength"}
                    placeholder={"5"}
                    value={this.state.sumLength}
                    handleChange={this.handleSum}
                    title={"Summary Length"}
                />
            </div>
        );
    }
}