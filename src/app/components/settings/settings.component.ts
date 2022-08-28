import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  imageUploaded = false;
  imageFile: File | null = null;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {}

  onUploadImage(event: Event) {
    let files = (event.target as HTMLInputElement).files;
    if (files === null) {
      this.imageUploaded = false;
      return;
    }

    this.imageFile = files[0];
    this.imageUploaded = true;
  }

  runProgram() {
    if (this.imageFile === null) {
      console.log('No image provided.');
      return;
    }

    this.imageService.getNewImage(
      this.imageFile,

      (imagePath: string) => {
        console.log('Finished getting new image!');
      },

      (err: string) => {
        console.log('Error: ', err);
      }
    );
  }
}
