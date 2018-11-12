import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Property } from '../model/property';
import { Room } from '../model/room';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  propertyDoc: AngularFirestoreDocument<Property>;
  property: Observable<Property>;
  private roomsCollection: AngularFirestoreCollection<Room>;
  rooms: Observable<Room[]>;
  isLoading: boolean;

  constructor(private afs: AngularFirestore, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    const id = this.route.snapshot.paramMap.get('id');
    this.propertyDoc = this.afs.doc<Property>('properties/' + id);
    this.property = this.propertyDoc.valueChanges();
    this.property.subscribe(e => {
      this.isLoading = false;
    });
    this.roomsCollection = this.afs.collection<Room>('properties/' + id + '/rooms');
    this.rooms = this.roomsCollection.valueChanges();
  }

  addNewRoom() {
    const newRoom: Room = {
      name: ''
    };
    this.roomsCollection.add(newRoom).then(doc =>
      this.router.navigate(['room/' + doc.id]));
  }
}
