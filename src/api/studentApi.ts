import { City, ListParams, ListResponse, Student } from 'models';
import { axiosClient } from './axiosClient';

const studentApi = {
  getAll(params: ListParams): Promise<ListResponse<City>> {
    const url = '/students';
    return axiosClient.get(url, { params });
  },

  getById(id: string): Promise<Student> {
    const url = `/students/${id}`;
    return axiosClient.get(url);
  },
  
  add(params: ListParams): Promise<ListResponse<City>> {
    const url = '/students';
    return axiosClient.get(url, { params });
  },

  update(id: string, data: Student): Promise<Student> {
    const url = `/students/${id}`;
    return axiosClient.patch(url, data);
  },

  remove(id: string): Promise<any> {
    const url = `/students/${id}`;
    return axiosClient.delete(url);
  },
};

export { studentApi };
