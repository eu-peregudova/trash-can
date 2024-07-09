import { ChangeDetectorRef, Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../services/user.service';
import { UserRole } from '../../models/user-role.model';

@Directive({
  selector: '[tcShowAuth]',
  standalone: true,
})
export class ShowAuthDirective {
  private _userRole: UserRole;

  @Input() set tcShowAuth(value: UserRole) {
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
    console.log(this._userRole)
      if (this._userRole && this._userRole !== UserRole.Guest) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
      this.cdRef.markForCheck();
  }
}
