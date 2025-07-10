import { useEffect, useState } from "react";
import type { RiceInput, ApiResponse } from "../../types/rice";
import { useFormik } from "formik";
import * as Yup from "yup";

const defaultForm: RiceInput = {
  area: 0,
  perimeter: 0,
  major_axis_length: 0,
  minor_axis_length: 0,
  eccentricity: 0,
  convex_area: 0,
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
    .min(7000, "Giá trị trong khoảng (7000-20000px)")
    .max(20000, "Giá trị trong khoảng (7000-20000px)")
    .required("Vui lòng nhập giá trị"),
  perimeter: Yup.number()
    .typeError("Vui lòng nhập số")
    .positive("Giá trị âm không hợp lệ")
    .min(300, "Giá trị trong khoảng (300-600px)")
    .max(600, "Giá trị trong khoảng (300-600px)")
    .required("Vui lòng nhập giá trị"),
  major_axis_length: Yup.number()
    .typeError("Vui lòng nhập số")
    .positive("Giá trị âm không hợp lệ")
    .min(100, "Giá trị trong khoảng (100-300px)")
    .max(300, "Giá trị trong khoảng (100-300px)")
    .required("Vui lòng nhập giá trị"),
  minor_axis_length: Yup.number()
    .typeError("Vui lòng nhập số")
    .positive("Giá trị âm không hợp lệ")
    .min(50, "Giá trị trong khoảng (50-150px)")
    .max(150, "Giá trị trong khoảng (50-150px)")
    .required("Vui lòng nhập giá trị"),
  eccentricity: Yup.number()
    .typeError("Vui lòng nhập số")
    .positive("Giá trị âm không hợp lệ")
    .min(0, "Giá trị trong khoảng (0-1)")
    .max(1, "Giá trị trong khoảng (0-1)")
    .required("Vui lòng nhập giá trị"),
  convex_area: Yup.number()
    .typeError("Vui lòng nhập số")
    .positive("Giá trị âm không hợp lệ")
    .min(7000, "Giá trị trong khoảng (7000-20000px)")
    .max(20000, "Giá trị trong khoảng (7000-20000px)")
    .required("Vui lòng nhập giá trị"),
  extent: Yup.number()
    .typeError("Vui lòng nhập số")
    .positive("Giá trị âm không hợp lệ")
    .min(0, "Giá trị trong khoảng (0-1)")
    .max(1, "Giá trị trong khoảng (0-1)")
    .required("Vui lòng nhập giá trị"),
});

const PredictPage: React.FC = () => {
  const [model, setModel] = useState<string>("k-nearest-neighbors");
  const [result, setResult] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null)

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
      hint: "7000 - 20000px",
    },
    {
      key: "perimeter",
      name: "Perimeter",
      desc: "Chu vi của hạt gạo (px)",
      hint: "300 - 600px",
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
      key: "convex_area",
      name: "Convex area",
      desc: "Diện tích của hình bao lồi (px)",
      hint: "7000 - 20000px",
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

        const data: ApiResponse = await res.json();

        if (data.success) {
          setResult(`Kết quả: Gạo trên thuộc loại gạo ${data.data?.prediction == 'C' ? "Cammeo" : "Osmancik"}`);
          setErr(null)
        } else {
          setResult(null);
          setErr(`Lỗi: ${data.message}`)
        }
      } catch (err) {
        setErr("Không thể kết nối đến máy chủ");
        setResult(null)
        console.log(err);
      }
    },
  });

  useEffect(() => {
    if (Object.keys(formik.errors).length > 0 && Object.keys(formik.touched).length > 0) {
      setErr("Vui lòng kiểm tra lại các trường nhập liệu!");
      setResult(null);
    }
  }, [formik.errors, formik.touched]);

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">

      <h2 className="text-2xl font-bold mb-4 text-center text-white">Dự đoán loại gạo</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {inputs.map(({ key, name, desc, hint }) => (
          <div key={key}>
            <label className="block capitalize font-medium text-white" title={desc}>
              {name} ({hint}):
            </label>
            <input
              type="number"
              name={key}
              value={formik.values[key as keyof RiceInput]}
              onChange={formik.handleChange}
              step="any"
              className="w-full border border-gray-300 rounded px-3 py-1 bg-white"
              required
            />
            {formik.touched[key as keyof RiceInput] &&
            formik.errors[key as keyof RiceInput] ? (
              <div style={{ color: "red" }}>
                {formik.errors[key as keyof RiceInput]}
              </div>
            ) : null}
          </div>
        ))}
        <div>
          <label className="block font-medium text-white">Chọn mô hình:</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1 bg-white"
          >
            {modelOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Dự đoán
        </button>
      </form>

      {result && (
        <div className="mt-4 p-3 border rounded bg-green-100 text-green-700 border-green-400 font-medium">
          {result}
        </div>
      )}

      {err && (
        <div className="mt-4 p-3 border rounded bg-red-100 text-red-700 border-red-400 font-medium">
          {err}
        </div>
      )}
    </div>
  );
};

export default PredictPage;
