import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parent } from '../../../shared/models/parent';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  private apiUrl = 'http://localhost:3000/api/parents';

  constructor(private http: HttpClient) { }

  getAllParents(): Observable<Parent[]> {
    return this.http.get<Parent[]>(this.apiUrl);
  }

  getParentById(id: number): Observable<Parent> {
    return this.http.get<Parent>(`${this.apiUrl}/${id}`);
  }

  createParent(parent: Omit<Parent, 'parent_id'>): Observable<Parent> {
    return this.http.post<Parent>(this.apiUrl, parent);
  }

  updateParent(id: number, parent: Partial<Parent>): Observable<Parent> {
    return this.http.put<Parent>(`${this.apiUrl}/${id}`, parent);
  }

  deleteParent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
