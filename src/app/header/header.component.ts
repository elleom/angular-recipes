import {Component, OnDestroy, OnInit} from "@angular/core";
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {User} from "../auth/user.model";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  collapsed: boolean = true;
  isAuthenticated = false;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    return this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((userData: User) => {
      this.isAuthenticated = !!userData;
    })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }
}
