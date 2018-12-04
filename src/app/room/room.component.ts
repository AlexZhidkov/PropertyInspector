import { Component, OnInit } from '@angular/core';
import { Room } from '../model/room';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Issue } from '../model/issue';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService } from '../services/issue.service';
import { RoomService } from '../services/room.service';
import { ImagesLoadIndicatorService } from '../services/images-load-indicator.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  propertyId: string;
  roomId: string;
  roomDoc: AngularFirestoreDocument<Room>;
  room: Observable<Room>;
  issues: Observable<Issue[]>;
  isIssueListLoading: boolean;

  constructor(private afs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    public roomService: RoomService,
    private issueService: IssueService,
    private imagesLIS: ImagesLoadIndicatorService) { }

  ngOnInit() {
    this.isIssueListLoading = true;
    this.propertyId = this.route.snapshot.paramMap.get('propertyId');
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    // TODO: change the star rating update mechanism
    this.roomDoc = this.afs.doc<Room>('properties/' + this.propertyId + '/rooms/' + this.roomId);
    const roomsPath = 'properties/' + this.propertyId + '/rooms';
    this.roomService.setCollection(roomsPath);
    this.room = this.roomService.get(this.roomId);
    const issuesPath = '/properties/' + this.propertyId + '/rooms/' + this.roomId + '/issues';
    this.issueService.setCollection(issuesPath);
    this.issues = this.issueService.list();
    this.issues.subscribe(e => {
      this.isIssueListLoading = false;
    });
  }

  addNewIssue() {
    const newIssue: Issue = {
      name: '',
      description: '',
      notes: ''
    };
    this.issueService.add(newIssue).then(doc =>
      this.router.navigate(['issue/' + this.propertyId + '/' + this.roomId + '/' + doc.id]));
  }

  setRating(event) {
    const clickWidth = event.x;
    const starWidth = document.getElementById('emptyStar').clientWidth;
    const stars = Math.round(clickWidth / starWidth);
    if (stars <= 5) {
      this.roomDoc.update({ rating: stars });
    }
  }
}
