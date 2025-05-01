import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit {

  studentForm: FormGroup;
  isEditMode = false;
  studentId?: number;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      birth_date: ['', Validators.required],
      gender: ['', Validators.required],
      address: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      enrollment_date: ['', Validators.required],
      class_id: [null]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.studentId = +params['id'];
        this.loadStudent(this.studentId);
      }
    });
  }

  loadStudent(id: number) {
    this.isLoading = true;
    this.studentService.getStudentById(id).subscribe({
      next: (student) => {
        this.studentForm.patchValue(student);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
    if (this.studentForm.invalid) return;

    this.isLoading = true;
    const studentData = this.studentForm.value;

    const operation = this.isEditMode
      ? this.studentService.updateStudent(this.studentId!, studentData)
      : this.studentService.createStudent(studentData);

    operation.subscribe({
      next: () => {
        this.router.navigate(['/students']);
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

}
