import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'tc-fast-prompt',
  templateUrl: './fast-prompt.component.html',
  styleUrls: ['./fast-prompt.component.scss'],
})
export class FastPromptComponent implements OnInit {
  options: {
    shop: string;
    oneHour: string;
    freeDay: string;
  };

  ngOnInit(): void {
    this.options = {
      shop: "I'm in the grocery store right now",
      oneHour: 'I have one hour of free time',
      freeDay: 'I have a free day today',
    };
  }

  @Output()
  fastPromptEvent = new EventEmitter<string>();

  @Output()
  typeYourselfEvent = new EventEmitter<string>();

  fastPrompt(value): void {
    this.fastPromptEvent.emit(value);
  }

  typeYourself(): void {
    this.typeYourselfEvent.emit();
  }
}
