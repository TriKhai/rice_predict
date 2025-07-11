import React from "react";
import type { LRResponseData } from "../../types/api";

interface Props {
  data: LRResponseData;
}

const LogisticRDetailResult: React.FC<Props> = ({ data }) => {
  const { hyperparameters, probabilities, coefficients, intercept } = data;

  return (
    <div className="max-w-6xl mx-auto mt-5 p-6 space-y-6 bg-[#f7f7f8] dark:bg-[#0F1727] text-black dark:text-[#ececf1] transition-colors duration-300 dark:border dark:border-gray-600 rounded-2xl">
      <h2 className="text-2xl font-bold text-center">Chi tiết mô hình Logistic Regression</h2>

      {/* Hyperparameters */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Hyperparameters</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Penalty:</strong> {hyperparameters.penalty}</li>
          <li><strong>Solver:</strong> {hyperparameters.solver}</li>
          <li><strong>C:</strong> {hyperparameters.C}</li>
        </ul>
      </div>

      {/* Probabilities */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Xác suất dự đoán</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Cammeo:</strong> {(probabilities.Cammeo * 100).toFixed(2)}%</li>
          <li><strong>Osmancik:</strong> {(probabilities.Osmancik * 100).toFixed(2)}%</li>
        </ul>
      </div>

      {/* Coefficients */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Tầm quan trọng đặc trưng (Coefficient)</h3>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300 dark:border-gray-600 text-sm rounded">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Tên đặc trưng</th>
                <th className="px-4 py-2 text-left">Hệ số</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(coefficients).map(([feature, value]) => (
                <tr key={feature} className="border-t border-gray-300 dark:border-gray-600">
                  <td className="px-4 py-2">{feature}</td>
                  <td className="px-4 py-2">{value.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
      </div>

      <div>intercept: {intercept}</div>
    </div>
  );
};

export default LogisticRDetailResult;
