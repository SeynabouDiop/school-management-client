import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentParent } from '../../../shared/models/student-parent';
import { Observable } from 'rxjs';
import { Parent } from '../../../shared/models/parent';

@Injectable({
  providedIn: 'root'
})
export class StudentParentService {

  private apiUrl = 'http://localhost:3000/api/student-parent';

  constructor(private http: HttpClient) { }

  createRelation(relation: Omit<StudentParent, 'student_first_name' | 'student_last_name' | 'parent_first_name' | 'parent_last_name'>): Observable<StudentParentRelation> {
    return this.http.post<StudentParent>(this.apiUrl, relation);
  }

  getStudentRelations(studentId: number): Observable<StudentParent[]> {
    return this.http.get<StudentParent[]>(`${this.apiUrl}/student/${studentId}`);
  }

  getParentRelations(parentId: number): Observable<StudentParent[]> {
    return this.http.get<StudentParent[]>(`${this.apiUrl}/parent/${parentId}`);
  }

  updateRelation(studentId: number, parentId: number, relation: Partial<StudentParent>): Observable<StudentParent> {
    return this.http.put<StudentParent>(`${this.apiUrl}/${studentId}/${parentId}`, relation);
  }

  deleteRelation(studentId: number, parentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${studentId}/${parentId}`);
  }

  getPrimaryContact(studentId: number): Observable<Parent> {
    return this.http.get<Parent>(`${this.apiUrl}/primary-contact/${studentId}`);
  }

}
