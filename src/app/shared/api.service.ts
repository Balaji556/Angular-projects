import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postStudent(data: any) {
    return this.http.post<any>("http://localhost:8083/api/v1/insert", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  getStudent() {
    return this.http.get<any>("https://sheetdb.io/api/v1/rpo3o4nae1ren")
      .pipe(map((res: any) => {
        return res;
      }))
  }
 
  deleteStudent(id: string) {
    return this.http.delete<any>("https://sheetdb.io/api/v1/rpo3o4nae1ren" + id)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  updateStudent(data: any, id: string) {
    return this.http.put<any>("https://sheetdb.io/api/v1/rpo3o4nae1ren" + id, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
}
