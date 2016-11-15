import React from "react";
import {FormControl} from "react-bootstrap";
import $ from "jquery";

class ValidFormControl extends React.Component {

    static defaultProps = {
        pattern: "/.*/",
        required: false
    }


    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }
    getValidationState = () => {
        if (this.props.pattern.test(this.state.value)) {
            return 'success';
        } else {
            return 'error';
        }
    }




    render() {
        return <FormControl {...this.props} />
    }

}
export default ValidFormControl;