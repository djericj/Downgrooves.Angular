import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-link-button',
  templateUrl: './link-button.component.html',
  styleUrls: ['./link-button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class LinkButtonComponent implements OnInit {
  @Input() onClick: () => void;
  @Input() icon: string;
  @Input() label: string;
  @Input() cssClasses: string[];

  constructor() {}

  ngOnInit(): void {}

  onButtonClick = () => {
    this.onClick();
  };

  getIconClasses() {
    return this.icon ? ` fa-${this.icon}` : '';
  }
}
