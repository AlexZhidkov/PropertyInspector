import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Property } from '../model/property';
import { Room } from '../model/room';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  propertyId: string;
  propertyDoc: AngularFirestoreDocument<Property>;
  property: Observable<Property>;
  private roomsCollection: AngularFirestoreCollection<Room>;
  rooms: Observable<Room[]>;
  isLoading: boolean;

  constructor(private afs: AngularFirestore, private route: ActivatedRoute, private router: Router,
     private roomService: RoomService) { }

  ngOnInit() {
    this.isLoading = true;
    this.propertyId = this.route.snapshot.paramMap.get('id');
    this.propertyDoc = this.afs.doc<Property>('properties/' + this.propertyId);
    this.property = this.propertyDoc.valueChanges();
    this.property.subscribe(e => {
      this.isLoading = false;
    });
    const path = 'properties/' + this.propertyId + '/rooms';
    this.roomService.assignCollection(path);
    this.rooms = this.roomService.list();
  }

  addNewRoom() {
    const newRoom: Room = {
      name: '',
      notes: '',
      rating: 0
    };
    this.roomService.add(newRoom).then(room =>
      this.router.navigate(['room/' + this.propertyId + '/' + room.id]));
  }
}
