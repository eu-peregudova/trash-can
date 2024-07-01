import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

import { AssistantService } from '../../common/services/assistant.service';
import { MessageService } from '../../common/services/message.service';
import { Message } from '../../models/message.model';

@Component({
  selector: 'tc-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.scss'],
})
export class AssistantComponent implements OnDestroy {
  inputValue = '';
  messages: Observable<Message[]>;
  private ngUnsubscribe$ = new Subject<void>();

  @ViewChild('inputMessage') inputMessage: ElementRef;

  constructor(
    private assistantService: AssistantService,
    private messageService: MessageService
  ) {
    this.messages = this.messageService.messages$;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  trackByMessage(i: number): number {
    return i;
  }

  onInput(): void {
    if (this.inputValue.trim()) {
      this.sendMessage({ content: this.inputValue.trim(), role: 'user' });
      this.inputValue = '';
    }
  }

  onFastButton(prompt: string): void {
    this.sendMessage({ content: prompt, role: 'user' });
  }

  onFastType(): void {
    this.inputMessage.nativeElement.focus();
  }

  sendMessage(message: Message): void {
    this.messageService.addNewMessage(message);
    this.assistantService
      .getSuggestion(this.messageService.getHistory())
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((message) => {
        this.messageService.addNewMessage({ content: message, role: 'assistant' });
      });
  }
}
