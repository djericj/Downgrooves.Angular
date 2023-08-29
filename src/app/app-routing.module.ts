import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { MixesComponent } from './components/mixes/mixes.component';
import { ModularComponent } from './components/modular/modular.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OtherMusicComponent } from './components/other-music/other-music.component';
import { ReleasesComponent } from './components/releases/releases.component';
import { ShopComponent } from './components/shop/shop.component';
import { ReleaseComponent } from './components/release/release.component';
import { MixComponent } from './components/mix/mix.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'modular', component: ModularComponent },
  { path: 'mixes', component: MixesComponent },
  { path: 'mix/:mixId/:name', component: MixComponent },
  {
    path: 'releases',
    component: ReleasesComponent,
    data: { kind: 'original' },
  },
  { path: 'remixes', component: ReleasesComponent, data: { kind: 'remix' } },
  {
    path: 'release/:collectionId/:name',
    component: ReleaseComponent,
    data: { kind: 'original' },
  },
  {
    path: 'remix/:collectionId/:name',
    component: ReleaseComponent,
    data: { kind: 'remix' },
  },
  {
    path: 'other-music',
    component: OtherMusicComponent,
    data: { kind: 'other' },
  },
  {
    path: 'other-music/:collectionId/:name',
    component: ReleaseComponent,
    data: { kind: 'other' },
  },
  { path: 'shop', component: ShopComponent },
  { path: 'contact', component: ContactComponent },
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
