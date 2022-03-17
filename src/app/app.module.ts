import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/* services */
import { AudioService } from './services/audio.service';
import { ConfigService } from './services/config.service';
import { MixesService } from './services/mixes.service';
import { ReleaseService } from './services/release.service';
import { PlayerService } from './services/player.service';

/* component */
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ReleasesComponent } from './components/releases/releases.component';
import { ReleaseDetailComponent } from './components/releases/detail/release.detail.component';
import { ModularComponent } from './components/modular/modular.component';
import { MixesComponent } from './components/mixes/mixes.component';
import { ShopComponent } from './components/shop/shop.component';
import { ContactComponent } from './components/contact/contact.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PlayerComponent } from './components/player/player.component';
import { MixesDetailComponent } from './components/mixes/detail/mixes.detail.component';

/* pipes */
import { EnlargeImagePipe } from './pipes/enlarge-image.pipe';
import { UrlFormatPipe } from './pipes/url-format.pipe';

/* interceptors */
import { AuthInterceptor } from './auth.interceptor';

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
    EnlargeImagePipe,
    UrlFormatPipe,
    ReleaseDetailComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return () => {
          return configService.loadAppConfig();
        };
      },
    },
    AudioService,
    ConfigService,
    MixesService,
    ReleaseService,
    PlayerService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
