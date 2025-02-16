import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = "https://sheetdb.io/api/v1/rpo3o4nae1ren";

  constructor(private http: HttpClient) { }

  postStudent(data: any) {
    return this.http.post<any>(this.baseUrl, data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getStudent() {
    return this.http.get<any>(this.baseUrl)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  deleteStudent(id: string) {
    return this.http.delete<any>(`${this.baseUrl}/id/${id}`)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  updateStudent(data: any, id: string) {
    return this.http.put<any>(`${this.baseUrl}/id/${id}`, data)
      .pipe(map((res: any) => {
        return res;
      }));
  }
}
