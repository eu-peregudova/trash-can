import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { AssistantService } from '../../common/services/assistant.service';
import { MessageService } from '../../common/services/message.service';
import { Message } from '../../models/message.model';

@Component({
  selector: 'tc-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.scss'],
})
export class AssistantComponent {
  inputValue = '';
  messages: Observable<Message[]>;

  @ViewChild('inputMessage') inputMessage: ElementRef;

  constructor(
    private assistantService: AssistantService,
    private messageService: MessageService
  ) {
    this.messages = this.messageService.messages$;
  }

  onInput(): void {
    if (this.inputValue.trim()) {
      this.sendMessage({ content: this.inputValue.trim(), role: 'user' });
      this.inputValue = '';
    }
  }

  trackByMessage(i: number): number {
    return i;
  }

  onFastButton(prompt: string): void {
    this.sendMessage({ content: prompt, role: 'user' });
  }

  onFastType(): void {
    this.inputMessage.nativeElement.focus();
  }

  sendMessage(message: Message): void {
    this.messageService.addNewMessage(message);
    this.assistantService.getSuggestion(this.messageService.getHistory()).subscribe((message) => {
      this.messageService.addNewMessage({ content: message, role: 'assistant' });
    });
  }
}
