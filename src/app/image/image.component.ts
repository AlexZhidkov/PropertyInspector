import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Image } from '../model/image';
import { Observable } from 'rxjs';
import { ImageService } from '../services/image.service';

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

  constructor(private afs: AngularFirestore, private imageService: ImageService) { }

  ngOnInit() {
    this.isLoading = true;
    const path = 'media/' + this.id + '/images/';
    this.imageService.setCollection(path);
    this.images = this.imageService.list();
  }

  addNewImage(newImageUrl: string) {
    const newImage: Image = {
      url: newImageUrl
    };
    this.imageService.add(newImage);
  }

  deleteImage(imageId: string) {
    this.imageService.delete(imageId);
  }
}
