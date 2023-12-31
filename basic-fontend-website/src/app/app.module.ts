import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componnents/home/home.component';
import { BreadcrumbComponent } from './componnents/page-structure/breadcrumb/breadcrumb.component';
import { FooterComponent } from './componnents/page-structure/footer/footer.component';
import { HeaderComponent } from './componnents/page-structure/header/header.component';
import { ContentLayoutComponent } from './componnents/page-structure/content-layout/content-layout.component';
import { UsersComponent } from './componnents/users/users.component';
import { FeatherIconsComponent } from './componnents/page-structure/feather-icon/feather-icons/feather-icons.component';
import { LoginComponent } from './componnents/login/login.component';
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import {  HttpClientModule } from '@angular/common/http';
import { RightSidebarComponent } from './componnents/page-structure/right-sidebar/right-sidebar.component';
import { LeftSidebarComponent } from './componnents/page-structure/left-sidebar/left-sidebar.component';
import { ContentComponent } from './componnents/page-structure/content/content.component';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent,
    FeatherIconsComponent,
    BreadcrumbComponent,
    FooterComponent,
    HeaderComponent,
    ContentLayoutComponent,
    LoginComponent,
    RightSidebarComponent,
    LeftSidebarComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
   ReactiveFormsModule,
   ToastrModule.forRoot(),
   CommonModule  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
