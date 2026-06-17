import Lottie from "lottie-react";
import animationData from "../../public/logo.json";

function Logo() {
  return (
    <Lottie
      animationData={animationData}
      loop={true}
      style={{ width: 50 }}
    />
  );
}



export default Logo;