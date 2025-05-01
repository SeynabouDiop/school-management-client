import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StudentParentService } from '../../services/student-parent.service';

@Component({
  selector: 'app-students-parent-form',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './students-parent-form.component.html',
  styleUrl: './students-parent-form.component.css'
})
export class StudentsParentFormComponent {

  relationForm: FormGroup;
  isEditMode = false;
  studentId?: number;
  parentId?: number;
  isLoading = false;
  relationships = ['Father', 'Mother', 'Guardian', 'Other'];

  constructor(
    private fb: FormBuilder,
    private studentParentService: StudentParentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.relationForm = this.fb.group({
      relationship: ['', Validators.required],
      is_primary_contact: [false]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.studentId = +params['studentId'];
      this.parentId = +params['parentId'];

      if (this.studentId && this.parentId) {
        this.isEditMode = true;
        this.loadRelation(this.studentId, this.parentId);
      }
    });
  }

  loadRelation(studentId: number, parentId: number) {
    this.isLoading = true;
    this.studentParentService.getStudentRelations(studentId).subscribe({
      next: (relations) => {
        const relation = relations.find(r => r.parent_id === parentId);
        if (relation) {
          this.relationForm.patchValue({
            relationship: relation.relationship,
            is_primary_contact: relation.is_primary_contact
          });
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
    if (this.relationForm.invalid || !this.studentId || !this.parentId) return;

    this.isLoading = true;
    const relationData = this.relationForm.value;

    const operation = this.isEditMode
      ? this.studentParentService.updateRelation(
        this.studentId,
        this.parentId,
        relationData
      )
      : this.studentParentService.createRelation({
        student_id: this.studentId,
        parent_id: this.parentId,
        ...relationData
      });

    operation.subscribe({
      next: () => {
        this.router.navigate(['/students', this.studentId, 'parents']);
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

}
