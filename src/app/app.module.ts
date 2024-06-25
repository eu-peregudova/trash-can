import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterLink, RouterModule } from '@angular/router';
import { NavigationComponent } from './common/components/navigation/navigation.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, RouterModule, NavigationComponent],
  providers: [RouterLink],
  bootstrap: [AppComponent],
})
export class AppModule {}
