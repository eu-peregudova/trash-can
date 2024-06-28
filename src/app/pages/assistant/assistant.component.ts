import { Component } from '@angular/core';
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

  constructor(
    private assistantService: AssistantService,
    private messageService: MessageService
  ) {
    this.messages = this.messageService.messages$;
  }

  onInput(): void {
    if (this.inputValue) {
      this.messageService.addNewMessage({ content: this.inputValue, role: 'user' });
      this.assistantService.getSuggestion(this.messageService.getHistory()).subscribe((message) => {
        this.messageService.addNewMessage({ content: message, role: 'assistant' });
      });
      this.inputValue = '';
    }
  }

  trackByMessage(i: number): number {
    return i;
  }
}
