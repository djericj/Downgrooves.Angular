import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faTwitter,
  faSoundcloud,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent extends BaseComponent implements OnInit {
  facebookIcon = faFacebook;
  twitterIcon = faTwitter;
  envelopeIcon = faEnvelope;
  soundcloudIcon = faSoundcloud;
  youtubeIcon = faYoutube;
  constructor(public _titleService: Title) {
    super(_titleService);
  }

  ngOnInit(): void {
    this._titleService.setTitle('Contact us');
  }
}
