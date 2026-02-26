import { useNavigate } from "react-router-dom";
import Buttons from "../../widgets/button/index.tsx";

function About() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/home");
  };

  return (
    <div className="p-5 home-layout bg-img">
      <div className="text-content">
        <h1>Welcome About</h1>
        <Buttons
          data={{
            name: "Go To Home",
            class: "btn-default btn-white",
            variant: "outlined",
          }}
          onClick={goToHome}
        />
      </div>
    </div>
  );
}

export default About;
