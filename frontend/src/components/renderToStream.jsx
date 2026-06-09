import express from 'express';
import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import MyPDFDocument from './PDFTemplate.jsx';

const app = express();

app.get('/download-pdf', async (req, res) => {
  try {
    const dummyData = { title: "Account Statement", name: "Tina" };

    // Set headers so the browser knows it's a PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=generated.pdf');

    // Render the JSX component to a stream and pipe it to the response
    const stream = await ReactPDF.renderToStream(<MyPDFDocument data={dummyData} />);
    stream.pipe(res);

  } catch (error) {
    console.error("PDF Generation Error:", error);
    res.status(500).send("Could not generate PDF");
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));