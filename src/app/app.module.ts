import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatProgressBarModule,
  MAT_DATE_LOCALE
} from '@angular/material';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth.service';
import { MessagingService } from './services/messaging.service';
import { PropertiesComponent } from './properties/properties.component';
import { PropertyComponent } from './property/property.component';
import { RoomComponent } from './room/room.component';
import { IssueComponent } from './issue/issue.component';
import { ImageComponent } from './image/image.component';
import { SidenavProfileComponent } from './sidenav-profile/sidenav-profile.component';
import { RoomService } from './services/room.service';
import { PropertyService } from './services/property.service';
import { IssueService } from './services/issue.service';
import { ImageService } from './services/image.service';
import { ImagesLoadIndicatorService } from './services/images-load-indicator.service';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'properties', component: PropertiesComponent, canActivate: [AuthService] },
  { path: 'property/:id', component: PropertyComponent, canActivate: [AuthService] },
  { path: 'room/:propertyId/:roomId', component: RoomComponent, canActivate: [AuthService] },
  { path: 'issue/:propertyId/:roomId/:issueId', component: IssueComponent, canActivate: [AuthService] },
  { path: 'image/:propertyId/:roomId/:issueId/:imageId', component: ImageComponent, canActivate: [AuthService] },
  { path: '**', component: HomeComponent, canActivate: [AuthService] }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PropertiesComponent,
    PropertyComponent,
    RoomComponent,
    IssueComponent,
    ImageComponent,
    SidenavProfileComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireMessagingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatProgressBarModule
  ],
  providers: [
    AuthService,
    RoomService,
    PropertyService,
    IssueService,
    ImageService,
    ImagesLoadIndicatorService,
    MessagingService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
