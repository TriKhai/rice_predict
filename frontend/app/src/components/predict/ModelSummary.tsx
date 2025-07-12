import React from "react";

interface ModelInfo {
  key: string;
  name: string;
  abbr: string;
  desc: string;
  link: string;
}

const modelInfos: ModelInfo[] = [
  {
    key: "k-nearest-neighbors",
    name: "K-Nearest Neighbors",
    abbr: "KNN",
    desc: "Dựa vào khoảng cách để tìm các điểm lân cận gần nhất và phân loại dựa trên đa số.",
    link: "https://scikit-learn.org/stable/modules/neighbors.html#classification",
  },
  {
    key: "naive-bayes",
    name: "Naive Bayes",
    abbr: "NB",
    desc: "Áp dụng định lý Bayes để ước lượng xác suất và phân loại đầu vào.",
    link: "https://scikit-learn.org/stable/modules/naive_bayes.html",
  },
  {
    key: "decision-tree",
    name: "Decision Tree",
    abbr: "DT",
    desc: "Tạo cây quyết định phân chia dữ liệu theo thuộc tính để đưa ra phân loại.",
    link: "https://scikit-learn.org/stable/modules/tree.html",
  },
  {
    key: "random-forest",
    name: "Random Forest",
    abbr: "RF",
    desc: "Tổng hợp nhiều cây quyết định để cải thiện độ chính xác và giảm overfitting.",
    link: "https://scikit-learn.org/stable/modules/ensemble.html#forest",
  },
  {
    key: "support-vector-machine",
    name: "Support Vector Machine",
    abbr: "SVM",
    desc: "Tìm mặt phẳng phân chia tối ưu giữa các lớp dữ liệu.",
    link: "https://scikit-learn.org/stable/modules/svm.html",
  },
  {
    key: "logistic-regression",
    name: "Logistic Regression",
    abbr: "LR",
    desc: "Ước lượng xác suất đầu ra và phân loại nhị phân.",
    link: "https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression",
  },
  {
    key: "multilayer-perceptron",
    name: "Multilayer Perceptron",
    abbr: "MLP",
    desc: "Mạng neural nhiều lớp có khả năng học phi tuyến.",
    link: "https://scikit-learn.org/stable/modules/neural_networks_supervised.html",
  },
  {
    key: "adaboost",
    name: "Adaboost",
    abbr: "AB",
    desc: "Tăng cường nhiều mô hình yếu để tạo ra mô hình mạnh hơn.",
    link: "https://scikit-learn.org/stable/modules/ensemble.html#adaboost",
  },
];

const ModelSummaryAll: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto mt-5 p-6 bg-gray-200 dark:bg-[#0F1727] text-black dark:text-[#ececf1] transition-colors duration-300 dark:border dark:border-gray-600 rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-4">
        Tóm tắt các giải thuật
      </h2>
      <div className="overflow-x-auto rounded-xl overflow-hidden border border-black dark:border-gray-600">
        <table className="w-full table-auto text-xs sm:text-sm md:text-base">
          <thead className="bg-gray-300 dark:bg-gray-700 text-left">
            <tr>
              <th className="px-4 py-2 w-1/6">Viết tắt</th>
              <th className="px-4 py-2 w-1/4">Tên giải thuật</th>
              <th className="px-4 py-2">Mô tả</th>
            </tr>
          </thead>
          <tbody className="dark:bg-[#0F1727] bg-white">
            {modelInfos.map(({ key, name, abbr, desc, link }) => (
              <tr
                key={key}
                className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                onClick={() => window.open(link, "_blank")}
              >
                <td className="border dark:border-gray-600 px-4 py-2 font-medium text-sm sm:text-base md:text-lg">
                  {abbr}
                </td>
                <td className="border dark:border-gray-600 px-4 py-2 text-sm sm:text-base md:text-lg">
                  {name}
                </td>
                <td className="border dark:border-gray-600 px-4 py-2 text-sm sm:text-base md:text-lg">
                  {desc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModelSummaryAll;
