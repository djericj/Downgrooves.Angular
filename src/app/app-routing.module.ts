import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { MixesDetailComponent } from './components/mixes/detail/mixes.detail.component';
import { MixesComponent } from './components/mixes/mixes.component';
import { ModularComponent } from './components/modular/modular.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ReleaseDetailComponent } from './components/releases/detail/release.detail.component';
import { ReleasesComponent } from './components/releases/releases.component';
import { RemixesComponent } from './components/remixes/remixes.component';
import { ShopComponent } from './components/shop/shop.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'modular', component: ModularComponent },
  { path: 'mixes', component: MixesComponent },
  { path: 'mix/:name', component: MixesDetailComponent },
  { path: 'releases', component: ReleasesComponent },
  { path: 'release/:id/:name', component: ReleaseDetailComponent },
  { path: 'remixes', component: RemixesComponent },
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
