// notification.service.ts
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; // Install Toastr library

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  showNotification(message: string) {
    this.toastr.success(message, '');
  }

  clearNotification(message: string) {
    this.toastr.error(message, '');
  }
}
