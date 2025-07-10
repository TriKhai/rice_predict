import { Link } from "react-router-dom";
import { Parallax } from "react-scroll-parallax";

const HomeBanner = () => {
  return (
    <Parallax speed={-10} >
        <div className="text-center text-[#333333] h-screen items-center justify-center flex">
            <div className="">
                <p className="md:text-[60px] text-[30px] font-bold">Chào mừng bạn!</p>
                <p className="md:text-[30px] text-[15px] mb-[50px]">Đến với hệ thống dự đoán gạo</p>
                <Link to='/predict' className=""><button className="mt-[50px] md:text-[20px] text-[10px] p-3 border rounded-full bg-[#6AA84F] text-white font-bold">Dự đoán ngay</button></Link>
            </div>
        </div>
    </Parallax>
  );
}

export default HomeBanner