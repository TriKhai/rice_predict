import { useEffect, useState } from "react";
import type { RiceInput } from "../../types/rice";
import { useFormik } from "formik";
import * as Yup from "yup";
import ModelSummary from "../../components/predict/ModelSummary";
import FeatureDetail from "../../components/predict/FeatureDetail";
import type {
  // AdaBoostResponseData,
  ApiRes,
  DTResponseData,
  KNNResponseData,
  LRResponseData,
  // LRResponseData,
  MLPResponseData,
  // NBResponseData,
  // RFResponseData,
  SVMResponseData,
} from "../../types/api";
import KnnDetailResult from "../../components/predict/KnnDetailResult";
// import NbDetailResult from "../../components/predict/NbDetailResult";
import DtDetailResult from "../../components/predict/DtDetailResult";
// import RfDetailResult from "../../components/predict/RfDetailResult";
// import LogisticRDetailResult from "../../components/predict/LogisticRDetailResult";
import SvmDetailResult from "../../components/predict/SvmDetailResult";
// import AdaboostDetailResult from "../../components/predict/AdaboostDetailResult";
import MlpDetailResult from "../../components/predict/MlpDetailResult";
import LogisticRDetailResult from "../../components/predict/LogisticRDetailResult";

const defaultForm: RiceInput = {
  area: 0,
  perimeter: 0,
  major_axis_length: 0,
  minor_axis_length: 0,
  eccentricity: 0,
  extent: 0,
};

interface ModelType {
  value: string;
  label: string;
}

interface InputType {
  key: string;
  name: string;
  desc: string;
  hint?: string;
}

const PredictSchema = Yup.object().shape({
  area: Yup.number()
    .typeError("Vui lòng nhập số")
    .positive("Giá trị âm không hợp lệ")
    .min(3800, "Giá trị quá nhỏ (3800-36000px)")
    .max(36000, "Giá trị quá lớn (3800-36000px)")
    .required("Vui lòng nhập giá trị"),
  perimeter: Yup.number()
    .typeError("Vui lòng nhập số")
    .positive("Giá trị âm không hợp lệ")
    .min(200, "Giá trị quá nhỏ (200-800px)")
    .max(800, "Giá trị quá lớn (200-800px)")
    .required("Vui lòng nhập giá trị"),
  major_axis_length: Yup.number()
    .typeError("Vui lòng nhập số")
    .positive("Giá trị âm không hợp lệ")
    .min(100, "Giá trị quá nhỏ  (100-300px)")
    .max(300, "Giá trị quá lớn (100-300px)")
    .required("Vui lòng nhập giá trị"),
  minor_axis_length: Yup.number()
    .typeError("Vui lòng nhập số")
    .positive("Giá trị âm không hợp lệ")
    .min(50, "Giá trị quá nhỏ  (50-150px)")
    .max(150, "Giá trị quá lớn (50-150px)")
    .required("Vui lòng nhập giá trị"),
  eccentricity: Yup.number()
    .typeError("Vui lòng nhập số")
    .positive("Giá trị âm không hợp lệ")
    .min(0, "Giá trị quá nhỏ  (0-1)")
    .max(1, "Giá trị quá lớn (0-1)")
    .required("Vui lòng nhập giá trị"),
  extent: Yup.number()
    .typeError("Vui lòng nhập số")
    .positive("Giá trị âm không hợp lệ")
    .min(0, "Giá trị quá nhỏ  (0-1)")
    .max(1, "Giá trị quá lớn (0-1)")
    .required("Vui lòng nhập giá trị"),
});

const PredictPage: React.FC = () => {
  const [model, setModel] = useState<string>("k-nearest-neighbors");
  const [result, setResult] = useState<string | null>(null);
  const [dataRes, setDataRes] = useState<ApiRes | null>(null);

  const [err, setErr] = useState<string | null>(null);
  const [showModelSummary, setShowModelSummary] = useState(false);
  const [showFeatureDetail, setShowFeatureDetail] = useState(false);

  const modelOptions: ModelType[] = [
    { value: "k-nearest-neighbors", label: "K-Nearest Neighbors" },
    { value: "naive-bayes", label: "Naive Bayes" },
    { value: "decision-tree", label: "Decision Tree" },
    { value: "random-forest", label: "Random Forest" },
    { value: "support-vector-machine", label: "SVM (Support Vector Machine)" },
    { value: "logistic-regression", label: "Logistic Regression" },
    { value: "multilayer-perceptron", label: "Multilayer Perceptron" },
    { value: "adaboost", label: "Adaboost" },
  ];

  const inputs: InputType[] = [
    {
      key: "area",
      name: "Area",
      desc: "Diện tích của hạt gạo (px)",
      hint: "3800 - 36000px",
    },
    {
      key: "perimeter",
      name: "Perimeter",
      desc: "Chu vi của hạt gạo (px)",
      hint: "200 - 800px",
    },
    {
      key: "major_axis_length",
      name: "Major axis length",
      desc: "Độ dài trục lớn của hạt gạo (px)",
      hint: "100 - 300px",
    },
    {
      key: "minor_axis_length",
      name: "Minor axis length",
      desc: "Độ dài trục nhỏ của hạt gạo (px)",
      hint: "50 - 150px",
    },
    {
      key: "eccentricity",
      name: "Eccentricity",
      desc: "Độ lệch tâm của hạt gạo",
      hint: "0 - 1",
    },
    {
      key: "extent",
      name: "Extent",
      desc: "Extent (tỷ lệ diện tích vùng/diện tích hình chữ nhật bao ngoài)",
      hint: "0 – 1",
    },
  ];

  const formik = useFormik({
    initialValues: defaultForm,
    validationSchema: PredictSchema,
    onSubmit: async (values) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/predict/${model}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          }
        );

        // const data: ApiResponse = await res.json();
        const data: ApiRes = await res.json();
        if (data.success) {
          setDataRes(data);
          setResult(
            `Gạo ${data.data?.prediction}`
          );
          setErr(null);
        } else {
          setResult(null);
          setErr(`Lỗi: ${data.message}`);
        }
      } catch (err) {
        setErr("Không thể kết nối đến máy chủ");
        setResult(null);
        console.log(err);
      }
    },
  });

  useEffect(() => {
    if (
      Object.keys(formik.errors).length > 0 &&
      Object.keys(formik.touched).length > 0
    ) {
      setErr("Vui lòng kiểm tra lại các trường nhập liệu!");
      setResult(null);
    }
  }, [formik.errors, formik.touched]);

  const ellipsePerimeterRamanujan2 = (major: number, minor: number): number => {
    const a = major / 2;
    const b = minor / 2;

    const h = ((a - b) / (a + b)) ** 2;

    const perimeter =
      Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));

    return parseFloat(perimeter.toFixed(3)); // Giữ 3 chữ số thập phân
  };

  const fillRandomValues = () => {
    const random = (min: number, max: number, precision = 3) =>
      parseFloat((Math.random() * (max - min) + min).toFixed(precision));

    // Ràng buộc theo yêu cầu:
    const major = random(100, 300); // 100–300 px
    const minor = random(50, Math.min(150, major)); // 50–150 px và luôn ≤ major

    const area = parseFloat(((Math.PI * major * minor) / 4).toFixed(3));
    const perimeter = ellipsePerimeterRamanujan2(major, minor);
    const eccentricity = parseFloat(
      Math.sqrt(1 - minor ** 2 / major ** 2).toFixed(3)
    );
    // const extent = parseFloat((area / (major * minor)).toFixed(3));
    const boundingBoxArea = major * minor * random(1, 1.2);
    const extent = parseFloat((area / boundingBoxArea).toFixed(3));

    const randomValues: RiceInput = {
      area,
      perimeter,
      major_axis_length: major,
      minor_axis_length: minor,
      eccentricity,
      extent,
    };

    formik.setValues(randomValues);
    setErr(null);
    setResult(null);
  };

  const clearForm = () => {
    formik.resetForm(); // Reset về initialValues
    setResult(null);
    setErr(null);
  };

  const renderModelDetail = () => {
    if (!result || !dataRes?.data) return null;

    switch (dataRes?.data.model) {
      case "K-Nearest Neighbors":
        return <KnnDetailResult data={dataRes?.data as KNNResponseData} />;
      // case "Naive Bayes":
      //   return <NbDetailResult data={dataRes?.data as NBResponseData} />;
      // case "Random Forest":
      //   return <RfDetailResult data={dataRes?.data as RFResponseData} />;
      case "Decision Tree":
        return <DtDetailResult data={dataRes?.data as DTResponseData} />;
      case "Logistic Regression":
        return <LogisticRDetailResult data={dataRes?.data as LRResponseData} />;
      case "SVM (Support Vector Machine)":
        return <SvmDetailResult data={dataRes?.data as SVMResponseData} />;
      // case "AdaBoost":
      //   return (
      //     <AdaboostDetailResult data={dataRes?.data as AdaBoostResponseData} />
      //   );
      case "Multilayer Perceptron":
        return <MlpDetailResult data={dataRes?.data as MLPResponseData} />;

      default:
        return <p></p>;
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto mt-20 p-6 space-y-6 bg-gray-200 dark:bg-[#0F1727] text-black dark:text-[#ececf1] transition-colors duration-300 dark:border dark:border-gray-600 rounded-2xl">
        <h2 className="text-2xl font-bold text-center ">
          Dự đoán loại gạo Cammeo & Osmancik
        </h2>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/3 space-y-6">
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {inputs.map(({ key, name, desc, hint }) => (
                  <div key={key}>
                    <label
                      className="block capitalize font-medium"
                      title={desc}
                    >
                      {name} ({hint}):
                    </label>
                    <input
                      type="number"
                      name={key}
                      value={formik.values[key as keyof RiceInput]}
                      onChange={formik.handleChange}
                      step="any"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-[#1E2939] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-400 no-spinner"
                      required
                    />
                    {formik.touched[key as keyof RiceInput] &&
                    formik.errors[key as keyof RiceInput] ? (
                      <div className="text-sm text-[#fda4af]">
                        {formik.errors[key as keyof RiceInput]}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>

              <div>
                <label className="block font-medium">Chọn mô hình:</label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full border border-gray-600 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  {modelOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={fillRandomValues}
                  className="px-4 py-2 rounded border bg-gray-100 dark:bg-[#0F1727] text-gray-800 dark:text-white hover:bg-[#0F1727] hover:text-white dark:hover:bg-white dark:hover:text-black
             transition-colors duration-200 w-full md:w-auto "
                >
                  Random
                </button>

                <button
                  type="button"
                  onClick={clearForm}
                  className="px-4 py-2 rounded border bg-gray-100 dark:bg-[#0F1727] text-gray-800 dark:text-white hover:bg-[#0F1727] hover:text-white dark:hover:bg-white dark:hover:text-black
             transition-colors duration-200 w-full md:w-auto"
                >
                  Reset
                </button>

                <button
                  type="button"
                  onClick={() => setShowModelSummary(!showModelSummary)}
                  className={`px-4 py-2 rounded border transition-colors duration-200 w-full md:w-auto ${
                    showModelSummary
                      ? "bg-[#0F1727] dark:bg-white text-white dark:text-gray-800 hover:bg-gray-100 hover:text-black dark:hover:bg-[#0F1727] dark:hover:text-white"
                      : "bg-gray-100 dark:bg-[#0F1727] text-gray-800 dark:text-white hover:bg-[#0F1727] hover:text-white dark:hover:bg-white dark:hover:text-black"
                  }`}
                >
                  Algorithms
                </button>

                <button
                  type="button"
                  onClick={() => setShowFeatureDetail(!showFeatureDetail)}
                  className={`px-4 py-2 rounded border transition-colors duration-200 w-full md:w-auto ${
                    showFeatureDetail
                      ? "bg-[#0F1727] dark:bg-white text-white dark:text-gray-800 hover:bg-gray-100 hover:text-black dark:hover:bg-[#0F1727] dark:hover:text-white"
                      : "bg-gray-100 dark:bg-[#0F1727] text-gray-800 dark:text-white hover:bg-[#0F1727] hover:text-white dark:hover:bg-white dark:hover:text-black"
                  }`}
                >
                  Features
                </button>

                <button
                  type="submit"
                  className={`
              px-4 py-2 rounded transition-colors duration-200 border w-full sm:w-auto
              ${
                formik.isValid && formik.dirty
                  ? "bg-green-500 text-white border-transparent hover:bg-green-300 hover:text-black dark:bg-green-200 dark:text-black dark:border-white dark:hover:text-gray-950  dark:hover:bg-green-400"
                  : " bg-red-500 text-white border-transparent hover:bg-[#fda4af] hover:text-black dark:bg-[#fda4af] dark:border-white dark:text-black dark:hover:text-white dark:hover:bg-red-500 cursor-pointer"
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
                >
                  Predict
                </button>
              </div>
            </form>
          </div>

          <div className="lg:w-1/3 space-y-4">
            <h3 className="text-xl font-semibold">Kết quả</h3>

            {result && (
              <div className="text-center text-xl p-4 border rounded bg-green-100 text-green-700 border-green-400 font-medium">
                {result}
              </div>
            )}

            {err && (
              <div className="p-4 border rounded bg-red-100 text-red-700 border-red-400 font-medium">
                {err}
              </div>
            )}

            {!result && !err && (
              <div className="text-gray-500 dark:text-gray-400 italic">
                Chưa có kết quả nào được hiển thị. Vui lòng nhập thông tin và
                chọn mô hình.
              </div>
            )}

            <div className="text-sm text-800 text-gray-800 dark:text-gray-200">
              <p className="mb-2">Gợi ý:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Nhập các giá trị cho thuộc tính, sau đó chọn mô hình rồi nhấn
                  "Predict".
                </li>
                <li>Nút "Random" giúp tự động điền ngẫu nhiên các tham số.</li>
                <li>
                  Nút "Reset" sẽ giúp các thuộc tính tự động được làm mới.
                </li>
                <li>
                  Nút "Algorithms" hiển thị thông tin các mô hình của hệ thống.
                </li>
                <li>Nút "Features" hiển thị thông tin các thuộc tính.</li>
                <li>
                  Kết quả là tên loại gạo Cammeo & Osmancik dựa vào thuật toán
                  bạn chọn.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {showModelSummary && <ModelSummary />}
      {showFeatureDetail && <FeatureDetail />}

      {renderModelDetail()}
    </>
  );
};

export default PredictPage;
