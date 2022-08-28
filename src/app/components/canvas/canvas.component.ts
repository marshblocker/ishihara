import { Component, Input, OnInit } from '@angular/core';
import * as p5 from 'p5';
import { ConstantsService } from 'src/app/services/constants.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent implements OnInit {
  @Input() imagePath = '';

  constructor(
    private imageService: ImageService,
    private appConstants: ConstantsService
  ) {}

  ngOnInit(): void {
    const sketch = (s: p5) => {
      s.setup = () => {
        let canvas = s.createCanvas(
          this.appConstants.CANVAS_SIDE_LENGTH,
          this.appConstants.CANVAS_SIDE_LENGTH
        );
        canvas.parent('myCanvas');

        s.stroke('gray');
        s.rect(
          0,
          0,
          this.appConstants.CANVAS_SIDE_LENGTH,
          this.appConstants.CANVAS_SIDE_LENGTH
        );

        s.loadImage(this.imagePath, (img) => {
          this.imageService.preprocessImage(
            img,
            this.appConstants.IMAGE_SIDE_LENGTH,
            this.appConstants.IMAGE_SIDE_LENGTH,
            s
          );

          s.image(
            img,
            this.appConstants.IMAGE_TOP_LEFT,
            this.appConstants.IMAGE_TOP_LEFT
          );
        });
      };

      s.draw = () => {};
    };

    let canvas = new p5(sketch);
  }
}
