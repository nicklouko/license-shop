export default function ProductDetailCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center ">
      <div className="bg-white border rounded-2xl  max-w-2xl w-full p-8 shadow-md ">{children}</div>
    </div>
  );
}
