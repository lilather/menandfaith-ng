import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class PdfUtilService {
  generatePdf(formData: Record<string, any>, formName: string): void {
    const docDefinition: TDocumentDefinitions = {
      content: [
        {
          text: 'Form Responses',
          style: 'header',
        },
        {
          table: {
            widths: ['*', '*'],
            body: [
              ['Field', 'Value'],
              ...Object.entries(formData).map(([key, value]) => [
                key,
                value !== null && value !== undefined ? value.toString() : 'N/A',
              ]),
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
      },
    };

    pdfMake.createPdf(docDefinition).download(formName || 'form-responses.pdf');
  }
}
