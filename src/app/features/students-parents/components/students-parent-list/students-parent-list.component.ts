import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StudentParent } from '../../../../shared/models/student-parent';
import { StudentParentService } from '../../services/student-parent.service';

@Component({
  selector: 'app-students-parent-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './students-parent-list.component.html',
  styleUrl: './students-parent-list.component.css'
})
export class StudentsParentListComponent {

  @Input() relations: StudentParent[] = [];
  @Input() viewMode: 'student' | 'parent' = 'student';
  @Input() studentId?: number;
  @Input() parentId?: number;

  constructor(private studentParentService: StudentParentService) {}

  deleteRelation(studentId: number, parentId: number) {
    if (confirm('Are you sure you want to delete this relationship?')) {
      this.studentParentService.deleteRelation(studentId, parentId).subscribe({
        next: () => {
          this.relations = this.relations.filter(
            r => !(r.student_id === studentId && r.parent_id === parentId))
        },
      });
    }
  }

}
