import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

export interface Contact {
  id?: number;
  name: string;
  email: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private BASE_URL = 'http://localhost:8081/contacts';
    contactsChanged = new Subject<void>();

  constructor(private http: HttpClient) {}

  
  getAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.BASE_URL);
  }


  add(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.BASE_URL, contact);
  }


  update(id: number, contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(
      `${this.BASE_URL}/${id}`,
      contact
    );
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.BASE_URL}/${id}`
    );
  }
}
