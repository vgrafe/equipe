const Progress = ({ value }) =>
  value ? (
    <div>
      <div>{~~(value * 100)}% done</div>
      <div className="w-64 bg-gray-400 rounded-sm h-2 mb-4">
        <div
          className="bg-green-500 rounded-sm left-0 h-2"
          style={{ width: `${value * 100}%` }}
        />
      </div>
    </div>
  ) : null;

export default Progress;
