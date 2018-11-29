import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Image } from '../model/image';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    this.images = this.imagesCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Image;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  addNewImage(newImageUrl: string) {
    const newImage: Image = {
      url: newImageUrl
    };
    this.imagesCollection.add(newImage);
  }

  deleteImage(imageId: string) {
    this.afs.doc<Image>('media/' + this.id + '/images/' + imageId).delete();
  }
}
