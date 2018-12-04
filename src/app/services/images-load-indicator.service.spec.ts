import { TestBed } from '@angular/core/testing';

import { ImagesLoadIndicatorService } from './images-load-indicator.service';

describe('ImagesLoadIndicatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImagesLoadIndicatorService = TestBed.get(ImagesLoadIndicatorService);
    expect(service).toBeTruthy();
  });
});
