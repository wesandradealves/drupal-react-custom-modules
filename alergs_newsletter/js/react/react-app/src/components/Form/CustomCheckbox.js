import React, { useEffect } from 'react';
import { Checkbox, Input, MaskedLabel, Label, CheckboxInner } from './styles.ts';
export default class FilteredList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: false || this.props.checked
        }            
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.value !== prevState.value)
            this.props.onChange(this.state.value)
    }

    checkAccept = (v) => {
        if(v)
            this.setState({
                value: !this.state.value
            })
	}     

    createHtml = (str) => {
        return {__html: str};
	} 

    render() {
        return (
            <Checkbox>
                <CheckboxInner>
                    <Input 
                        required={this.props.required} 
                        checked={this.state.value} 
                        onChange={this.checkAccept} 
                        value={this.props.value}
                        name={this.props.name}
                        id={this.props.value}
                        type={this.props.type} 
                    />
                    <MaskedLabel />
                </CheckboxInner>
                <Label dangerouslySetInnerHTML={this.createHtml(this.props.placeholder)} />
            </Checkbox>
        );
    }
}