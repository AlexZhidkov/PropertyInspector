import { Component, OnInit } from '@angular/core';
import { Issue } from '../model/issue';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from '../model/image';

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
  private imagesCollection: AngularFirestoreCollection<Image>;
  images: Observable<Image[]>;
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
    this.imagesCollection = this.afs.collection<Image>('/media/Lbee16sJLsY3m3a0ym7k/images',
        ref => ref.where('issueId', '==', this.issueId));
    this.images = this.imagesCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Image;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  addNewImage() {
    const newImage: Image = {
      url: '',
      issueId: this.issueId
    };
    this.imagesCollection.add(newImage).then(doc =>
      this.router.navigate(['image/' + this.propertyId + '/' + this.roomId + '/' + this.issueId + '/' + doc.id]));
  }
}

