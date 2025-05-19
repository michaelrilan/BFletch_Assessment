import React, { useRef,useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Form,Button,Container,Row,Col,Spinner,Card} from "react-bootstrap";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Footer from "../components/Footer";
import { useAuth } from "../context/useAuth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


type RegisterFormsInputs = {
  userName: string;
  password: string;
  firstname: string;
  lastname: string;
};

const validation = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  firstname: Yup.string().required("Firstname is required"),
  lastname: Yup.string().required("Lastname is required"),
});


const Register = () => {
  const { registerUser } = useAuth();
    const {register, handleSubmit, formState: { errors },} = useForm<RegisterFormsInputs>({ resolver: yupResolver(validation) });
    const [loading, setLoading] = useState(false);
    const handleRegister = (form: RegisterFormsInputs) => {
      registerUser(form.userName, form.password,form.firstname,form.lastname, setLoading);
    };
  const navigate = useNavigate();

  return (
    <>
    
      <div className='d-flex flex-column min-vh-100'>
        {/* <Header /> */}
        <div className='main-content flex-grow-1 d-flex align-items-center justify-content-center'>
          <Container>
            <Row className='justify-content-md-center mt-5'>
              <Col xs={12} md={5} lg={4}>
                <Card className='shadow-md p-4'>
                  <h4 className='text-center mb-5'>Twimmer - Sign Up</h4>

                  <Form onSubmit={handleSubmit(handleRegister)}>
                    <p>Please fill out all fields.</p>
                    <Form.Group className='mb-1' controlId='formBasicEmail'>
                      <Form.Label>Firstname</Form.Label>
                      <Form.Control type='text' 
                       {...register("firstname")}
                        isInvalid={!!errors.firstname}
                      />
                      {errors.firstname && (
                        <Form.Control.Feedback type='invalid'>
                          {errors.firstname.message}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <Form.Group className='mb-1' controlId='formBasicEmail'>
                      <Form.Label>Lastname</Form.Label>
                      <Form.Control type='text' 
                      {...register("lastname")}
                        isInvalid={!!errors.lastname}
                      />
                      {errors.lastname && (
                        <Form.Control.Feedback type='invalid'>
                          {errors.lastname.message}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <Form.Group className='mb-1' controlId='formBasicEmail'>
                      <Form.Label>Username</Form.Label>
                      <Form.Control type='username' 
                        {...register("userName")}
                        isInvalid={!!errors.userName}
                      />
                      {errors.userName && (
                        <Form.Control.Feedback type='invalid'>
                          {errors.userName.message}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formBasicPassword'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control type='password' 
                      {...register("password")}
                        isInvalid={!!errors.password}
                      />
                      {errors.password && (
                      <Form.Control.Feedback type='invalid'>
                        {errors.password.message}
                      </Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <div className="row mb-2">
                      <Link to="/">Back to Login</Link>  
                    </div>
                    <Button
                      type='submit'
                      className='w-100 text-light'
                      disabled={loading}
                    >
                      {loading ? (
                        <Spinner animation='border' size='sm' />
                      ) : (
                        "SignUp"
                      )}
                    </Button>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Register;
