import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContactComponent extends BaseComponent implements OnInit {
  constructor(public _titleService: Title) {
    super(_titleService);
  }

  ngOnInit(): void {
    this.setTitle('Contact us');
  }
}
