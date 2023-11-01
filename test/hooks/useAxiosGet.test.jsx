import { renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';
import CONTACTS_API_URL from '../../src/config';
import useAxiosGet from '../../src/hooks/useAxiosGet';

jest.mock('axios', () => ({
  get: jest.fn()
}));
describe('useAxiosGet', () => {
  const contacts = [
    {
      id: '1',
      name: 'Gio',
      phoneNumber: '089999999999'
    },
    {
      id: '2',
      name: 'Soffie',
      phoneNumber: '089999999988'
    },
    {
      name: 'rehan',
      phoneNumber: '123',
      id: 'brHiUUf'
    }
  ];

  it('should return contacts data, is loading true then false, and error undefined after successfully fetched data', async () => {
    axios.get.mockResolvedValue({ data: { contacts } });
    const { result } = renderHook(() => useAxiosGet(CONTACTS_API_URL));

    expect(result.current.data).toEqual({ contacts: [] });
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.error).toBeUndefined();
    await waitFor(() => {
      expect(result.current.data).toEqual({ contacts });
      expect(result.current.isLoading).toBeFalsy();
      expect(result.current.error).toBeUndefined();
    });
  });

  it('should return contacts data undefined, is loading true then false, and error Network Error after failed fetched data', async () => {
    const error = new Error('Network Error');
    axios.get.mockRejectedValue(error);
    const { result } = renderHook(() => useAxiosGet(CONTACTS_API_URL));

    expect(result.current.data).toEqual({ contacts: [] });
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.error).toBeUndefined();
    await waitFor(() => {
      expect(result.current.data).toEqual({ contacts: [] });
      expect(result.current.isLoading).toBeFalsy();
      expect(result.current.error).toEqual(error);
    });
  });
});
