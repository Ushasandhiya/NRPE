interface Props {
  name: string;
  marks: string;
  attendance: string;
}

export default function StudentCard({ name, marks, attendance }: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md text-center">
      <div className="w-16 h-16 bg-purple-200 rounded-full mx-auto mb-3"></div>
      <h4 className="font-semibold">{name}</h4>
      <p className="text-sm text-gray-500">Marks: {marks}</p>
      <p className="text-sm text-gray-500">Attend: {attendance}</p>
    </div>
  );
}