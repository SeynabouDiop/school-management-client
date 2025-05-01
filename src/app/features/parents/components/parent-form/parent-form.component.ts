import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ParentService } from '../../services/parent.service';

@Component({
  selector: 'app-parent-form',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './parent-form.component.html',
  styleUrl: './parent-form.component.css'
})
export class ParentFormComponent implements OnInit {

  parentForm: FormGroup;
  isEditMode = false;
  parentId?: number;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private parentService: ParentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.parentForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: [''],
      profession: ['']
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.parentId = +params['id'];
        this.loadParent(this.parentId);
      }
    });
  }

  loadParent(id: number) {
    this.isLoading = true;
    this.parentService.getParentById(id).subscribe({
      next: (parent) => {
        this.parentForm.patchValue(parent);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
    if (this.parentForm.invalid) return;

    this.isLoading = true;
    const parentData = this.parentForm.value;

    const operation = this.isEditMode
      ? this.parentService.updateParent(this.parentId!, parentData)
      : this.parentService.createParent(parentData);

    operation.subscribe({
      next: () => {
        this.router.navigate(['/parents']);
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

}
