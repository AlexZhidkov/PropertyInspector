import { Injectable } from '@angular/core';
import { BaseService } from './BaseService';
import { AngularFirestore } from '@angular/fire/firestore';
import { Issue } from '../model/issue';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class IssueService extends BaseService<Issue> {
  firestorePath: string;
  constructor(afs: AngularFirestore, route: ActivatedRoute) {
    super(afs);
  }

  assignCollection(path: string) {
    this.firestorePath = path;
    this.setCollection(this.firestorePath);
  }
}
