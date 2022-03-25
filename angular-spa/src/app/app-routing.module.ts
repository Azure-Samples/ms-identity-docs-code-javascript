// Required for Angular
import { NgModule } from '@angular/core';

// Required for the Angular routing service
import { Routes, RouterModule } from '@angular/router';

// Required for the "Profile" page
import { ProfileComponent } from './profile/profile.component';

// Required for the "Home" page
import { HomeComponent } from './home/home.component';

// MsalGuard is required to protect routes and require authentication before accessing protected routes
import { MsalGuard } from '@azure/msal-angular';

// Define the possible routes
// Specify MsalGuard on routes to be protected
// '**' denotes a wild card
const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [
      MsalGuard
    ]
  },
  {
    path: '**',
    component: HomeComponent
  }
];

// Create an NgModule that contains all the directives for the routes specified above
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }