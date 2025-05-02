import React from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { FaFilePdf } from "react-icons/fa"; // Import FaFilePdf for PDF icon

const GuideSummaryPDF = ({ guides }) => {
  const generatePDF = () => {
    try {
      console.log("Generating PDF...");
      console.log("Guides data:", guides);

      const doc = new jsPDF();

      // Add title
      doc.setFontSize(18);
      doc.text("Tour Guides Summary", 14, 20);

      // Add total guides
      doc.setFontSize(12);
      doc.text(`Total Guides: ${guides.length}`, 14, 30);

      // Define table columns
      const tableColumn = [
        "Guide ID",
        "Guide Name",
        "Languages",
        "Contact No",
        "Experience",
        "Charges/Tour",
      ];

      // Map guides data to table rows
      const tableRows = guides.map((guide) => [
        guide.tourGuideID || "N/A",
        guide.name || "N/A",
        guide.language ? guide.language.join(", ") : "N/A",
        guide.Contact || "N/A",
        guide.experience || "N/A",
        guide.charges || "N/A",
      ]);

      // Use autoTable to create a table in the PDF
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 40,
        theme: "striped", // Adds striped rows for a cleaner look
        headStyles: { fillColor: [22, 160, 133] }, // Customize header background color
      });

      // Save the PDF
      doc.save("tour-guides-summary.pdf");

      // Alert to notify the user that PDF is generated
      alert("PDF generated successfully!");

      console.log("PDF generated and saved successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please check the console for details.");
    }
  };

  return (
    <button
      onClick={generatePDF}
      className="bg-green-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
    >
      <FaFilePdf /> Generate PDF Summary
    </button>
  );
};

export default GuideSummaryPDF;
