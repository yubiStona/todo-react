import "../css/login.css";
import { Link } from "react-router-dom";
import image from "../../icons8-microsoft-todo-2019-48.png";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setToken } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/auth/authApi";
import { useEffect } from "react";
const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

interface LoginForm {
  email: string;
  password: string;
}
const initialValues = {
  email: "",
  password: "",
};
const LoginForm = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/tasks");
    }
  }, [navigate]);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: schema,
      onSubmit: async (values) => {
        console.log(values);
        const res = await login(values).unwrap();
        dispatch(setToken(res.token));
        navigate("/tasks");
      },
    });

  const getErrorMessage = (error: any): string => {
    if (error && error.data && typeof error.data.message === "string") {
      return error.data.message;
    }
    return "Login failed. Please check your credentials."; // Default message
  };

  return (
    <div className="wrapper">
      <div className="logo">
        <img src={image} alt="todo" />
      </div>
      <div className="text-center mt-4 name">Todo Login</div>
      <form onSubmit={handleSubmit} className="p-3 mt-3">
        {error && (
          <div className="alert alert-danger" role="alert">
            {" "}
            {getErrorMessage(error)} {/* Use helper function */}
          </div>
        )}
        <div className="form-field d-flex align-items-center flex-wrap">
          <span className="far fa-user"></span>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email ? "is-invalid" : ""}
          />
        </div>
        {errors.email && touched.email ? (
          <div className="error-message">{errors.email}</div>
        ) : null}
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key"></span>
          <input
            type="password"
            name="password"
            id="pwd"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? "is-invalid" : ""}
          />
        </div>
        {errors.password && touched.password ? (
          <div className="error-message">{errors.password}</div>
        ) : null}
        <button type="submit" className="btn mt-3" disabled={isLoading}>
          Login
        </button>
      </form>
      <div className="text-center fs-6">
        Don't have a account? <Link to={"/register"}>SignUp</Link>
      </div>
    </div>
  );
};

export default LoginForm;
