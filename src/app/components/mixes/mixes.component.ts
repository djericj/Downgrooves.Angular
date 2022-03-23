import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mix } from 'src/app/models/mix';
import { MixesService } from 'src/app/services/mixes.service';
import { BaseComponent } from 'src/app/shared/base/base.component';

@Component({
  selector: 'app-mixes',
  templateUrl: './mixes.component.html',
  styleUrls: ['./mixes.component.scss'],
})
export class MixesComponent extends BaseComponent implements OnInit {
  public mixes: Observable<Mix[]>;
  public mixes2: Observable<Mix[]>;
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
    this._route.params.subscribe(() => {
      this.mixes = this.getMixes('vocal');
      this.mixes2 = this.getMixes('classics');
    });
  }

  getMixes(category: string): Observable<Mix[]> {
    return this._mixesService.getMixes().pipe(
      map(
        // the first argument is a function which runs on success
        (data) => {
          this.setTitle('DJ Mixes | Downgrooves Electronic Music');
          data.sort((l, r): number => {
            if (l.createDate > r.createDate) {
              return -1;
            }
            if (l.createDate < r.createDate) {
              return 1;
            }
            return 0;
          });
          if (category) {
            data = data.filter((x) => {
              return x.category.toUpperCase() == category.toUpperCase();
            });
            this.setTitle(
              category.charAt(0).toUpperCase() + category.slice(1) + ' DJ Mixes'
            );
          }
          return data;
        }
      )
    );
  }
}
