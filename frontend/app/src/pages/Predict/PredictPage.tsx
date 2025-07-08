import { useState } from "react"
import type { RiceInput, ApiResponse } from "../../types/rice"
import { useFormik } from 'formik';
import * as Yup from 'yup';



const defaultForm: RiceInput = {
  area: 0,
  perimeter: 0,
  major_axis_length: 0,
  minor_axis_length: 0,
  eccentricity: 0,
  convex_area: 0,
  extent: 0,
}

interface ModelType {
  value: string,
  label: string
}

const PredictSchema = Yup.object().shape({
  area: Yup.number()
    .typeError('Phải là một số')
    .positive('Diện tích của hạt gạo (px) phải lớn hơn 0!')
    .min(1000, 'Diện tích này quá nhỏ để mô hình có thể nhận diện chính xác! Hãy nhập lớn hơn')
    .max(99999, 'Con số bạn vừa nhập quá to!')
    .required('Hãy nhập diện tích hạt gạo '),
  perimeter: Yup.number()
    .typeError('Phải là một số')
    .positive('Chu vi của hạt gạo (px) phải lớn hơn 0!')
    .min(1, 'Chu vi này quá nhỏ để mô hình có thể nhận diện chính xác! Hãy nhập lớn hơn')
    .max(9999, 'Con số bạn vừa nhập quá to! Hãy nhập nhỏ lại')
    .required('Hãy nhập chu vi hạt gạo '),
  major_axis_length: Yup.number()
    .typeError('Phải là một số')
    .positive('Độ dài trục lớn của hạt gạo (px) phải lớn hơn 0!')
    .min(1, 'Độ dài trục lớn này quá nhỏ để mô hình có thể nhận diện chính xác! Hãy nhập lớn hơn')
    .max(9999, 'Con số bạn vừa nhập quá to! Hãy nhập nhỏ lại')
    .required('Hãy nhập độ dài trục lớn của hạt gạo '),
  minor_axis_length: Yup.number()
    .typeError('Phải là một số')
    .positive('Độ dài trục nhỏ của hạt gạo (px) phải lớn hơn 0!')
    .min(1, 'Độ dài trục nhỏ này quá nhỏ để mô hình có thể nhận diện chính xác! Hãy nhập lớn hơn')
    .max(9999, 'Con số bạn vừa nhập quá to! Hãy nhập nhỏ lại')
    .required('Hãy nhập Độ dài trục nhỏ của hạt gạo '),
  eccentricity: Yup.number()
    .typeError('Phải là một số')
    .positive('Độ lệch tâm của hạt gạo (px) phải lớn hơn 0!')
    .min(0, 'Độ lệch tâm này quá nhỏ để mô hình có thể nhận diện chính xác! Hãy nhập lớn hơn')
    .max(1, 'Con số bạn vừa nhập quá to! Hãy nhập nhỏ lại')
    .required('Hãy nhập độ lệch tâm của hạt gạo '),
  convex_area: Yup.number()
    .typeError('Phải là một số')
    .positive('Diện tích của hình bao lồi phải lớn hơn 0!')
    .min(1, 'Diện tích của hình bao lồi quá nhỏ để mô hình có thể nhận diện chính xác! Hãy nhập lớn hơn')
    .max(99999, 'Con số bạn vừa nhập quá to! Hãy nhập nhỏ lại')
    .required('Hãy nhập diện tích của hình bao lồi hạt gạo '),
  extent: Yup.number()
    .typeError('Phải là một số')
    .positive('Extent phải lớn hơn 0!')
    .min(0, 'Extent này quá nhỏ để mô hình có thể nhận diện chính xác! Hãy nhập lớn hơn')
    .max(1, 'Con số bạn vừa nhập quá to! Hãy nhập nhỏ lại')
    .required('Hãy nhập extent của hạt gạo '),
});

const PredictPage: React.FC = () => {
  const [model, setModel] = useState<string>("k-nearest-neighbors")
  const [result, setResult] = useState<string | null>(null)

  const modelOptions:ModelType[] = [
    { value: "k-nearest-neighbors", label: "K-Nearest Neighbors" },
    { value: "naive-bayes", label: "Naive Bayes" },
    { value: "decision-tree", label: "Decision Tree" },
    { value: "random-forest", label: "Random Forest" },
    { value: "support-vector-machine", label: "SVM (Support Vector Machine)" },
    { value: "logistic-regression", label: "Logistic Regression" },
    { value: "multilayer-perceptron", label: "Multilayer Perceptron" },
    { value: "adaboost", label: "Adaboost" },
  ]

  const formik = useFormik({
    initialValues: defaultForm,
    validationSchema: PredictSchema,
    onSubmit: async (values) => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/predict/${model}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        })

        const data: ApiResponse = await res.json()

        if (data.success) {
          setResult(`Kết quả: ${data.data?.prediction}`)
        } else {
          setResult(`Lỗi: ${data.message}`)
        }
      } catch (err) {
        setResult("Không thể kết nối đến máy chủ")
        console.log(err)
      }
    }
  })

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Dự đoán loại gạo</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {Object.keys(defaultForm).map((key) => (
          <div key={key}>
            <label className="block capitalize font-medium">
              {key.replaceAll("_", " ")}:
            </label>
            <input
              type="number"
              name={key}
              value={formik.values[key as keyof RiceInput]}
              onChange={formik.handleChange}
              step="any"
              className="w-full border border-gray-300 rounded px-3 py-1"
              required
            />
            {formik.touched[key as keyof RiceInput] && formik.errors[key as keyof RiceInput] ? (
            <div style={{ color: 'red' }}>{formik.errors[key as keyof RiceInput]}</div>
            ) : null}
          </div>
        ))}
        <div>
          <label className="block font-medium">Chọn mô hình:</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full border px-3 py-1 rounded"
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
        <div className="mt-4 p-3 border rounded bg-gray-100 font-medium">{result}</div>
      )}
    </div>
  )
}

export default PredictPage
