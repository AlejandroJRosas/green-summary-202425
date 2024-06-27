import { Injectable } from '@nestjs/common'
import { Document, Packer, Paragraph, TextRun } from 'docx'
// import { saveAs } from 'file-saver';
import * as fs from 'fs'

@Injectable()
export class WordService {
  findAll() {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun('Hello World'),
                new TextRun({
                  text: 'Foo Bar',
                  bold: true
                }),
                new TextRun({
                  text: '\tGithub is the best',
                  bold: true
                })
              ]
            })
          ]
        }
      ]
    })

    Packer.toBuffer(doc).then((buffer) => {
      fs.writeFileSync('My Document.docx', buffer)
    })

    return
  }
}
