import { enableProdMode, importProvidersFrom, inject, provideAppInitializer } from '@angular/core';
import { environment } from './environments/environment';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './app/auth.interceptor';
import { ConfigService } from './app/services/config.service';
import { Title, BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { ArtistService } from './app/services/artist.service';
import { MixesService } from './app/services/mixes.service';
import { NavigationService } from './app/services/navigation.service';
import { PlayerService } from './app/services/player.service';
import { ReleaseService } from './app/services/release.service';
import { VideoService } from './app/services/video.service';
import { UrlFormatPipe } from './app/pipes/url-format.pipe';
import { AppRoutingModule } from './app/app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxMasonryModule } from 'ngx-masonry';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(AppRoutingModule, BrowserModule, NgxMasonryModule, RouterModule),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        provideAppInitializer(() => {
            const initializerFn = ((configService: ConfigService) => {
                return () => {
                    return configService.loadAppConfig();
                };
            })(inject(ConfigService));
            return initializerFn();
        }),
        Title,
        ArtistService,
        ConfigService,
        MixesService,
        NavigationService,
        PlayerService,
        ReleaseService,
        VideoService,
        UrlFormatPipe,
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations()
    ]
})
    .catch(err => console.error(err));
