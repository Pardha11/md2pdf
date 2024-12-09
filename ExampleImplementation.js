import {MarkdownParser, PDFGenerator} from './md2pdf.js'; //import

const markdown = `
# Sample Document
## Introduction
This is a **sample** markdown document with *italic* text.

### Code Example
\`\`\`
function hello() {
    console.log('Hello World');
}
\`\`\`

Here's a list:
* First item
* Second item
* Third item

You can add [links](https://google.com).
`;

const parser = new MarkdownParser();
const pdfGenerator = new PDFGenerator();

const htmlContent = parser.parse(markdown); //use this to convert the markdown to html

pdfGenerator.createPDF(htmlContent, 'ConvertedPDF.pdf'); //us