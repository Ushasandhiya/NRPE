interface Props {
  subject: string;
  value: string;
}

export default function AverageScore({ subject, value }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-center">
      <div className="w-24 h-24 rounded-full border-8 border-purple-500 flex items-center justify-center mx-auto mb-3">
        <span className="font-bold">{value}%</span>
      </div>
      <p className="text-gray-600">{subject}</p>
    </div>
  );
}