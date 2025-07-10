import { Parallax } from "react-scroll-parallax";

const VariablesTableComponent = () => {
  const variablesNameAnDescription: Record<string,string> = {
    area: "Diện tích bề mặt hạt gạo (số lượng pixel trong ranh giới của hạt gạo).",
    perimeter: "Chu vi hạt gạo (Tính chu vi bằng cách tính khoảng cách giữa các pixel xung quanh ranh giới của hạt gạo).",
    major_axis_length: "Chiều dài trục chính (Đường dài nhất có thể được vẽ trên hạt gạo).",
    minor_axis_length: "Chiều dài trục phụ (Đường ngắn nhất có thể được vẽ trên hạt gạo).",
    eccentricity: "Độ lệch tâm (Đo độ tròn của elip có cùng mô men với hạt lúa (0 = tròn, gần 1 = elip dài))",
    convex_area: "Vùng lồi (Trả về số lượng pixel của vỏ lồi nhỏ nhất của vùng được hình thành bởi hạt gạo).",
    extent: "Tỷ lệ giữa diện tích hạt lúa (Area) và diện tích hình chữ nhật bao quanh (bounding box)."
  }
  
  return (
    <Parallax speed={0} opacity={[0, 2]} startScroll={1100} endScroll={1500}>
        <p className="text-3xl text-center m-10 font-bold">Bảng thông tin các thuộc tính</p>
        <div className=" overflow-y-auto px-4">
            <table className="w-full border m-auto text-xl">
                <thead className="bg-gray-100 text-left">
                <tr>
                    <th className="border px-4 py-2 w-16 text-center">STT</th>
                    <th className="border px-4 py-2">Tên thuộc tính</th>
                    <th className="border px-4 py-2">Mô tả</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(variablesNameAnDescription).map(([key, value], index) => (
                    <tr key={key} className="even:bg-white odd:bg-gray-50 hover:bg-gray-200 transition">
                    <td className="border px-4 py-2 text-center font-semibold">{index + 1}</td>
                    <td className="border px-4 py-2">{key}</td>
                    <td className="border px-4 py-2">{value}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </Parallax>
  );
}

export default VariablesTableComponent