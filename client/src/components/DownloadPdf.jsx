import React from 'react';
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';
import pdf from '../pdf.png';

const DownloadPdf = ({rooElementId, downloadFileName}) => {
    const downloadFileDocument = () => {
        const input = document.getElementById(rooElementId);
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF('p', 'pt', 'a1');
            pdf.addImage(imgData, "JPEG", 10, 50);
            pdf.save(`${downloadFileName}`);
        });
    };
    return ( <div className="pdfIcon"><img src={pdf} onClick={downloadFileDocument} /><h6>Download</h6></div> );
}
 
export default DownloadPdf;