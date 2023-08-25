import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() onClick: () => void;
  @Input() icon: string;
  @Input() label: string;

  constructor() {}

  ngOnInit(): void {}

  onButtonClick = () => {
    this.onClick();
  };

  getIconClasses() {
    return this.icon ? ` fa-${this.icon}` : '';
  }
}
