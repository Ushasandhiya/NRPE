export default function Filters() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      
      {/* Select Year */}
      <select className="p-3 rounded-xl border bg-white shadow-sm">
        <option>Select Year</option>
        <option>2022</option>
        <option>2023</option>
        <option>2024</option>
      </select>

      {/* Select Grade */}
      <select className="p-3 rounded-xl border bg-white shadow-sm">
        <option>Select Grade</option>
        <option>Grade 1</option>
        <option>Grade 2</option>
        <option>Grade 3</option>
      </select>

    </div>
  );
}