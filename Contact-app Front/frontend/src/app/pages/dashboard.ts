import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ContactService, Contact } from '../services/contactservice';
import { AuthService } from '../services/authservice';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dashboard">

      <!-- SIDEBAR -->
      <aside class="sidebar">
        <div class="sidebar-content">
          <h5 class="sidebar-title"> My Profile</h5>

          <div class="profile-box">
            <div class="profile-icon">{{ user.name?.charAt(0)?.toUpperCase() || 'U' }}</div>
            <p class="profile-name">{{ user.name || 'User' }}</p>
            <p class="profile-email">{{ user.email }}</p>

            <button
              type="button"
              class="btn-profile"
              routerLink="/update-profile">
               Update Profile
            </button>

            <button
              type="button"
              class="btn-logout"
              (click)="onLogout()">
               Logout
            </button>
          </div>
        </div>
      </aside>

      <!-- MAIN CONTENT -->
      <main class="content">
        <div class="content-header">
          <div>
            <h2 class="greeting">{{ greeting }}, {{ user.name || 'User' }} 👋</h2>
            <p class="subtitle">Manage your contacts effortlessly</p>
          </div>

          <button
            type="button"
            class="btn-add"
            routerLink="/add-contact">
             Add Contact
          </button>
        </div>

        <!-- LOADING -->
        <div *ngIf="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Loading contacts...</p>
        </div>

        <!-- NO CONTACTS -->
        <div *ngIf="!loading && contacts.length === 0" class="empty-state">
          <div class="empty-icon"></div>
          <h3>No Contacts Yet</h3>
          <p>Start by adding your first contact</p>
          <button class="btn-add" routerLink="/add-contact">
            Add Your First Contact
          </button>
        </div>

        <!-- CONTACT LIST -->
        <div *ngIf="!loading && contacts.length > 0" class="contacts-section">
          <h3 class="section-title">Your Contacts ({{ contacts.length }})</h3>
          
          <div class="contacts-grid">
            <div
              class="contact-card"
              *ngFor="let c of contacts; trackBy: trackById">

              <div class="contact-avatar">{{ c.name?.charAt(0)?.toUpperCase() || 'C' }}</div>

              <div class="contact-info">
                <h6 class="contact-name">{{ c.name }}</h6>
                <p class="contact-email">
                  <a [href]="'mailto:' + c.email">📧 {{ c.email }}</a>
                </p>
                <p class="contact-phone">
                  <a [href]="'tel:' + c.phone">☎️ {{ c.phone }}</a>
                </p>
              </div>

              <div class="contact-actions">
                <button
                  type="button"
                  class="btn-edit"
                  (click)="editContact(c)"
                  title="Edit Contact">
                  Edit
                </button>

                <button
                  type="button"
                  class="btn-delete"
                  (click)="deleteContact(c.id!)"
                  title="Delete Contact">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  `,
  styles: [`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .dashboard {
      display: flex;
      height: 100vh;
      background: #f5f7fa;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    /* SIDEBAR */
    .sidebar {
      width: 320px;
      background: white;
      padding: 30px 20px;
      border-right: 1px solid #e2e8f0;
      overflow-y: auto;
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
    }

    .sidebar-content {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    .sidebar-title {
      font-size: 18px;
      font-weight: 700;
      color: #2d3748;
    }

    .profile-box {
      background: #4a90e2;
      border-radius: 12px;
      padding: 25px;
      color: white;
      text-align: center;
      box-shadow: 0 4px 12px rgba(74, 144, 226, 0.2);
    }

    .profile-icon {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      font-weight: 700;
      margin: 0 auto 15px;
      border: 2px solid rgba(255, 255, 255, 0.4);
    }

    .profile-name {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 5px;
    }

    .profile-email {
      font-size: 12px;
      opacity: 0.95;
      margin-bottom: 20px;
      word-break: break-all;
    }

    .btn-profile {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.4);
      padding: 10px 16px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.2s ease;
      font-size: 13px;
    }

    .btn-profile:hover {
      background: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.6);
    }

    .btn-logout {
      background: rgba(231, 76, 60, 0.9);
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.6);
      padding: 10px 16px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.2s ease;
      font-size: 13px;
      margin-top: 10px;
    }

    .btn-logout:hover {
      background: rgba(192, 57, 43, 1);
      border-color: white;
    }

    /* MAIN CONTENT */
    .content {
      flex: 1;
      padding: 40px;
      overflow-y: auto;
      background: #f5f7fa;
    }

    .content-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
      flex-wrap: wrap;
      gap: 20px;
    }

    .greeting {
      font-size: 32px;
      font-weight: 700;
      color: #2d3748;
      margin-bottom: 8px;
    }

    .subtitle {
      font-size: 14px;
      color: #718096;
    }

    .btn-add {
      background: #4a90e2;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      font-size: 14px;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(74, 144, 226, 0.3);
    }

    .btn-add:hover {
      background: #357abd;
      box-shadow: 0 4px 12px rgba(74, 144, 226, 0.4);
    }

    .btn-add:active {
      transform: translateY(1px);
    }

    /* LOADING STATE */
    .loading-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
      padding: 60px 20px;
      color: #718096;
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid #e2e8f0;
      border-top: 4px solid #4a90e2;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* EMPTY STATE */
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
      padding: 80px 20px;
      color: #718096;
      text-align: center;
    }

    .empty-icon {
      font-size: 64px;
      opacity: 0.5;
    }

    .empty-state h3 {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #2d3748;
    }

    .empty-state p {
      font-size: 14px;
      margin-bottom: 20px;
    }

    /* CONTACTS SECTION */
    .contacts-section {
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .section-title {
      font-size: 20px;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 25px;
    }

    .contacts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 20px;
    }

    .contact-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    .contact-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
      border-color: #cbd5e0;
    }

    .contact-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #4a90e2;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: 700;
      flex-shrink: 0;
    }

    .contact-info {
      flex: 1;
      min-width: 180px;
      overflow: hidden;
    }

    .contact-name {
      font-size: 16px;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .contact-email,
    .contact-phone {
      font-size: 13px;
      color: #718096;
      margin-bottom: 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .contact-email a,
    .contact-phone a {
      color: #4a90e2;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .contact-email a:hover,
    .contact-phone a:hover {
      color: #357abd;
      text-decoration: underline;
    }

    .contact-actions {
      display: flex;
      gap: 10px;
      flex-shrink: 0;
      margin-left: auto;
    }

    .btn-edit,
    .btn-delete {
      padding: 8px 16px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      white-space: nowrap;
    }

    .btn-edit {
      background: #e8f4ff;
      color: #4a90e2;
    }

    .btn-edit:hover {
      background: #4a90e2;
      color: white;
    }

    .btn-delete {
      background: #fee;
      color: #e74c3c;
    }

    .btn-delete:hover {
      background: #e74c3c;
      color: white;
    }

    /* SCROLLBAR */
    .content::-webkit-scrollbar {
      width: 8px;
    }

    .content::-webkit-scrollbar-track {
      background: #f5f7fa;
    }

    .content::-webkit-scrollbar-thumb {
      background: #cbd5e0;
      border-radius: 4px;
    }

    .content::-webkit-scrollbar-thumb:hover {
      background: #a0aec0;
    }

    .sidebar::-webkit-scrollbar {
      width: 6px;
    }

    .sidebar::-webkit-scrollbar-track {
      background: #f7fafc;
    }

    .sidebar::-webkit-scrollbar-thumb {
      background: #cbd5e0;
      border-radius: 3px;
    }

    .sidebar::-webkit-scrollbar-thumb:hover {
      background: #a0aec0;
    }

    /* RESPONSIVE */
    @media (max-width: 768px) {
      .dashboard {
        flex-direction: column;
        height: auto;
      }

      .sidebar {
        width: 100%;
        padding: 20px;
        border-right: none;
        border-bottom: 1px solid #e2e8f0;
      }

      .content {
        padding: 20px;
      }

      .greeting {
        font-size: 24px;
      }

      .content-header {
        flex-direction: column;
        align-items: flex-start;
      }

      .contacts-grid {
        grid-template-columns: 1fr;
      }

      .contact-card {
        flex-wrap: wrap;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {

  user: any = {};
  greeting = '';
  contacts: Contact[] = [];
  loading = true;

  constructor(
    private router: Router,
    private contactService: ContactService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.setGreeting();
    this.loadUser();
    this.loadContacts();

    
    this.contactService.contactsChanged.subscribe(() => {
      console.log('🔔 contactsChanged event received! Reloading contacts...');
      this.loadContacts();
    });
  }

  loadUser(): void {
    this.user = this.authService.getUser();
  }

  setGreeting(): void {
    const hour = new Date().getHours();
    if (hour < 12) this.greeting = 'Good Morning';
    else if (hour < 17) this.greeting = 'Good Afternoon';
    else this.greeting = 'Good Evening';
  }

  loadContacts(): void {
    this.loading = true;
    console.log('📋 Loading contacts...');

    this.contactService.getAll().subscribe({
      next: (data: Contact[]) => {
        console.log('✅ Contacts received from API:', data);
        console.log('📊 Number of contacts:', data.length);
        this.contacts = data;
        this.loading = false;
        console.log('✅ Dashboard contacts array updated:', this.contacts);
        console.log('✅ Loading flag set to:', this.loading);
        this.cdr.detectChanges();
        console.log('✅ Change detection triggered');
      },
      error: err => {
        console.error('❌ Error loading contacts:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  deleteContact(id: number): void {
    this.contactService.delete(id).subscribe(() => {
      this.loadContacts();
    });
  }

  editContact(contact: Contact): void {
    this.router.navigate(
      ['/add-contact'],
      { state: { contact } }
    );
  }

  trackById(index: number, contact: Contact): number {
    return contact.id || index;
  }

  onLogout(): void {
   
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log(' Logged out - token cleared');
    
    
    this.router.navigate(['/login']);
  }
}
