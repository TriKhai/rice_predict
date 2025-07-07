import { useState } from "react"
import type { RiceInput, ApiResponse } from "../../types/rice"

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

const PredictPage: React.FC = () => {
  const [form, setForm] = useState<RiceInput>(defaultForm)
  const [model, setModel] = useState<string>("k-nearest-neighbors")
  const [result, setResult] = useState<string | null>(null)

  const modelOptions:ModelType[] = [
    { value: "k-nearest-neighbors", label: "K-Nearest Neighbors" },
    { value: "naive-bayes", label: "Naive Bayes" },
    { value: "decision-tree", label: "Decision Tree" },
    { value: "random-forest", label: "Random Forest" },
    { value: "support-vector-machine", label: "SVM (Support Vector Machine)" },
    { value: "logistic-regression", label: "Logistic Regression" },
    { value: "multiple-perceptron-learning", label: "Multiple Perceptron Learning" },
    { value: "adaboot", label: "Adaboot" },
  ]


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: parseFloat(value) })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/predict/${model}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Dự đoán loại gạo</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(defaultForm).map((key) => (
          <div key={key}>
            <label className="block capitalize font-medium">
              {key.replaceAll("_", " ")}:
            </label>
            <input
              type="number"
              name={key}
              value={form[key as keyof RiceInput]}
              onChange={handleChange}
              step="any"
              className="w-full border border-gray-300 rounded px-3 py-1"
              required
            />
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
