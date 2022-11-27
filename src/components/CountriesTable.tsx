import useCountries from '../hooks/useCountries';
import Alert from './Alert';

interface CountriesTableProps {
  query: string;
}

const Countries: React.FC<CountriesTableProps> = ({ query = '' }) => {
  const { countries, error, loading } = useCountries();
  const filteredCountries = countries.filter((country) => {
    return country.code.toUpperCase().startsWith(query.trim());
  });
  return (
    <div>
      {loading ? (
        <div
          role="status"
          className="max-w mt-4 animate-pulse grid grid-cols-2 gap-2"
        >
          <div className="h-4 bg-gray-200 rounded-full"></div>
          <div className="h-4 bg-gray-200 rounded-full "></div>
          <div className="h-4 bg-gray-200 rounded-full "></div>
          <div className="h-4 bg-gray-200 rounded-full"></div>
          <div className="h-4 bg-gray-200 rounded-full"></div>
          <div className="h-4 bg-gray-200 rounded-full"></div>
          <span className="sr-only">Loading...</span>
        </div>
      ) : null}
      {error ? <Alert message={error.message} type="danger" /> : null}
      {!error && filteredCountries.length > 0 ? (
        <table className="mt-4 w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="p-3 text-left w-2/3">Country Name</th>
              <th className="p-3 text-left w-1/3">Country Code</th>
            </tr>
          </thead>
          <tbody data-testid="country-list">
            {filteredCountries.map((country) => {
              return (
                <tr
                  key={country.code}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="w-2/3 border p-3">{country.name}</td>
                  <td className="w-1/3 border p-3">{country.code}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : null}
      {filteredCountries.length === 0 && !loading && !error ? (
        <Alert
          message={`Could not find any counties with query: ${query}`}
          type="info"
        />
      ) : null}
    </div>
  );
};

export default Countries;
