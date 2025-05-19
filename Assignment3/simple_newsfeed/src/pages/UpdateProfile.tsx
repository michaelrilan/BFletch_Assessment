import { Button, Card, Container, Form, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateProfileApi } from "../services/UpdateProfileService";
import { toast } from "react-toastify";
type UpdateProfileInputs = {
  profileImage: File;
};


const validation = Yup.object().shape({
  profileImage: Yup
    .mixed<File>()
    .required("Cannot Update Profile Picture with an empty Field!")
    .test("fileType", "Unsupported File Format", (value) => {
      if (!value) return false;
      return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
    }),
});

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<UpdateProfileInputs>({
    resolver: yupResolver(validation),
    defaultValues: {
      profileImage: undefined as unknown as File, // or just omit defaultValues
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("profileImage", file, { shouldValidate: true });
    }
  };

  const handleUpdateProfile = (form: UpdateProfileInputs) => {
    if (!form.profileImage) return;
    setIsLoading(true);
    updateProfileApi(form.profileImage)
      .then((res) => {
        if (res?.status === 200) {
          toast.success("Profile Picture Updated Successfully!");
          reset();
        } else if (res?.status === 500) {
          toast.warning("Internal Server Down.");
        }
      })
      .catch(() => {
        toast.warning("Could not Update Profile Picture");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className='d-flex flex-column min-vh-100 bg-light'>
      <Header />
      <Container className='my-3'>
        <Card className='p-3 shadow-sm border rounded'>
          <h4>Update Avatar</h4>
          <Form onSubmit={handleSubmit(handleUpdateProfile)}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Image (PNG or JPG)</Form.Label>
              <Form.Control
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={handleFileChange}  // manual file input handler
                isInvalid={!!errors.profileImage}
                required
              />
              <Form.Control.Feedback type='invalid'>
                {errors.profileImage?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <div className='mt-2 text-end'>
              <Button className="m-3" variant="danger" onClick={() => navigate('/home')}>
                Back
              </Button>
              <Button type='submit' disabled={isLoading}>
                {isLoading ? <Spinner animation='border' size='sm' /> : "Submit"}
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
      <Footer />
    </div>
  );
};

export default UpdateProfile;
