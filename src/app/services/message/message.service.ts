import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  add(message: string): void {
    console.log(message);
    this.messages.push(message);
  }

  clear(): void {
    this.messages = [];
  }
}
