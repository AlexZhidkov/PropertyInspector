import { Injectable } from '@angular/core';

@Injectable()
export class ImagesLoadIndicatorService {
  isImageListLoading: boolean;

  constructor() {
    this.isImageListLoading = true;
  }

  onImagesLoaded(status: boolean) {
    this.isImageListLoading = status;
  }
}
