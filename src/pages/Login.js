import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../context/firebase';

import { Form } from '../components';
import { HeaderContainer } from '../containers/header';
import { FooterContainer } from '../containers/footer';

import * as ROUTES from '../constants/routes';

export default function Login() {
  const history = useNavigate();
  const { firebase } = useContext(FirebaseContext);

  const [error, setError] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const isInvalid = (password === '') | (emailAddress === '');

  const handleLogin = (event) => {
    event.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(emailAddress, password)
      .then(() => {
        history.push(ROUTES.BROWSE);
      })
      .catch((error) => {
        setEmailAddress('');
        setPassword('');
        setError(error.message);
      });
  };

  return (
    <>
      <HeaderContainer>
        <Form>
          <Form.Title>Log In</Form.Title>
          {error && <Form.Error>{error}</Form.Error>}

          <Form.Base onSubmit={handleLogin} method="POST">
            <Form.Input
              placeholder="Email address"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <Form.Input
              type="password"
              value={password}
              autoComplete="off"
              placeholder="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
            <Form.Submit disabled={isInvalid} type="submit">
              Log In
            </Form.Submit>

            <Form.Text>
              New to Netflix? <Form.Link to="/signup">Sign up now.</Form.Link>
            </Form.Text>
            <Form.TextSmall>
              This page is protected by Google reCAPTCHA.
            </Form.TextSmall>
          </Form.Base>
        </Form>
      </HeaderContainer>
      <FooterContainer />
    </>
  );
}
