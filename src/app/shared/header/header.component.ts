import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {
  faBars,
  faHome,
  faMusic,
  faAdjust,
  faHeadphones,
  faShoppingBag,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faInstagram,
  faSoundcloud,
  faTwitter,
  faSpotify,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  status?: string;
  track: any;
  show = false;
  barsIcon = faBars;
  homeIcon = faHome;
  musicIcon = faMusic;
  adjustIcon = faAdjust;
  headphonesIcon = faHeadphones;
  shoppingIcon = faShoppingBag;
  mailIcon = faEnvelope;
  facebookIcon = faFacebook;
  instagramIcon = faInstagram;
  soundcloudIcon = faSoundcloud;
  twitterIcon = faTwitter;
  spotifyIcon = faSpotify;

  constructor(
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {}

  toggleCollapse() {
    this.show = !this.show;
    this.renderer.addClass(
      this.el.nativeElement.querySelector('#navbar'),
      'show'
    );
  }
}
