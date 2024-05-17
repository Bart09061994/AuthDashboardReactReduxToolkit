// import { useDispatch } from "react-redux";
import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { register, selectError, setError } from "../auth/authSlice";
import {ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  // const token = useSelector((state) => state.auth.token);
  const status = useSelector((state) => state.auth.status);
  // const error = useSelector((state) => state.auth.error);
  const error = useSelector(selectError);
  const navigate = useNavigate();

  // SENZA API

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      dispatch(setError("Passwords do not match"));
      toast.error("Passwords do not match");
      return;
    }

    const user = { email, password };
    dispatch(register(user));
    toast.success("Registration successful!");
    navigate("/login");
  };
  // CON API
  //  const handleSubmit = (e) => {
  //    e.preventDefault();
  //    if (password !== confirmPassword) {
  //      alert("Passwords do not match");
  //      toast.error("Passwords do not match");
  //      return;
  //    }

  //    dispatch(register({ email, password }))
  //      .unwrap()
  //      .then(() => {
  //        navigate("/login");
  //      })
  //      .catch((err) => {
  //        console.error("Failed to register: ", err);
  //      });
  //  };
  //   if (token) {
  //   toast.success("Registrazione avvenuta con successo!");

  //    return <Navigate to="/login" />;
  //  }if (error) {
  //    toast.error(error.message);
  //   }

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <Form onSubmit={handleSubmit} className="text-center">
            <h2 className="my-3">Register</h2>
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
            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <div className="text-center mt-3">
              <Button variant="primary" type="submit" className="w-100">
                Register
              </Button>
            </div>
            {status === "loading" && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
          </Form>
        </Col>
      </Row>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Container>
  );
};

export default RegisterForm;
