import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

/* services */
import { AudioService } from './services/audio.service';
import { ConfigService } from './services/config.service';
import { MixesService } from './services/mixes.service';
import { ReleaseService } from './services/release.service';
import { PlayerService } from './services/player.service';

/* component */
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReleasesComponent } from './releases/releases.component';
import { ModularComponent } from './modular/modular.component';
import { MixesComponent } from './mixes/mixes.component';
import { ShopComponent } from './shop/shop.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PlayerComponent } from './player/player.component';
import { MixesDetailComponent } from './mixes/detail/mixes.detail.component';
import { BaseComponent } from './base/base.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReleasesComponent,
    ModularComponent,
    MixesComponent,
    ShopComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    PlayerComponent,
    MixesDetailComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
