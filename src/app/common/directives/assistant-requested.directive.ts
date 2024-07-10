import { ChangeDetectorRef, Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subject, takeUntil } from 'rxjs';
import { UserRole } from '../../models/user-role.model';

@Directive({
  selector: '[tcAssistantRequested]',
  standalone: true,
})
export class AssistantRequestedDirective {
  private _userRole: UserRole;

  @Input() set tcAssistantRequested(value: UserRole) {
    this._userRole = value;
    this.updateView();
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private cdRef: ChangeDetectorRef
  ) {
    this.updateView();
  }

  private updateView(): void {
    this.viewContainer.clear();
    if (this._userRole === UserRole.Requested) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
    this.cdRef.markForCheck();
  }
}
