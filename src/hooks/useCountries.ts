import { useQuery } from '@apollo/client';
import { graphql } from '../gql';

export const allCountriesQueryDocument = graphql(/* GraphQL */ `
  query GetCountries {
    countries {
      name
      code
    }
  }
`);

export default function useCountries() {
  const { data, loading, error } = useQuery(allCountriesQueryDocument);
  return {
    loading,
    error,
    countries: data?.countries || [],
  };
}
