import { Component, OnInit } from '@angular/core';
import { Issue } from '../model/issue';
import { AngularFirestoreDocument, AngularFirestore} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {

  propertyId: String;
  roomId: String;
  issueId: String;
  issueDoc: AngularFirestoreDocument<Issue>;
  issue: Observable<Issue>;
  isLoading: boolean;

  constructor(private afs: AngularFirestore, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.propertyId = this.route.snapshot.paramMap.get('propertyId');
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    this.issueId = this.route.snapshot.paramMap.get('issueId');
    this.issueDoc = this.afs.doc<Issue>('properties/' + this.propertyId + '/rooms/' + this.roomId + '/issues/' + this.issueId);
    this.issue = this.issueDoc.valueChanges();
    this.issue.subscribe(e => {
      this.isLoading = false;
    });
  }
}

