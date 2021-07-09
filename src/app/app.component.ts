import {Component} from '@angular/core';
import {Packer} from 'docx';
import {saveAs} from 'file-saver';
// import * as fs from 'fs';

import {experiences, education, skills, achievements} from './cv-data';
import {DocumentCreator} from './cv-generator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name = 'Angular';


  constructor(private documentCreator: DocumentCreator) {
  }

  public download(): void {
    const doc = this.documentCreator.create([
      experiences,
      education,
      skills,
      achievements
    ]);

    this.documentCreator.createOne().then((doc1) => {
      Packer.toBlob(doc1).then(blob => {
        console.log(blob);
        saveAs(blob, 'example.docx');
        console.log('Document created successfully');
      });
    });
    // Packer.toBuffer(doc1).then((buffer) => {
    //   fs.writeFileSync("My Document.docx", buffer);
    // });
  }
}
