export default function Loading() {
  return (
    <main className="w-full px-48 p-6 animate-pulse">
      <div className="p-4 rounded-lg bg-[#e5bdff]">
        <div className="w-full aspect-3/1 rounded-lg overflow-hidden object-cover object-center border-2 bg-linear-to-br from-gray-200 to-gray-100" />
      </div>

      <div className="flex flex-col py-4 gap-4">
        <div className="w-2/3 h-10 bg-gray-300 rounded-md"></div>
        <div className="h-8 bg-gray-300 rounded-md"></div>
      </div>

      <div className="mt-6 p-4 border rounded bg-white shadow">
        <h3 className="font-semibold">Price</h3>
      </div>

      <div
        className="w-1/5 h-12 inline-block mt-6 bg-gray-200 rounded"
      >
      </div>
    </main>
  );
}
