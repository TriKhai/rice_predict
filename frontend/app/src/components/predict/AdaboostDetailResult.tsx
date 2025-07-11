import React from "react";

interface Props {
  data: {
    model: string;
    input: Record<string, number>;
    prediction: string;
    n_estimators?: number;
    feature_importances?: Record<string, number>;
  };
}

const AdaboostDetailResult: React.FC<Props> = ({ data }) => {
  const { input, prediction, n_estimators, feature_importances } = data;

  const sortedFeatures = feature_importances
    ? Object.entries(feature_importances).sort((a, b) => b[1] - a[1])
    : [];

  return (
    <div className="max-w-5xl mx-auto mt-5 p-6 space-y-6 bg-[#f7f7f8] dark:bg-[#0F1727] text-black dark:text-[#ececf1] transition-colors duration-300 rounded-2xl shadow">
      <h2 className="text-2xl font-bold text-center">
        Chi tiết mô hình AdaBoost
      </h2>

      {/* Thông tin dự đoán */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Kết quả dự đoán</h3>
        <p>
          <strong>Dự đoán:</strong>{" "}
          <span className="text-green-600 dark:text-green-400 font-medium">
            {prediction}
          </span>
        </p>
        <div>
          <h3 className="font-semibold text-lg mb-2">
            Input (Đặc trưng đầu vào)
          </h3>
          <table className="table-auto w-full text-left border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 border dark:border-gray-700">
                  Tên thuộc tính
                </th>
                <th className="px-4 py-2 border dark:border-gray-700">
                  Giá trị
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(input).map(([key, value]) => (
                <tr
                  key={key}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-2 border dark:border-gray-700">
                    {key}
                  </td>
                  <td className="px-4 py-2 border dark:border-gray-700">
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tổng số estimator */}
      {n_estimators !== undefined && (
        <div>
          <h3 className="font-semibold text-lg mb-2">Thông tin huấn luyện</h3>
          <p>
            Mô hình sử dụng tổng cộng{" "}
            <span className="font-bold">{n_estimators}</span> base estimators
            (thường là các cây quyết định đơn giản).
          </p>
          <p>
            Mỗi base estimator được huấn luyện để sửa lỗi của estimator trước
            đó.
          </p>
        </div>
      )}

      {/* Feature importance */}
      {sortedFeatures.length > 0 && (
        <div>
          <h3 className="font-semibold text-lg mb-2">
            Độ quan trọng của các đặc trưng
          </h3>
          <ul className="list-disc list-inside space-y-1">
            {sortedFeatures.map(([feature, value]) => (
              <li key={feature}>
                <strong>{feature}:</strong> {(value * 100).toFixed(2)}%
              </li>
            ))}
          </ul>
          <p className="mt-2 italic text-sm text-gray-600 dark:text-gray-400">
            Đặc trưng có độ quan trọng cao nhất ảnh hưởng nhiều nhất đến quyết
            định cuối cùng.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdaboostDetailResult;
