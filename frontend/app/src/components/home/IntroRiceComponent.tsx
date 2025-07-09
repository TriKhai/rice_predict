import { Parallax } from "react-scroll-parallax";
import osmancik_cammeo_rice_image from "../../assets/Osmancik-and-Cammeo-rice-structures.jpg"

const IntroRiceComponent = () => {
  return (
    <Parallax opacity={[0, 2]} startScroll={300} endScroll={800}>
        <Parallax opacity={[1, 0]}  startScroll={900} endScroll={1200}>
            <p className="text-[30px] text-center m-10 font-bold">Tổng quan về 2 loại gạo Cammeo và Osmancik</p>
            <div className="h-screen md:grid md:grid-cols-2 ">
                <div className="text-3xl text-justify">
                    Trong số các loại gạo đã được chứng nhận được trồng ở Thổ Nhĩ Kỳ, giống Osmancik
                    với diện tích gieo trồng lớn kể từ năm 1997 và giống Cammeo được trồng từ năm 2014 
                    đã được chọn cho nghiên cứu này. Khi xét về các đặc điểm chung của giống Osmancik, 
                    chúng có hình dạng rộng, dài, bề mặt trong mờ và hơi thiếu độ bóng. Còn đối với giống Cammeo,
                    chúng cũng có hình dạng rộng và dài, bề mặt trong mờ và cũng thiếu độ bóng tương tự như Osmancik. 
                </div>
                <div className="pl-3">
                    <img src={osmancik_cammeo_rice_image} className="w-full h-[400px]"/>
                </div>
            </div>
        </Parallax>
    </Parallax>
  );
}

export default IntroRiceComponent