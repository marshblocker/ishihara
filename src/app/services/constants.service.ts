import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  CANVAS_SIDE_LENGTH = 800;
  CIRCULAR_WALL_RADIUS = 700;

  IMAGE_SIDE_LENGTH = 600;
  IMAGE_TOP_LEFT = (this.CANVAS_SIDE_LENGTH - this.IMAGE_SIDE_LENGTH) / 2;

  constructor() { }
}
