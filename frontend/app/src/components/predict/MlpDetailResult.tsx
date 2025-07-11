import React from "react";
import type { MLPResponseData } from "../../types/api";

interface Props {
  data: MLPResponseData;
}

const MlpDetailResult: React.FC<Props> = ({ data }) => {
  const { prediction, probabilities, certainty_score, hyperparameters } = data;

  return (
    <div className="max-w-6xl mx-auto mt-5 p-6 space-y-6 bg-[#f7f7f8] dark:bg-[#0F1727] text-black dark:text-[#ececf1] transition-colors duration-300 dark:border dark:border-gray-600 rounded-2xl">
      <h2 className="text-2xl font-bold text-center">
        Chi tiết mô hình Multilayer Perceptron
      </h2>

      {/* Kết quả dự đoán */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Kết quả dự đoán</h3>
        <p>
          <strong>Giống lúa dự đoán:</strong>{" "}
          <span className="text-green-600 dark:text-green-400 font-semibold">
            {prediction}
          </span>
        </p>
        <p>
          <strong>Độ tin tưởng:</strong> {(certainty_score * 100).toFixed(2)}%
        </p>
      </div>

      {/* Xác suất dự đoán */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Xác suất dự đoán</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Cammeo:</strong> {(probabilities.Cammeo * 100).toFixed(2)}%
          </li>
          <li>
            <strong>Osmancik:</strong>{" "}
            {(probabilities.Osmancik * 100).toFixed(2)}%
          </li>
        </ul>
      </div>

      {/* Hyperparameters */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Thông số mô hình</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Activation:</strong> {hyperparameters.activation}
          </li>
          <li>
            <strong>Alpha:</strong> {hyperparameters.alpha}
          </li>
          <li>
            <strong>Hidden Layers:</strong>{" "}
            {Array.isArray(hyperparameters.hidden_layer_sizes)
              ? hyperparameters.hidden_layer_sizes.join(", ")
              : hyperparameters.hidden_layer_sizes}
          </li>
          <li>
            <strong>Learning Rate Init:</strong>{" "}
            {hyperparameters.learning_rate_init}
          </li>
        </ul>
      </div>

    </div>
  );
};

export default MlpDetailResult;
