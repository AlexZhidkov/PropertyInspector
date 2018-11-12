import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';
import { Property } from '../model/property';
import { Router } from '@angular/router';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {

  private collection: AngularFirestoreCollection<Property>;
  properties: Observable<Property[]>;

  constructor(private afs: AngularFirestore, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.collection = this.afs.collection<Property>('properties');
    this.properties = this.collection.snapshotChanges().pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Property;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  addNewProperty() {
    const newProperty: Property = {
      name: ''
    };
    this.authService.currentUser.subscribe(user => {
      this.collection.add(newProperty).then(doc =>
        this.router.navigate(['property/' + doc.id]));
    });
  }
}
