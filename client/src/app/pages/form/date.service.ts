// date.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  getCurrentMonth(): number {
    return new Date().getMonth() + 1; // +1 because getMonth() returns zero-based index
  }
}
