import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  status?: string;
  track: any;
  show = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private _router: Router
  ) {}

  toggleCollapse() {
    this.show = !this.show;
    this.renderer.addClass(
      this.el.nativeElement.querySelector('#navbar'),
      'show'
    );
  }

  navigateTo = (args: any) => {
    var url = args as string;
    return () => {
      return this._router.navigateByUrl(url);
    };
  };

  navigateToExternalUrl = (args: any) => {
    var url = args as string;
    return () => {
      window.open(url, '_new');
      return;
    };
  };
}
