import { ChangeDetectorRef, Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[tcShowAssistant]', standalone: true,
})
export class ShowAssistantDirective implements OnDestroy {
  private ngUnsubscribe$ = new Subject<void>();
  private _showForAuthorized: boolean = true;

  @Input() set tcShowAssistant(value: boolean) {
    this._showForAuthorized = value;
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
    this.userService.isAssistantAuthorized()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(isAuthorized => {
        if ((isAuthorized && this._showForAuthorized) || (!isAuthorized && !this._showForAuthorized)) {
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
