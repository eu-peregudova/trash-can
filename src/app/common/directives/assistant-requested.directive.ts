import { ChangeDetectorRef, Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[tcAssistantRequested]', standalone: true,
})
export class AssistantRequestedDirective implements OnDestroy {
  private ngUnsubscribe$ = new Subject<void>();
  private _showForRequested: boolean = true;


  @Input() set tcAssistantRequested (value: boolean) {
    this._showForRequested = value;
    this.updateView();
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserService,
    private cdRef: ChangeDetectorRef
  ) {
    this.updateView();
  }

  private updateView(): void {
    this.ngUnsubscribe$.next();
    this.userService.isAssistantRequested()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(isRequested => {
        if ((isRequested && this._showForRequested) || (!isRequested && !this._showForRequested)) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
        this.cdRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
    this.ngUnsubscribe$.unsubscribe();
  }
}
