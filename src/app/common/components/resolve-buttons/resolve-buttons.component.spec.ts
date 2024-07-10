import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveButtonsComponent } from './resolve-buttons.component';

describe('ResolveButtonsComponent', () => {
  let component: ResolveButtonsComponent;
  let fixture: ComponentFixture<ResolveButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResolveButtonsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResolveButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
