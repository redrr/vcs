import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../_services/auth.service";
import {TokenStorageService} from "../../_services/token-storage.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  url: string;
  privs: string[] = []

  constructor(private router: Router, private authService: AuthService, private tokenService: TokenStorageService) {
    this.url = router.url;
  }

  ngOnInit(): void {
    this.authService.getAllPermission(this.tokenService.getToken() || '').subscribe(resp => {
      let json = JSON.parse(JSON.stringify(resp))
      this.privs = json
    })
  }

  isCurrentRoute(link: string): string {
    return this.url === "\/"+link ? 'active' : ''
  }

  canAccess(priv: string): boolean {
    return this.privs.indexOf(priv) > -1
  }
}
