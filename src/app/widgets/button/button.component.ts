import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [NgClass]
})
export class ButtonComponent implements OnInit {
  @Input() onClick: () => void;
  @Input() icon: string;
  @Input() label: string;
  @Input() cssClasses: string[];

  constructor() { }

  ngOnInit(): void { }

  onButtonClick = () => {
    this.onClick();
  };

  getIconClasses() {
    return this.icon ? ` fa-${this.icon}` : '';
  }
}
