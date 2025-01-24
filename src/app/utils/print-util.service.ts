import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PrintUtilService {
  generatePrintableContent(formData: any): string {
    // Create a basic HTML template for printing
    let content = `<h1>Form Responses</h1><ul>`;
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        content += `<li><strong>${key}:</strong> ${formData[key]}</li>`;
      }
    }
    content += `</ul>`;
    return content;
  }

  printContent(content: string): void {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Preview</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; }
              h1 { color: #333; }
            </style>
          </head>
          <body>${content}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  }
}
