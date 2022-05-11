import React from "react";
import { Container, Button, CaptchaField } from './styles.ts';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomCheckbox from "./CustomCheckbox";
import InputMask from 'react-input-mask';
import MaterialInput from '@material-ui/core/Input';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';

export default class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            captchaError: false,
            submitDisabled: true,
            captchaValue: '',
            formData: {}
        }         
    }

    componentDidUpdate = () => {}

    componentDidMount = () => {
        if(this.props.captcha.enable) loadCaptchaEnginge(6, 'rgb(41, 51, 65)', '#ffffff'); 

        function keyExist(arr, key, value) {
            return arr.some(function(el) {
                return el[key] === value;
            }); 
        }        
        if(keyExist(this.props.formData, 'id', 'telefone')) {
            document.getElementById('telefone').addEventListener('input', function (e) {
                var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,4})(\d{0,4})/);
                e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
            });  
        } 
    }   

	onSubmit = (e) => {
        e.preventDefault();

        if(validateCaptcha(this.state.captchaValue)) {
            this.setState({captchaError: false})

            var obj = {};
            var formData = new FormData(e.target);
            for (var key of formData.keys()) {
                obj[key] = formData.get(key);
            }
            this.props.onSubmit(obj);
        } else {
            this.setState({
                captchaError: true,
                captchaValue: ''
            }), document.getElementById("captcha").value = ""
        }
	}  
  
    render() {
        return (
            <Container id={this.props.formId} name={this.props.formId} onSubmit={(e) => this.onSubmit(e)}>
                <Row>
                    {this.props.formData.map((item, i) => (
                        <Col 
                            key={i} 
                            xs={12}
                            md={item.width || 12}>
                                {
                                    item.type == 'textarea' ? <textarea
                                        required={item.required || false}
                                        id={item.id} 
                                        mask={item.mask ? item.mask : null}
                                        name={item.id}
                                        placeholder={item.placeholder}
                                        onChange={ (e) => this.setState({ formData: {
                                            ...this.state.formData,
                                            [e.target.name]: e.target.value
                                        } }) }
                                    /> : item.type == 'checkbox' || item.type == 'radio' ? <CustomCheckbox 
                                            required={item.required || false}
                                            id={item.id} 
                                            // checked={true}
                                            name={item.id}
                                            placeholder={item.placeholder}
                                            type={item.type} 
                                            onChange={ (v) => this.setState({ formData: {
                                                ...this.state.formData,
                                                [item.id]: v
                                            } }) } /> :  <input 
                                        required={item.required || false}
                                        id={item.id} 
                                        name={item.id}
                                        placeholder={item.placeholder}
                                        type={item.type} 
                                        mask={item.mask ? item.mask : null}
                                        onChange={ (e) => this.setState({ formData: {
                                            ...this.state.formData,
                                            [e.target.name]: e.target.value
                                        } }) }
                                    />
                                }
                        </Col>
                    ))}    

                    <Col xs={12} md={this.props.sendRow.width || 12}>
                        <Button disabled={this.props.captcha.enable && this.state.submitDisabled} className="btn-send">{this.props.sendRow.label}</Button>
                    </Col>    

                    {this.props.captcha.enable && (
                        <Col className="captcha" xs={this.props.captcha.width}>
                            <CaptchaField hasError={this.state.captchaError} type="text" id="captcha" onChange={(e) => 
                                this.setState({
                                    captchaError: false,
                                    captchaValue: e.target.value,
                                    submitDisabled: e.target.value ? false : true
                                }) 
                            } name="captcha" />
                            <LoadCanvasTemplateNoReload />
                        </Col>
                    )}                                
                </Row>                
                 
            </Container>
        );
    }
}