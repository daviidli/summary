import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";
import * as React from "react";

interface State {
    textRankFull: boolean;
    textRank: boolean;
    rakeFull: boolean;
    rake: boolean;
}

export default class OptionsSelector extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            textRankFull: false,
            textRank: false,
            rakeFull: false,
            rake: false
        };
    }

    public readonly handleChange = (name: string) => (e: any) => {
        const obj: any = {};
        obj[name] = e.target.checked;
        this.setState(obj);
    };

    public readonly getSelections = () => {
        return {
            textRankFull: this.state.textRankFull,
            textRank: this.state.textRank,
            rakeFull: this.state.rakeFull,
            rake: this.state.rake
        }
    };

    public render() {
        return (
            <div>
                <FormControl component="div">
                    <FormGroup row={true}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.textRank}
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
                                    checked={this.state.rake}
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
                                    checked={this.state.textRankFull}
                                    onChange={this.handleChange("textRankFull")}
                                    value="textRankFull"
                                    color="primary"
                                />
                            }
                            label="TextRank Full List"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.rakeFull}
                                    onChange={this.handleChange("rakeFull")}
                                    value="rakeFull"
                                    color="primary"
                                />
                            }
                            label="RAKE Full List"
                        />
                    </FormGroup>
                </FormControl>
            </div>
        );
    }
}