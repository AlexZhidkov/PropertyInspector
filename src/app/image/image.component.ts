import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Image } from '../model/image';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  propertyId: String;
  roomId: String;
  issueId: String;
  imageId: String;
  imageDoc: AngularFirestoreDocument<Image>;
  image: Observable<Image>;
  isLoading: boolean;

  constructor(private afs: AngularFirestore, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.propertyId = this.route.snapshot.paramMap.get('propertyId');
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    this.issueId = this.route.snapshot.paramMap.get('issueId');
    const imageId = this.route.snapshot.paramMap.get('imageId');
    this.imageDoc = this.afs.doc<Image>('media/Lbee16sJLsY3m3a0ym7k/images/' + imageId);
    this.image = this.imageDoc.valueChanges();
    this.image.subscribe(e => {
      this.isLoading = false;
    });
  }
}
