import React, {useEffect, useState} from "react";
import { Container, Button, Spinner, Message } from './styles.ts';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomCheckbox from "./CustomCheckbox";
import './styles.scss';

const Form = ({...props}) => {
    const [formData, setFormdata] = useState(props.formData);
    const [spinner, setSpinner] = useState(props.isLoading);
    const [msg, setMessage] = useState(props.msg);

    const onSubmit = async (e) => {
        try{
            var obj = {};
            var formData = new FormData(e.target);
            for (var key of formData.keys()) {
                obj[key] = formData.get(key);
            }

            props.onSubmit(obj);
            e.preventDefault();  
        } catch(e){
            console.log(e);
        }        
	} 

    useEffect(() => {
        setSpinner(props.isLoading)
        setMessage(props.msg)
    }, [props, spinner]);     

    return (
        <Container className={props.isLoading ? 'isLoading' : 'notLoaded'} onSubmit={onSubmit}>
            <Row>
                {props.formData.map((item, i) => (
                    <Col 
                        key={i} 
                        xs={12}
                        md={item.width || 12}>
                            {
                                item.type == 'textarea' ? <textarea
                                    required={item.required || false}
                                    // id={item.id} 
                                    name={item.id}
                                    placeholder={item.placeholder}
                                    onChange={ (e) => setFormdata({
                                        ...formData,
                                        [e.target.name]: e.target.value
                                    }) }
                                /> : item.type == 'checkbox' || item.type == 'radio' ? <CustomCheckbox 
                                        required={item.required || false}
                                        value={item.value}
                                        // checked={true}
                                        name={item.id}
                                        id={item.value}
                                        placeholder={item.placeholder}
                                        type={item.type} 
                                        onChange={ (v) => setFormdata({
                                            ...formData,
                                            [item.id]: v
                                        }) } /> :  <input 
                                    required={item.required || false}
                                    // id={item.id} 
                                    name={item.id}
                                    placeholder={item.placeholder}
                                    type={item.type} 
                                    onChange={ (e) => setFormdata({
                                        ...formData,
                                        [e.target.name]: e.target.value
                                    }) }
                                />
                            }
                    </Col>
                ))}                       
                <Col xs={12} md={props.sendRow.width || 12}>
                    <Button className="btn-send">
                        {spinner ?
                            <Spinner>
                                <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                            </Spinner>
                        : props.sendRow.label}
                    </Button>
                </Col>  
                {msg && (<Col xs={12} md={12}>
                    <Message>{msg}</Message>
                </Col>  )}                              
            </Row>                
            {/* {props.captcha.enable && (
                <GoogleReCaptcha
                    onVerify={token => {
                        this.setState({ formData: {
                            ...formData,
                            captcha: token
                        } })
                    }}
                />)}    */}
        </Container>
    );
};
 
export default Form;