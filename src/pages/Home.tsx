import { useState } from 'react';
import CountriesTable from '../components/CountriesTable';
import Input from '../components/SearchInput';

const Home = () => {
  const [query, setQuery] = useState('');
  const handleInputChange = (value: string) => {
    if (value.length <= 2) {
      setQuery(value.toUpperCase());
    }
  };
  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="p-10">
          <Input
            value={query}
            onChange={handleInputChange}
            label="search-input"
          ></Input>
          <CountriesTable query={query}></CountriesTable>
        </div>
      </div>
    </div>
  );
};

export default Home;
