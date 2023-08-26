import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Mix } from 'src/app/models/mix';
import { MixesService } from 'src/app/services/mixes.service';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-mixes',
  templateUrl: './mixes.component.html',
  styleUrls: ['./mixes.component.scss'],
})
export class MixesComponent extends BaseComponent implements OnInit {
  public mixes: Mix[];
  public category: string = '';
  public loading: boolean = false;
  public properTitle: string = '';

  constructor(
    private _route: ActivatedRoute,
    private _mixesService: MixesService,
    private _titleService: Title
  ) {
    super(_titleService);
  }

  ngOnInit(): void {
    this.setTitle('DJ Sets');
    this._route.params.subscribe({
      next: () => {
        this._mixesService.getMixes().subscribe({
          next: (data) => (this.mixes = data),
        });
      },
    });
  }

  navigateTo = (args: any) => {
    return () => {
      return;
    };
  };

  play = (args: any) => {
    return () => {
      return;
    };
  };
}
