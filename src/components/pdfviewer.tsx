import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

interface PdfViewerProps {
  pdfUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => (
  <div className="w-full h-500px">
    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${process.env.PDFJS_VERSION}/build/pdf.worker.min.js`}>
      <Viewer fileUrl={pdfUrl} />
    </Worker>
  </div>
);

export default PdfViewer;
