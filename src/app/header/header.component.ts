import {EventEmitter, Output} from "@angular/core";
import {Component} from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent {

  //creates an event trigger
  @Output()
  featureSelected = new EventEmitter<string>();

  collapsed: boolean = true;
  onSelect(feature: string) {
    this.featureSelected.emit(feature)
  }
}
