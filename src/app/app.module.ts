/* modules */
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { ModularComponent } from './components/modular/modular.component';
import { MixesComponent } from './components/mixes/mixes.component';
import { ShopComponent } from './components/shop/shop.component';
import { ContactComponent } from './components/contact/contact.component';
import { HeaderComponent } from './widgets/header/header.component';
import { PlayerComponent } from './components/player/player.component';
import { OtherMusicComponent } from './components/other-music/other-music.component';
import { AboutComponent } from './components/about/about.component';
import {
  HeaderDefinitionTileComponent,
  HeaderTileComponent,
  ImageTileComponent,
  TextTileComponent,
  TileComponent,
} from './widgets/tile/tile.component';
import { ReleaseComponent } from './components/release/release.component';
import { MixComponent } from './components/mix/mix.component';
import { TracklistComponent } from './widgets/tracklist/tracklist.component';
import { ButtonComponent } from './widgets/button/button.component';
import { KeyValueComponent } from './widgets/key-value/key-value.component';

/* pipes */
import { EnlargeImagePipe } from './pipes/enlarge-image.pipe';
import { UrlFormatPipe } from './pipes/url-format.pipe';
import { FormatTrackTimePipe } from './pipes/format-time.pipe';
import { FormatReleaseDatePipe } from './pipes/format-release-date.pipe';
import { OrderByPipe } from './pipes/orderby.pipe';

/* interceptors */
import { AuthInterceptor } from './auth.interceptor';
import { LinkButtonComponent } from './widgets/link-button/link-button.component';

@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    ButtonComponent,
    ContactComponent,
    HeaderComponent,
    HeaderTileComponent,
    HeaderDefinitionTileComponent,
    HomeComponent,
    ImageTileComponent,
    KeyValueComponent,
    MixComponent,
    MixesComponent,
    ModularComponent,
    OtherMusicComponent,
    PlayerComponent,
    ReleaseComponent,
    ReleasesComponent,
    ShopComponent,
    TextTileComponent,
    TileComponent,
    TracklistComponent,
    EnlargeImagePipe,
    FormatReleaseDatePipe,
    FormatTrackTimePipe,
    OrderByPipe,
    UrlFormatPipe,
    LinkButtonComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxMasonryModule,
    NgxSliderModule,
    RouterModule,
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
    NavigationService,
    PlayerService,
    ReleaseService,
    VideoService,
    UrlFormatPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
