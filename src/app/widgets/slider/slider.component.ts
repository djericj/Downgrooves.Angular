import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-slider',
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent implements OnInit {
  @Input() min: number;
  @Input() max: number;
  @Input() value: number;
  @Input() changeFunc: () => void;
  private sliderValue$ = new BehaviorSubject<number>(100);

  ngOnInit(): void {

  }

  onChange(e) {
    this.sliderValue$.next(e.target.value);

    if (this.changeFunc)
      this.changeFunc();
  }

  getValue() {
    return this.sliderValue$.asObservable();
  }
}
