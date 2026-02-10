interface Props {
  title: string;
  value: string | number;
}

export default function StatsCard({ title, value }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-2 text-gray-800">{value}</h2>
    </div>
  );
}