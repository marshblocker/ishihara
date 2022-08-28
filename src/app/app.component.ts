import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ishihara';
  imagePath = '';

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.imageService.imagePath$.subscribe((imagePath: string) => {
      this.imagePath = '';
      setTimeout(() => {
        this.imagePath = imagePath;
      }, 1000);
    });
  }
}
