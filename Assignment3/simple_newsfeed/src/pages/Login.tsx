import React, { useRef,useState,useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {Form,Button,Container,Row,Col,Spinner,Card} from "react-bootstrap";
import * as Yup from "yup";
import { yupResolver, } from "@hookform/resolvers/yup";
import Footer from "../components/Footer";
import { useAuth } from "../context/useAuth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";




type LoginFormsInputs = {
  userName: string;
  password: string;
};

const validation = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});


const Login = () => {
  const { loginUser,isLoggedIn  } = useAuth();
  const navigate = useNavigate();
  const {register, handleSubmit, formState: { errors },} = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });
  const [loading, setLoading] = useState(false);
  const handleLogin = (form: LoginFormsInputs) => {
    loginUser(form.userName, form.password, setLoading);
  };
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/home", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <div className='d-flex flex-column min-vh-100'>
        {/* <Header /> */}
        <div className='main-content flex-grow-1 d-flex align-items-center justify-content-center'>
          <Container>
            <Row className='justify-content-md-center mt-5'>
              <Col xs={12} md={5} lg={4}>
                <Card className='shadow-md p-4'>
                  <h4 className='text-center mb-5'>Twimmer - Sign In</h4>

                  <Form onSubmit={handleSubmit(handleLogin)}>
                    <Form.Group className='mb-3'>
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter username'
                        {...register("userName")}
                        isInvalid={!!errors.userName}
                      />
                      {errors.userName && (
                        <Form.Control.Feedback type='invalid'>
                          {errors.userName.message}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>

                    <Form.Group className='mb-3'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control 
                        type='password' 
                        placeholder="••••••••"
                        {...register("password")}
                        isInvalid={!!errors.password}
                        />
                        {errors.password && (
                        <Form.Control.Feedback type='invalid'>
                          {errors.password.message}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <div className='row mb-2'>
                      {/* <a href='signup'>I don't have an account</a> */}
                      <Link to="signup">I don't have an account</Link>  
                    
                    </div>
                    <Button
                      type='submit'
                      className='w-100 text-light'
                      disabled={loading}
                    >
                      {loading ? (
                        <Spinner animation='border' size='sm' />
                      ) : (
                        "Login"
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

export default Login;
