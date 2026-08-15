const Skeleton = () => {
  return (
    <div className="card bg-base-100 border border-base-300 shadow-xl animate-pulse overflow-hidden p-6 space-y-4">
      <div className="h-48 bg-base-300 rounded-2xl w-full"></div>
      <div className="flex justify-between">
        <div className="h-6 bg-base-300 rounded w-1/4"></div>
        <div className="h-6 bg-base-300 rounded w-1/6"></div>
      </div>
      <div className="h-6 bg-base-300 rounded w-3/4"></div>
      <div className="h-10 bg-base-300 rounded w-full pt-4"></div>
    </div>
  );
};

export default Skeleton;
