/* modules */
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxMasonryModule } from 'ngx-masonry';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

/* services */
import { ArtistService } from './services/artist.service';
import { ConfigService } from './services/config.service';
import { MixesService } from './services/mixes.service';
import { ReleaseService } from './services/release.service';
import { PlayerService } from './services/player.service';
import { VideoService } from './services/video.service';
import { NavigationService } from './services/navigation.service';

/* components */
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ReleasesComponent } from './components/releases/releases.component';
import { ReleaseDetailComponent } from './components/releases/detail/release.detail.component';
import { ReleaseDetailControlComponent } from './components/shared/release-detail/release.detail.component';
import { ModularComponent } from './components/modular/modular.component';
import { MixesComponent } from './components/mixes/mixes.component';
import { ShopComponent } from './components/shop/shop.component';
import { ContactComponent } from './components/contact/contact.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { PlayerComponent } from './components/player/player.component';
import { MixesDetailComponent } from './components/mixes/detail/mixes.detail.component';
import { MixListComponent } from './components/shared/mix-list/mix.list.component';
import { RemixesComponent } from './components/remixes/remixes.component';
import { RemixDetailComponent } from './components/remixes/detail/remix.detail.component';
import { ReleaseListComponent } from './components/shared/release-list/release.list.component';
import { OtherMusicComponent } from './components/other-music/other-music.component';
import { OtherMusicDetailComponent } from './components/other-music/detail/other-music.detail.component';

/* pipes */
import { EnlargeImagePipe } from './pipes/enlarge-image.pipe';
import { UrlFormatPipe } from './pipes/url-format.pipe';
import { FormatTrackTimePipe } from './pipes/format-time.pipe';
import { FormatReleaseDatePipe } from './pipes/format-release-date.pipe';
import { OrderByPipe } from './pipes/orderby.pipe';

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
    PlayerComponent,
    MixesDetailComponent,
    ReleaseDetailComponent,
    MixListComponent,
    EnlargeImagePipe,
    UrlFormatPipe,
    FormatTrackTimePipe,
    FormatReleaseDatePipe,
    OrderByPipe,
    RemixesComponent,
    ReleaseListComponent,
    OtherMusicComponent,
    RemixDetailComponent,
    OtherMusicDetailComponent,
    ReleaseDetailControlComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxMasonryModule,
    NgxSliderModule,
  ],
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
    Title,
    ArtistService,
    ConfigService,
    MixesService,
    ReleaseService,
    PlayerService,
    VideoService,
    NavigationService,
    UrlFormatPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
