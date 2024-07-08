import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

import { TaskPriority } from '../../models/task.model';

@Directive({
  selector: '[tcPriorityColor]',
  standalone: true,
})
export class PriorityColorDirective implements OnInit {
  @Input() tcPriorityColor: string;
  colors = {
    [TaskPriority.Sooner]: '#E1AEAE',
    [TaskPriority.Later]: '#FFE68E',
    [TaskPriority.MaybeNever]: '#649869',
  };

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.colors[this.tcPriorityColor]);
  }
}
