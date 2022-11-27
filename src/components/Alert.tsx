interface AlertProps {
  message: string;
  type: 'info' | 'danger';
}
const Alert: React.FC<AlertProps> = ({ message, type }) => {
  const colorClasses =
    type === 'danger' ? 'text-red-700 bg-red-100' : 'text-gray-700 bg-gray-100';
  return (
    <div
      className={`mt-4 mb-4 p-4 text-sm rounded-lg ${colorClasses}`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default Alert;
