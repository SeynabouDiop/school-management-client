import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Parent } from '../../../../shared/models/parent';
import { ParentService } from '../../services/parent.service';

@Component({
  selector: 'app-parent-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './parent-list.component.html',
  styleUrl: './parent-list.component.css'
})
export class ParentListComponent {

  parents: Parent[] = [];
  isLoading = true;
  router: any;

  constructor(private parentService: ParentService) {}

  ngOnInit() {
    this.loadParents();
  }

  loadParents() {
    this.isLoading = true;
    this.parentService.getAllParents().subscribe({
      next: (parents) => {
        this.parents = parents;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  editParent(id: number) {
    this.router.navigate(['/dashboard/parents', id, 'edit']);
  }

  deleteParent(id: number) {
    if (confirm('Are you sure you want to delete this parent?')) {
      this.parentService.deleteParent(id).subscribe({
        next: () => {
          this.loadParents();
        }
      });
    }
  }

}
