import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  status?: string;
  track: any;
  show = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  toggleCollapse() {
    this.show = !this.show;
    this.renderer.addClass(
      this.el.nativeElement.querySelector('#navbar'),
      'show'
    );
  }
}
