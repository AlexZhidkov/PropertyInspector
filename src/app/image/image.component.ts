import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Image } from '../model/image';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-images',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  @Input() id: string;
  isLoading: boolean;
  private imagesCollection: AngularFirestoreCollection<Image>;
  images: Observable<Image[]>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.isLoading = true;
    this.imagesCollection = this.afs.collection<Image>('media/' + this.id + '/images/');
    this.images = this.imagesCollection.valueChanges();
  }

  addNewImage(newImageUrl: string) {
    console.log(newImageUrl);
  }
}
