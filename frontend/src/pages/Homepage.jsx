import Hero from "../components/Hero";
import { FaBreadSlice, FaUtensils, FaBookOpen } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Homepage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    
  }, [user, navigate]);

  return (
    <>
      <Hero />
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <div className="card bg-secondary border-primary border-2">
              <div className="card-body">
                <h5 className="card-title text-center">
                  <FaBreadSlice className="text-primary mb-4" size={40} /> 
                </h5> 
                <h3 className="card-text text-center mb-4">
                  Check out your meals here!
                </h3>               
                <div className="d-flex justify-content-center mb-3">
                  <Link to="/meals" className="btn btn-primary mx-auto">
                    View Meals
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="card bg-secondary border-primary border-2">
              <div className="card-body">
                <h5 className="card-title text-center">
                  <FaUtensils className="text-primary mb-4" size={40} /> 
                </h5> 
                <h3 className="card-text text-center mb-4">
                  Check out your meal plan here!
                </h3>               
                <div className="d-flex justify-content-center mb-3">
                  <Link to="/plans" className="btn btn-primary mx-auto">
                    View Plan
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-3 justify-content-center">
          <div className="col-lg-6 col-md-12">
            <div className="card bg-secondary border-primary border-2">
              <div className="card-body">
                <h5 className="card-title text-center">
                  <FaBookOpen className="text-primary mb-3" size={40} /> 
                </h5> 
                <h3 className="card-text text-center mb-5">
                  Not sure where to start? <br/>Browse other user meals here!
                </h3>               
                <div className="d-flex justify-content-center mb-3">
                  <Link to="/browse" className="btn btn-primary mx-auto">
                    Browse Meals
                  </Link>
                </div>
              </div>            
            
            </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
