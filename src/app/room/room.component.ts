import { Component, OnInit } from '@angular/core';
import { Room } from '../model/room';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  roomDoc: AngularFirestoreDocument<Room>;
  room: Observable<Room>;
  private roomsCollection: AngularFirestoreCollection<Room>;
  isLoading: boolean;


  constructor(private afs: AngularFirestore, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.isLoading = true;
    const id = this.route.snapshot.paramMap.get('id');
    this.roomDoc = this.afs.doc<Room>('properties/cNwLRyZXadjFGzvPpne9/rooms/' + id);
    this.room = this.roomDoc.valueChanges();
    this.room.subscribe(e => {
      this.isLoading = false;
    });
  }

  addNewIssue() {
  }
}
