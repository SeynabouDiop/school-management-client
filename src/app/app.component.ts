import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './features/layouts/navbar/navbar.component';
import { FooterComponent } from './features/layouts/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,RouterLink,NavbarComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'school-management-client';

  router = inject(Router);

  isDashboardRoute(): boolean {
    return this.router.url.startsWith('/dashboard');
  }
  
}
