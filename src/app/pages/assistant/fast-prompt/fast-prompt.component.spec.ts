import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastPromptComponent } from './fast-prompt.component';

describe('FastPromptComponent', () => {
  let component: FastPromptComponent;
  let fixture: ComponentFixture<FastPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FastPromptComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FastPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
