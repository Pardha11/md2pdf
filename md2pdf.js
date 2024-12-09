
export class MarkdownParser {
    constructor() {
        this.rules = {

            h1: { pattern: /^# (.+)$/gm, replacement: '<h1>$1</h1>' },
            h2: { pattern: /^## (.+)$/gm, replacement: '<h2>$1</h2>' },
            h3: { pattern: /^### (.+)$/gm, replacement: '<h3>$1</h3>' },
            h4: { pattern: /^#### (.+)$/gm, replacement: '<h4>$1</h4>' },
            h5: { pattern: /^##### (.+)$/gm, replacement: '<h5>$1</h5>' },
            h6: { pattern: /^###### (.+)$/gm, replacement: '<h6>$1</h6>' },


            bold: { pattern: /\*\*(.+?)\*\*/g, replacement: '<strong>$1</strong>' },
            italic: { pattern: /\*(.+?)\*/g, replacement: '<em>$1</em>' },


            unorderedList: {
                pattern: /^\* (.+)$/gm,
                replacement: '<li>$1</li>',
                surroundPattern: /(<li>.*<\/li>)/s,
                surroundReplacement: '<ul>$1</ul>'
            },


            codeBlock: {
                pattern: /```([\s\S]*?)```/g,
                replacement: '<pre><code>$1</code></pre>'
            },
            inlineCode: { pattern: /`(.+?)`/g, replacement: '<code>$1</code>' },


            links: { pattern: /\[(.+?)\]\((.+?)\)/g, replacement: '<a href="$2">$1</a>' },


            paragraphs: {
                pattern: /^(?!<[a-z][A-z0-9]*|$)(.+)$/gm,
                replacement: '<p>$1</p>'
            }
        };
    }

    parse(markdown) {
        let html = markdown;

        // Apply each rule
        for (const rule of Object.values(this.rules)) {
            html = html.replace(rule.pattern, rule.replacement);

            //handles newline and that typeof stuff
            if (rule.surroundPattern && rule.surroundReplacement) {
                const matches = html.match(rule.surroundPattern);
                if (matches) {
                    html = html.replace(matches[0], rule.surroundReplacement);
                }
            }
        }

        return html;
    }
}

export class PDFGenerator {
    constructor() {
        this.htmlContent = '';
        this.filename = '';
    }

    createPDF(htmlContent, filename) {
        //
        const printArea = document.createElement('div');
        printArea.innerHTML = htmlContent;
        // formmatting f the document
        printArea.style.cssText = `
            position: fixed;
            left: 0;
            top: 0;
            width: 8.5in;
            padding: 0.5in;
            font-family: Arial, sans-serif;
            background: white;
            z-index: -1;
        `;

        //CSS
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @media print {
                body * { visibility: hidden; }
                #printArea, #printArea * { visibility: visible; }
                
            }
        `;

        // A
        printArea.id = 'printArea';
        document.body.appendChild(printArea);
        document.head.appendChild(styleSheet);

        // Show the Print popoup
        window.print();


        setTimeout(() => {
            document.body.removeChild(printArea);
            document.head.removeChild(styleSheet);
        }, 100);
    }
}


