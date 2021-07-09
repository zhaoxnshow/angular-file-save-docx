import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun,
  ExternalHyperlink,
  FootnoteReferenceRun,
  Header,
  Footer
} from 'docx';
import {SuperService} from './service/super.service';
import {Injectable} from '@angular/core';
import {styles as sss} from './cv-data';

const PHONE_NUMBER = '07534563401';
const PROFILE_URL = 'https://www.linkedin.com/in/dolan1';
const EMAIL = 'docx@docx.com';

@Injectable()
export class DocumentCreator {

  constructor(private superService: SuperService) {
  }

  // tslint:disable-next-line: typedef
  public create([experiences, educations, skills, achivements]): Document {
    const document = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new ExternalHyperlink(
                  {
                    child: new TextRun({
                      text: 'Address: 58 Elm Avenue, Kent ME4 6ER, UK',
                      style: 'Hyperlink',
                      break: 1
                    }),
                    link: 'https://www.baidu.com'
                  }
                ),
                new TextRun({
                  text: 'Dolan Miu'
                })]
            }),
            this.createContactInfo(PHONE_NUMBER, PROFILE_URL, EMAIL),
            this.createHeading('Education'),
            ...educations
              .map(education => {
                const arr: Paragraph[] = [];
                arr.push(
                  this.createInstitutionHeader(
                    education.schoolName,
                    `${education.startDate.year} - ${education.endDate.year}`
                  )
                );
                arr.push(
                  this.createRoleText(
                    `${education.fieldOfStudy} - ${education.degree}`
                  )
                );

                const bulletPoints = this.splitParagraphIntoBullets(
                  education.notes
                );
                bulletPoints.forEach(bulletPoint => {
                  arr.push(this.createBullet(bulletPoint));
                });

                return arr;
              })
              .reduce((prev, curr) => prev.concat(curr), []),
            this.createHeading('Experience'),
            ...experiences
              .map(position => {
                const arr: Paragraph[] = [];

                arr.push(
                  this.createInstitutionHeader(
                    position.company.name,
                    this.createPositionDateText(
                      position.startDate,
                      position.endDate,
                      position.isCurrent
                    )
                  )
                );
                arr.push(this.createRoleText(position.title));

                const bulletPoints = this.splitParagraphIntoBullets(
                  position.summary
                );

                bulletPoints.forEach(bulletPoint => {
                  arr.push(this.createBullet(bulletPoint));
                });

                return arr;
              })
              .reduce((prev, curr) => prev.concat(curr), []),
            this.createHeading('Skills, Achievements and Interests'),
            this.createSubHeading('Skills'),
            this.createSkillList(skills),
            this.createSubHeading('Achievements'),
            ...this.createAchivementsList(achivements),
            this.createSubHeading('Interests'),
            this.createInterests(
              'Programming, Technology, Music Production, Web Design, 3D Modelling, Dancing.'
            ),
            this.createHeading('References'),
            new Paragraph(
              'Dr. Dean Mohamedally Director of Postgraduate Studies Department of Computer Science, University College London Malet Place, Bloomsbury, London WC1E d.mohamedally@ucl.ac.uk'
            ),
            new Paragraph('More references upon request'),
            new Paragraph({
              text:
                'This CV was generated in real-time based on my Linked-In profile from my personal website www.dolan.bio.',
              alignment: AlignmentType.CENTER
            })
          ]
        }
      ]
    });

    return document;
  }

  public createOne(): Promise<Document> {
    return new Promise<Document>((resolve, reject) => {
      this.superService.get('http://127.0.0.1:3000/getStyle').then((res) => {
        // const styles = sss.style;
        const styles = res.style;
        console.log(res);
        const doc = new Document({
          externalStyles: styles,
          sections: [{
            headers: {
              default: new Header({ // The standard default header
                children: [
                  new Paragraph({
                    text: 'text1111111111111'
                  })
                ],
              }),
              first: new Header({ // The first header
                children: [
                  new Paragraph({
                    text: 'text2'
                  })
                ],
              }),
              even: new Header({ // The header on every other page
                children: [
                  new Paragraph({
                    text: 'text3'
                  })
                ],
              }),
            },
            footers: {
              default: new Footer({ // The standard default footer
                children: [
                  new Paragraph({
                    text: 'text1'
                  })
                ],
              }),
              first: new Footer({ // The first footer
                children: [
                  new Paragraph({
                    text: 'text2'
                  })
                ],
              }),
              even: new Footer({ // The footer on every other page
                children: [
                  new Paragraph({
                    text: 'text3'
                  })
                ],
              }),
            },
            children: [
              new Paragraph({
                text: `Mobile: 188888888 | LinkedIn: 0589569 | Email: z@123.com`,
                style: 'zxnStyle1',
                heading: HeadingLevel.HEADING_1,
                thematicBreak: true
              }),
              new Paragraph({
                children: [
                  new ExternalHyperlink(
                    {
                      child: new TextRun({
                        text: 'Address: 58 Elm Avenue, Kent ME4 6ER, UK',
                        style: 'Hyperlink',
                        break: 1
                      }),
                      link: 'https://www.baidu.com'
                    }
                  ),
                  new TextRun({
                    text: 'Address: 58 Elm Avenue, Kent ME4 6ER, UK',
                    break: 1
                  }),
                  new ExternalHyperlink({
                    child: new TextRun({
                      text: 'Footer external hyperlink',
                      style: 'Hyperlink',
                    }),
                    link: 'http://www.example.com',
                  })
                ]
              })
            ]
          }]
        });
        resolve(doc);
      });
    });
  }

  public createContactInfo(
    phoneNumber: string,
    profileUrl: string,
    email: string
  ): Paragraph {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun(
          `Mobile: ${phoneNumber} | LinkedIn: ${profileUrl} | Email: ${email}`
        ),
        new TextRun({
          text: 'Address: 58 Elm Avenue, Kent ME4 6ER, UK',
          break: 1
        })
      ]
    });
  }

  public createHeading(text: string): Paragraph {
    return new Paragraph({
      text,
      heading: HeadingLevel.HEADING_1,
      thematicBreak: true
    });
  }

  public createSubHeading(text: string): Paragraph {
    return new Paragraph({
      text,
      heading: HeadingLevel.HEADING_2
    });
  }

  public createInstitutionHeader(
    institutionName: string,
    dateText: string
  ): Paragraph {
    return new Paragraph({
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: TabStopPosition.MAX
        }
      ],
      children: [
        new TextRun({
          text: institutionName,
          bold: true
        }),
        new TextRun({
          text: `\t${dateText}`,
          bold: true
        })
      ]
    });
  }

  public createRoleText(roleText: string): Paragraph {
    return new Paragraph({
      children: [
        new TextRun({
          text: roleText,
          italics: true
        })
      ]
    });
  }

  public createBullet(text: string): Paragraph {
    return new Paragraph({
      text,
      bullet: {
        level: 0
      }
    });
  }

  // tslint:disable-next-line:no-any
  public createSkillList(skills: any[]): Paragraph {
    return new Paragraph({
      children: [new TextRun(skills.map(skill => skill.name).join(', ') + '.')]
    });
  }

  // tslint:disable-next-line:no-any
  public createAchivementsList(achivements: any[]): Paragraph[] {
    return achivements.map(
      achievement =>
        new Paragraph({
          text: achievement.name,
          bullet: {
            level: 0
          }
        })
    );
  }

  public createInterests(interests: string): Paragraph {
    return new Paragraph({
      children: [new TextRun(interests)]
    });
  }

  public splitParagraphIntoBullets(text: string): string[] {
    return text.split('\n\n');
  }

  // tslint:disable-next-line:no-any
  public createPositionDateText(
    startDate: any,
    endDate: any,
    isCurrent: boolean
  ): string {
    const startDateText =
      this.getMonthFromInt(startDate.month) + '. ' + startDate.year;
    const endDateText = isCurrent
      ? 'Present'
      : `${this.getMonthFromInt(endDate.month)}. ${endDate.year}`;

    return `${startDateText} - ${endDateText}`;
  }

  public getMonthFromInt(value: number): string {
    switch (value) {
      case 1:
        return 'Jan';
      case 2:
        return 'Feb';
      case 3:
        return 'Mar';
      case 4:
        return 'Apr';
      case 5:
        return 'May';
      case 6:
        return 'Jun';
      case 7:
        return 'Jul';
      case 8:
        return 'Aug';
      case 9:
        return 'Sept';
      case 10:
        return 'Oct';
      case 11:
        return 'Nov';
      case 12:
        return 'Dec';
      default:
        return 'N/A';
    }
  }
}
