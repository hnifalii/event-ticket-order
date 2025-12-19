export default function EventCardLoading() {
  return (
    <div className="w-full h-full flex flex-col bg-white rounded-lg shadow overflow-hidden animate-pulse transition-opacity duration-300">
      {/* Image */}
      <div className="aspect-2/1 bg-gray-200" />

      {/* Content */}
      <div className="flex flex-1">
        {/* Date */}
        <div className="flex flex-col items-center px-4 my-auto gap-2">
          <div className="w-10 h-4 bg-gray-200 rounded" />
          <div className="w-8 h-8 bg-gray-300 rounded" />
        </div>

        {/* Details */}
        <div className="flex flex-col flex-1 py-4 pr-4 gap-3">
          <div className="h-5 bg-gray-300 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />

          <div className="flex items-center gap-2 mt-auto">
            <div className="w-5 h-5 bg-gray-300 rounded-full" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>

          <div className="h-6 bg-gray-300 rounded w-1/3 mt-2" />
        </div>
      </div>
    </div>
  );
}
