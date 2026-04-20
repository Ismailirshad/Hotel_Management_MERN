const TableSkeleton = () => {
  return (
    <table>
      <thead>
        {[...Array(5)].map((_, i) => (
          <tr key={i} className="border-b border-white/5 animate-pulse">
            <td className="px-4 py-4">
              <div className="h-4 w-24 bg-white/10 rounded" />
            </td>
            <td className="px-4 py-4">
              <div className="h-4 w-24 bg-white/10 rounded" />
            </td>
            <td className="px-4 py-4">
              <div className="h-4 w-40 bg-white/10 rounded" />
            </td>
            <td className="px-4 py-4">
              <div className="h-4 w-32 bg-white/10 rounded" />
            </td>
            <td className="px-4 py-4 text-center">
              <div className="h-6 w-32 bg-white/10 rounded-full mx-auto" />
            </td>
          </tr>
        ))}
      </thead>
    </table>
  );
};
export default TableSkeleton;
