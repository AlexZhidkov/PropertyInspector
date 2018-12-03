import { Component, OnInit } from '@angular/core';
import { Issue } from '../model/issue';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IssueService } from '../services/issue.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {

  propertyId: string;
  roomId: string;
  issueId: string;
  issueDoc: AngularFirestoreDocument<Issue>;
  issue: Observable<Issue>;
  isLoading: boolean;

  constructor(private route: ActivatedRoute, public issueService: IssueService) { }

  ngOnInit() {
    this.isLoading = true;
    this.propertyId = this.route.snapshot.paramMap.get('propertyId');
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    this.issueId = this.route.snapshot.paramMap.get('issueId');
    const issuesPath = 'properties/' + this.propertyId + '/rooms/' + this.roomId + '/issues';
    this.issueService.setCollection(issuesPath);
    this.issue = this.issueService.get(this.issueId);
    this.issue.subscribe(e => {
      this.isLoading = false;
    });
  }
}

