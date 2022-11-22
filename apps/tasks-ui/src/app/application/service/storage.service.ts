import { Injectable } from '@angular/core';
import { BoardModel } from '@libs/shared';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private dataKey = 'data';

  write(data: any) {
    localStorage.setItem(this.dataKey, JSON.stringify(data) ?? null);
  }

  read() {
    const data = localStorage.getItem(this.dataKey);
    return data ? JSON.parse(data) : []
  }
}
