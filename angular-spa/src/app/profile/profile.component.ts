// Required for Angular
import { Component, OnInit } from '@angular/core';

// Required for the HTTP GET request to Graph
import { HttpClient } from '@angular/common/http';

type ProfileType = {
  businessPhones?: string,
  displayName?: string,
  givenName?: string,
  jobTitle?: string,
  mail?: string,
  mobilePhone?: string,
  officeLocation?: string,
  preferredLanguage?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  profile!: ProfileType;
  tokenExpiration!: string;

  constructor(
    private http: HttpClient
  ) { }

  // When the page loads, perform an HTTP GET request from the Graph /me endpoint
  ngOnInit() {
    this.http.get('https://graph.microsoft.com/v1.0/me')
      .subscribe(profile => {
        this.profile = profile;
      });

    this.tokenExpiration = localStorage.getItem('tokenExpiration')!;
  }
}
