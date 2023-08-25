import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { MixesDetailComponent } from './components/mixes/detail/mixes.detail.component';
import { MixesComponent } from './components/mixes/mixes.component';
import { ModularComponent } from './components/modular/modular.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OtherMusicDetailComponent } from './components/other-music/detail/other-music.detail.component';
import { OtherMusicComponent } from './components/other-music/other-music.component';
import { ReleaseDetailComponent } from './components/releases/detail/release.detail.component';
import { ReleasesComponent } from './components/releases/releases.component';
import { ShopComponent } from './components/shop/shop.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'modular', component: ModularComponent },
  { path: 'mixes', component: MixesComponent },
  { path: 'mix/:mixId/:name', component: MixesDetailComponent },
  {
    path: 'releases',
    component: ReleasesComponent,
    data: { kind: 'original' },
  },
  { path: 'remixes', component: ReleasesComponent, data: { kind: 'remix' } },
  {
    path: 'release/:collectionId/:name',
    component: ReleaseDetailComponent,
    data: { kind: 'original' },
  },
  {
    path: 'remix/:collectionId/:name',
    component: ReleaseDetailComponent,
    data: { kind: 'remix' },
  },
  { path: 'other-music', component: OtherMusicComponent },
  {
    path: 'other-music/:collectionId/:name',
    component: OtherMusicDetailComponent,
  },
  { path: 'shop', component: ShopComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'not-found', component: NotFoundComponent },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      useHash: true,
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
