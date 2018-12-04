import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() imagesLoaded = new EventEmitter<boolean>();
  isLoading: boolean;
  images: Observable<Image[]>;

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.isLoading = true;
    const path = 'media/' + this.id + '/images/';
    this.imageService.setCollection(path);
    this.images = this.imageService.list();
    this.images.subscribe(e => {
      this.isLoading = false;
      this.imagesLoaded.emit(this.isLoading);
    });
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
