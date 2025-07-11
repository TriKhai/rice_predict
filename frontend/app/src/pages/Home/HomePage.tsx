import React from "react";
import riceImage from "../../assets/Osmancik-and-Cammeo-rice-structures.jpg";
import ModelSummaryAll from "../../components/predict/ModelSummary";
import FeatureDetail from "../../components/predict/FeatureDetail";

const HomePage: React.FC = () => {
  return (
    <>
      <div className="max-w-6xl mx-auto mt-20 p-6 space-y-6 bg-[#f7f7f8] dark:bg-[#0F1727] text-black dark:text-[#ececf1] transition-colors duration-300 dark:border dark:border-gray-600 rounded-2xl">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Intro */}
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            Rice Classification: Cammeo vs Osmancik
          </h1>
          <hr className="border-t dark:border-gray-600" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* Text chiếm 2 phần */}
            <div className="md:col-span-2 space-y-4">
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Trong số các giống gạo được chứng nhận trồng tại Thổ Nhĩ Kỳ, hai
                giống <strong>Osmancik</strong> (có diện tích gieo trồng lớn từ
                năm 1997) và <strong>Cammeo</strong> (được trồng từ năm 2014) đã
                được chọn để nghiên cứu. Khi xét về đặc điểm chung của giống
                Osmancik, chúng có hình dạng rộng, dài, bóng và mờ đục. Tương
                tự, giống Cammeo cũng có đặc điểm{" "}
                <em>rộng, dài, bóng và mờ đục</em>.. Tổng cộng{" "}
                <strong>3810 hình ảnh</strong> hạt gạo của hai giống này đã được
                chụp, xử lý và rút trích đặc trưng. 7 đặc trưng hình thái học đã
                được trích xuất cho mỗi hạt gạo.
              </p>
            </div>

            {/* Ảnh chiếm 1 phần */}
            <div className="flex flex-col items-center">
              <img
                src={riceImage}
                alt="Cấu trúc hạt gạo Osmancik và Cammeo"
                className="w-full md:w-[90%] rounded shadow"
              />
              <figcaption className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic text-center">
                Cấu trúc hạt gạo Osmancik và Cammeo
              </figcaption>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-0 gap-x-0 md:gap-x-6 max-w-6xl mx-auto mt-5 ">
        <div>
          <FeatureDetail />
        </div>
        <ModelSummaryAll />
      </div>

      <div className="max-w-6xl mx-auto mt-10 p-6 space-y-1 bg-[#f7f7f8] dark:bg-[#0F1727] text-black dark:text-[#ececf1] transition-colors duration-300 dark:border dark:border-gray-600 rounded-2xl">
        <div className="max-w-6xl mx-auto space-y-5">
          {/* Intro */}
          <h1 className="text-2xl md:text-3xl font-bold text-center">Tác giả</h1>
          <hr className="border-t dark:border-gray-600" />
          <div>
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Mục tiêu là ứng dụng các thuật toán học máy hiện đại để phân loại
              hai giống gạo <em>Cammeo</em> và <em>Osmancik</em> một cách chính
              xác và trực quan.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Người thực hiện</h2>
            <ul className="list-disc list-inside space-y-1 text-base text-gray-800 dark:text-gray-200">
              <li>
                Nguyễn Hoàng Tiến Danh - 0869635xxx - B2205858 -
                danhb2205858@student.ctu.edu.vn
              </li>
              <li>
                Thân Quốc Tuấn - 0584020xxx - B2207574 -
                tuanb2205747@student.ctu.edu.vn
              </li>
              <li>
                Lý Trí Khải - 0848041xxx - B2207530 -
                khaib2207530@student.ctu.edu.vn
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
