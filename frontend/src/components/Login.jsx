import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { reset as mealReset } from "../features/meals/mealSlice";
import { reset as planReset } from "../features/plans/planSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, userStatus, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userStatus === "failed") {
      toast.error(message);
    }

    if (userStatus === "succeeded") {
      navigate("/");
    }
  }, [user, userStatus, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
    dispatch(planReset());
    dispatch(mealReset());
  };

  return (
    <>
      <div className="container bg-secondary border border-black border-2 rounded">
        <section className="heading">
          <h1>
            <FaSignInAlt /> Login
          </h1>
          <p>Login to start planning your Meals!</p>
        </section>

        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={onChange}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                placeholder="Enter password"
                onChange={onChange}
              />
            </div>

            <div className="form-group mb-3">
              <button type="submit" className="btn btn-outline-dark">
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
      <div className="container mt-2">
        <div className="col-4">
        <div className="card">
          <div className="card-body border border-outline border-black rounded">
            <p>
              <strong>Don't have an account? Register here!</strong>
            </p>
              <Link type="button" to="/register" className="btn btn-outline-primary">
                Register
              </Link>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Login;
