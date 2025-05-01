import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentListComponent } from '../features/students/components/student-list/student-list.component';
import { StudentFormComponent } from '../features/students/components/student-form/student-form.component';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet,CommonModule,RouterLink,StudentListComponent,StudentFormComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  authService = inject(AuthService); 

  showStudents = false;

  toggleStudentsView() {
    this.showStudents = !this.showStudents;
  }

  logout(): void {
    this.authService.logout();
  }

}
