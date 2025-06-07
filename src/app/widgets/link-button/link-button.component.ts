import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-link-button',
  templateUrl: './link-button.component.html',
  styleUrls: ['./link-button.component.scss'],
  standalone: true,
  imports: [NgClass]
})
export class LinkButtonComponent implements OnInit {
  @Input() onClick: () => void;
  @Input() icon: string;
  @Input() label: string;
  @Input() cssClasses: string[];

  private brands = [
    'spotify',
    'youtube',
    'beatport',
    'soundcloud',
    'apple',
    'facebook',
    'twitter',
    'instagram',
  ];

  constructor() { }

  ngOnInit(): void { }

  onButtonClick = () => {
    this.onClick();
  };

  getIconClasses() {
    let cssClass = '';
    if (this.icon) {
      if (this.brands.find((b) => b === this.icon)) {
        cssClass += 'fa-brands';
      }
      cssClass += ` fa-${this.icon}`;
    }
    return cssClass;
  }
}
