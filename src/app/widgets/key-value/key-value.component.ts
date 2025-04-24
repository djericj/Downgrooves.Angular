import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-key-value',
  templateUrl: './key-value.component.html',
  styleUrls: ['./key-value.component.scss'],
  standalone: true
})
export class KeyValueComponent {
  @Input() keyValue: { key: string; value: string };
  constructor() { }
}
