import React from "react";

interface Feature {
  name: string;
  description: string;
  range: string;
  unit?: string;
}

const features: Feature[] = [
  {
    name: "Area",
    description: "Diện tích của hạt gạo",
    range: "7000 – 20000",
    unit: "px",
  },
  {
    name: "Perimeter",
    description: "Chu vi của hạt",
    range: "300 – 600",
    unit: "px",
  },
  {
    name: "Major axis length",
    description: "Độ dài trục lớn nhất",
    range: "100 – 300",
    unit: "px",
  },
  {
    name: "Minor axis length",
    description: "Độ dài trục nhỏ nhất",
    range: "50 – 150",
    unit: "px",
  },
  {
    name: "Eccentricity",
    description: "Độ lệch tâm (càng gần 1 càng thon dài)",
    range: "0 – 1",
  },
  {
    name: "Convex area",
    description: "Diện tích vùng bao lồi",
    range: "7000 – 20000",
    unit: "px",
  },
  {
    name: "Extent",
    description: "Tỷ lệ diện tích thật / hình chữ nhật bao ngoài",
    range: "0 – 1",
  },
];

const FeatureDetail: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto mt-5 p-6 space-y-6 bg-gray-200 dark:bg-[#0F1727] text-black dark:text-[#ececf1] transition-colors duration-300 dark:border dark:border-gray-600 rounded-2xl">
      <h2 className="text-2xl font-bold text-center">
        Chi tiết các thuộc tính
      </h2>
      <div className="overflow-x-auto rounded-sm overflow-hidden border border-gray-300 dark:border-gray-600">
        <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-600 text-xs sm:text-sm md:text-base">
          <thead className="bg-gray-300 dark:bg-gray-700 text-left">
            <tr>
              <th className="border dark:border-gray-600 px-4 py-2">
                Tên thuộc tính
              </th>
              <th className="border dark:border-gray-600 px-4 py-2">Mô tả</th>
              <th className="border dark:border-gray-600 px-4 py-2">
                Khoảng giá trị
              </th>
              <th className="border dark:border-gray-600 px-4 py-2">Đơn vị</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-[#0F1727]">
            {features.map((f) => (
              <tr
                key={f.name}
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <td className="border dark:border-gray-600 px-4 py-2 font-medium text-sm sm:text-base md:text-lg">
                  {f.name}
                </td>
                <td className="border dark:border-gray-600 px-4 py-2 text-sm sm:text-base md:text-lg">
                  {f.description}
                </td>
                <td className="border dark:border-gray-600 px-4 py-2 text-sm sm:text-base md:text-lg">
                  {f.range}
                </td>
                <td className="border dark:border-gray-600 px-4 py-2 text-sm sm:text-base md:text-lg">
                  {f.unit ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <ul className="space-y-4 text-sm md:text-base">
          <li>
            <strong>Class:</strong> Tên loại gạo cần phân loại – gồm hai nhãn
            chính là <em>Cammeo</em> và <em>Osmancik</em>.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FeatureDetail;
