import React, { useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authenticateAction } from '../redux/actions/authenticateAction';
import { Form, Button, Container } from 'react-bootstrap';

const Login = () => {
    const loginId = useRef();
    const loginPassword = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginUser = (event) => {
        if (event !== undefined) {
            event.preventDefault();
        }
        dispatch(authenticateAction.setUsers(loginId.current.value, loginPassword.current.value));
        navigate(-1);
    }
    const enterLogin = (event) => {
        if (event.key === 'Enter') {
            loginUser(event);
        }
    }
    const tempUserLogin = () => {
        loginId.current.value = 'temp_user';
        loginPassword.current.value = '1231';
        loginUser();
    }

    useEffect(() => {
        if (loginId.current !== null) loginId.current.focus();
    }, [])

    return (
        <div className='login-main'>
            <Container style={{ 'padding-top': '10em', width: '50%' }}>
                <Form onSubmit={(event) => loginUser(event)}>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>ID</Form.Label>
                        <Form.Control ref={loginId} type="text" placeholder="Enter ID" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onKeyDown={(event) => enterLogin(event)} ref={loginPassword} type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">로그인</Button>
                    <Button variant="primary" onClick={tempUserLogin} style={{ 'margin-left': '10px' }}>임시유저 로그인</Button>
                </Form>
            </Container>
        </div>
    )
}

export default Login
