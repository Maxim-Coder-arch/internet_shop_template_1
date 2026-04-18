import Lottie from "lottie-react";
import rocketAnimation from '../../public/animation-config/loader.json';

const GoodsLoader = () => {
  return (
    <div className="good-loader">
      <div className="load-spinner">
        <Lottie
          animationData={rocketAnimation}
          loop={false}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  )
}

export default GoodsLoader