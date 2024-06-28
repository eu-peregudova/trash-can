import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Message } from '../../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  // eslint-disable-next-line prettier/prettier
  messagesSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
  messages$ = this.messagesSubject.asObservable();

  addNewMessage(newMessage: Message): void {
    this.messagesSubject.next([...this.messagesSubject.getValue(), newMessage]);
  }

  getHistory(): Message[] {
    return this.messagesSubject.getValue();
  }
}
