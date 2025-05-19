

import { Button, Card, Container, Form, Image } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
const UpdateProfile = () => {
  const navigate = useNavigate();
  return (
    <div className='d-flex flex-column min-vh-100 bg-light'>
      <Header />

      <Container className='my-3'>


        <Card className='p-3 shadow-sm border rounded'>
            <h4>Update Avatar</h4>
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload Image (PNG or JPG)</Form.Label>
                <Form.Control type="file" accept=".png,.jpg,.jpeg" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            <Button className="m-3" variant="danger" onClick={() => navigate('/home')}>
                Back to NewsFeed
            </Button>
          </Form>
        </Card>
      </Container>

      <Footer />
    </div>
  );
};

export default UpdateProfile;
