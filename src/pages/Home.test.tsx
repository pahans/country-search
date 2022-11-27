/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import Home from './Home';
import { allCountriesQueryDocument } from '../hooks/useCountries';

const mockData = [
  {
    request: {
      query: allCountriesQueryDocument,
    },
    result: {
      data: {
        countries: [
          { code: 'LK', name: 'Sri Lanka' },
          { code: 'EE', name: 'Estonia' },
        ],
      },
    },
  },
];

const mockEmpty = [
  {
    request: {
      query: allCountriesQueryDocument,
    },
    result: {
      data: {
        countries: [],
      },
    },
  },
];

const mockError = [
  {
    request: {
      query: allCountriesQueryDocument,
    },
    error: new Error('An error occurred'),
  },
];

const setup = async (mockData: MockedResponse<Record<string, any>>[]) => {
  const div = document.createElement('div');
  render(
    <MockedProvider mocks={mockData}>
      <Home />
    </MockedProvider>,
    {
      container: document.body.appendChild(div),
    },
  );
  return {
    input: (await screen.findByLabelText('search-input')) as HTMLInputElement,
  };
};

describe('Main App', () => {
  it('should render all countries in initial render', async () => {
    await setup(mockData);
    expect(screen.queryByRole('status')).toBeVisible();
    await screen.findByText('Sri Lanka');
    await screen.findByText('LK');
    await screen.findByText('Estonia');
    await screen.findByText('EE');
  });
  it('should filter when user is typing a query', async () => {
    const { input } = await setup(mockData);
    fireEvent.change(input, { target: { value: 'LK' } });
    expect(input.value).toBe('LK');
    await screen.findByText('Sri Lanka');
    await screen.findByText('LK');
    expect(screen.queryByText('Estonia')).not.toBeInTheDocument();
  });
  it('show error if fetching failed', async () => {
    await setup(mockError);
    expect(await screen.findByText('An error occurred')).toBeInTheDocument();
  });
  it('show message when query has no results', async () => {
    const { input } = await setup(mockEmpty);
    fireEvent.change(input, { target: { value: 'AA' } });

    expect(
      await screen.findByText('Could not find any counties with query: AA'),
    ).toBeInTheDocument();
  });
});
