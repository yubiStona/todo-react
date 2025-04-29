import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  Container,
  Card,
  Alert,
  Form as BootstrapForm,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRegisterMutation } from "../features/auth/authApi";
import { useNavigate } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

const RegisterForm = () => {
  const [register, { error }] = useRegisterMutation();
  const navigate = useNavigate();
  const handleSubmit = async (values: any) => {
    const { confirmPassword, ...registrationData } = values;
    const response = await register(registrationData).unwrap();
    if (response.status == "success") {
      navigate("/");
    }
  };

  const getErrorMessage = (error: any): string => {
    if (error && error.data && typeof error.data.message === "string") {
      return error.data.message;
    }
    return "Failed to Register"; // Default message
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ width: "100%", maxWidth: "400px" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">
            Sign Up for Todo App
          </Card.Title>
          {error && (
            <div className="alert alert-danger" role="alert">
              {" "}
              {getErrorMessage(error)} {/* Use helper function */}
            </div>
          )}
          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status }) => (
              <Form>
                {status && (
                  <Alert variant={status.type || "info"}>
                    {status.message}
                  </Alert>
                )}

                <BootstrapForm.Group className="mb-3" controlId="formEmail">
                  <BootstrapForm.Label>Email address</BootstrapForm.Label>
                  <Field
                    name="email"
                    type="email"
                    as={BootstrapForm.Control}
                    placeholder="Enter email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger small"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3" controlId="formPassword">
                  <BootstrapForm.Label>Password</BootstrapForm.Label>
                  <Field
                    name="password"
                    type="password"
                    as={BootstrapForm.Control}
                    placeholder="Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger small"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group
                  className="mb-3"
                  controlId="formConfirmPassword"
                >
                  <BootstrapForm.Label>Confirm Password</BootstrapForm.Label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    as={BootstrapForm.Control}
                    placeholder="Confirm Password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-danger small"
                  />
                </BootstrapForm.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mt-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing Up..." : "Sign Up"}
                </Button>
              </Form>
            )}
          </Formik>

          <div className="text-center mt-3">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegisterForm;
