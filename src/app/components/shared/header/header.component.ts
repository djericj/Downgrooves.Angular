import { Component, ElementRef, Renderer2 } from '@angular/core';
import {
  faBars,
  faHome,
  faMusic,
  faAdjust,
  faHeadphones,
  faShoppingBag,
  faEnvelope,
  faRecordVinyl,
  faCompactDisc,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faInstagram,
  faSoundcloud,
  faTwitter,
  faSpotify,
  faAngular,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  status?: string;
  track: any;
  show = false;
  barsIcon = faBars;
  homeIcon = faHome;
  musicIcon = faMusic;
  releasesIcon = faRecordVinyl;
  remixesIcon = faCompactDisc;
  adjustIcon = faAdjust;
  headphonesIcon = faHeadphones;
  shoppingIcon = faShoppingBag;
  mailIcon = faEnvelope;
  facebookIcon = faFacebook;
  instagramIcon = faInstagram;
  soundcloudIcon = faSoundcloud;
  twitterIcon = faTwitter;
  spotifyIcon = faSpotify;
  angularIcon = faAngular;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  toggleCollapse() {
    this.show = !this.show;
    this.renderer.addClass(
      this.el.nativeElement.querySelector('#navbar'),
      'show'
    );
  }
}
