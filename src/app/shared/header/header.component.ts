import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  status?: string;
  track: any;
  show = false;

  constructor(
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    // this.router.events.subscribe((event: Event) => {
    //   switch (true) {
    //     case event instanceof NavigationEnd:
    //       break;
    //   }
    // });
  }

  ngOnInit() {}

  toggleCollapse() {
    this.show = !this.show;
    this.renderer.addClass(
      this.el.nativeElement.querySelector('#navbar'),
      'show'
    );
  }
}
