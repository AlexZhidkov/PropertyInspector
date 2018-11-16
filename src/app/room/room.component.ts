import { Component, OnInit } from '@angular/core';
import { Room } from '../model/room';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Issue } from '../model/issue';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  propertyId: String;
  roomId: String;
  roomDoc: AngularFirestoreDocument<Room>;
  room: Observable<Room>;
  private issuesCollection: AngularFirestoreCollection<Issue>;
  issues: Observable<Issue[]>;
  isLoading: boolean;

  constructor(private afs: AngularFirestore, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.propertyId = this.route.snapshot.paramMap.get('propertyId');
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    this.roomDoc = this.afs.doc<Room>('properties/' + this.propertyId + '/rooms/' + this.roomId);
    this.room = this.roomDoc.valueChanges();
    this.room.subscribe(e => {
      this.isLoading = false;
    });
    this.issuesCollection = this.afs.collection<Issue>('/properties/' + this.propertyId + '/rooms/' + this.roomId + '/issues');
    this.issues = this.issuesCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Issue;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  addNewIssue() {
    const newIssue: Issue = {
      name: '',
      description: '',
      notes: ''
    };
    this.issuesCollection.add(newIssue).then(doc =>
      this.router.navigate(['issue/' + this.propertyId + '/' + this.roomId + '/' + doc.id]));
  }

  setRating(event) {
    const clickWidth = event.x;
    const starWidth = document.getElementById('emptyStar').clientWidth;
    const stars = Math.round(clickWidth / starWidth);
    if ( stars <= 5) {
      this.roomDoc.update({rating: stars});
    }
  }
}
