import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { Property } from '../model/property';
import { Router } from '@angular/router';
import { PropertyService } from '../services/property.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  private collection: AngularFirestoreCollection<Property>;
  properties: Observable<Property[]>;
  isLoading: boolean;

  constructor(private afs: AngularFirestore, private authService: AuthService, private router: Router,
     private propertyService: PropertyService) { }

  ngOnInit() {
    this.isLoading = true;
    const path = 'properties';
    this.propertyService.setCollection(path);
    this.properties = this.propertyService.list();
    this.properties.subscribe(e => {
      this.isLoading = false;
    });
  }

  addNewProperty() {
    const newProperty: Property = {
      name: ''
    };
    this.authService.currentUser.subscribe(user => {
      this.propertyService.add(newProperty).then(doc =>
        this.router.navigate(['property/' + doc.id]));
    });
  }
}
