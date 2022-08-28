import { Injectable } from '@angular/core';
import * as p5 from 'p5';
import { Subject } from 'rxjs';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  imagePath$ = new Subject<string>();

  constructor(private appConstants: ConstantsService) {}

  getNewImage(
    imageFile: File,
    callback: (imagePath: string) => void,
    errorHandler: (err: string) => void
  ): void {
    const reader = new FileReader();

    reader.addEventListener('load', (ev) => {
      const reader = ev.target!;
      const imagePath = reader.result as string;
      this.imagePath$.next(imagePath);
      callback(imagePath);
    });

    reader.addEventListener('error', (ev) => {
      const reader = ev.target!;
      const error = reader.error as DOMException;
      errorHandler(error.message);
    });

    reader.readAsDataURL(imageFile);
  }

  preprocessImage(img: p5.Image, width: number, height: number, s: p5): void {
    img.resize(width, height);
    s.image(
      img,
      this.appConstants.IMAGE_TOP_LEFT,
      this.appConstants.IMAGE_TOP_LEFT
    );
    this._convertImageToBW(img);
  }

  _convertImageToBW(img: p5.Image): void {
    img.loadPixels();

    for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {
        let px = img.get(x, y);
        let r = px[0];
        let g = px[1];
        let b = px[2];

        if (r + g + b === 255 * 3 || r + g + b === 0) {
          continue;
        }

        if (r + g + b < 127 * 3) {
          img.set(x, y, 0);
        } else {
          img.set(x, y, 255);
        }
      }
    }

    img.updatePixels();
  }
}
