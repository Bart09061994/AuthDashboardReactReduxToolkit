import  { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { login, setError } from '../auth/authSlice';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  // const token = useSelector((state) => state.auth.token);
  const status = useSelector((state) => state.auth.status);
  // const error = useSelector((state) => state.auth.error);
  const navigate = useNavigate()

  // SENZA API
  
   const handleSubmit = (e) => {
     e.preventDefault();

     const storedUser = JSON.parse(localStorage.getItem("user"));
     if (
       storedUser &&
       storedUser.email === email &&
       storedUser.password === password
     ) {
       const token = Math.random().toString(36).substring(7);

       dispatch(login({ token }));
       toast.success("Login successful!");
       navigate("/dashboard"); // Naviga alla dashboard dopo il login
     } else {
       dispatch(setError("Invalid email or password"));
       toast.error("Invalid email or password");
     }
   };


  // CON API
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(login({ email, password }));
  // };

  // if (token) {
  //   toast.success("Login avvenuto con successo!");
  //   return <Navigate to="/dashboard" />;
  // } if (error) {
  //   toast.error(error.message);
  // }

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <Form onSubmit={handleSubmit} className="text-center">
            <h2 className="my-3">Login</h2>

            <Form.Group controlId="formBasicUsername">
              <Form.Control
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="text-center mt-3">
              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </div>

            <div className="text-center">
              <Link to="/register">
                <Button variant="link" className="w-100">
                  Non sei registrato? Registrati qui
                </Button>
              </Link>
            </div>
            {status === "loading" && <p>Loading...</p>}
          </Form>
        </Col>
      <ToastContainer />
      </Row>
    </Container>
  );
};

export default LoginForm;
