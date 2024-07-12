import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCardForChatComponent } from './task-card-for-chat.component';

describe('TaskCardForChatComponent', () => {
  let component: TaskCardForChatComponent;
  let fixture: ComponentFixture<TaskCardForChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCardForChatComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCardForChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
