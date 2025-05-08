import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import hotel23 from '../../../assets/Hotel23.png';
import { GoogleGenAI } from "@google/genai";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

const TourPackageQuotation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [groupQuantity, setGroupQuantity] = useState('');
  const [medicalNeeds, setMedicalNeeds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [quotationSummary, setQuotationSummary] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const pdfRef = useRef(null);
  const [showQuotationsList, setShowQuotationsList] = useState(false);
  const [quotations, setQuotations] = useState([]);
  const [medicalConsideration, setMedicalConsideration] = useState([]);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [showQuotationDetails, setShowQuotationDetails] = useState(false);

  // State variables to store data from API
  const [tours, setTours] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [guides, setGuides] = useState([]);
  const ai = new GoogleGenAI({ apiKey: "AIzaSyBF4_qIzyUfs9tAHDICnm3Wxt_z1dGvTEQ" });

  // State variables to track selected options
  const [selectedTour, setSelectedTour] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedHotel, setSelectedHotel] = useState('');
  const [selectedGuide, setSelectedGuide] = useState('');
  const [roomDescription, setRoomDescription] = useState('');

  // State to control which section is visible
  const [showMedicalSection, setShowMedicalSection] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleMedicalChange = (e) => {
    const { value, checked } = e.target;
    setMedicalNeeds(prevState => checked ? [...prevState, value] : prevState.filter(item => item !== value));
  };

  useEffect(() => {
    loadSelect();
    fetchQuotations();
    fetchMedicalConsideration();
  }, []);

  const fetchQuotations = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/quotation");
      setQuotations(response.data.quotations || []);
      console.log(response.data.quotations)
    } catch (error) {
      console.error("Error fetching quotations:", error);
      toast.error("Failed to load quotations");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMedicalConsideration = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/medicalconsideration");
      console.log(response.data.medicalConsideration)

      setMedicalConsideration(response.data.medicalConsideration || []);
    } catch (error) {
      console.error("Error fetching quotations:", error);
      toast.error("Failed to load quotations");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewQuotation = (quotation) => {
    setSelectedQuotation(quotation);
    setShowQuotationDetails(true);
  };

  const handleViewQuotations = () => {
    setShowQuotationsList(true);
    setShowMedicalSection(false);
    setShowPreview(false);
    fetchQuotations();
  };

  const loadSelect = async () => {
    setIsLoading(true);
    try {
      const toursResponse = await axios.get("http://localhost:3000/api/tours");
      const hotelsResponse = await axios.get("http://localhost:3000/api/hotels");
      const transportResponse = await axios.get("http://localhost:3000/api/transport");
      const guideResponse = await axios.get("http://localhost:3000/api/guide");

      setTours(toursResponse.data || []);
      setHotels(hotelsResponse.data || []);
      setVehicles(transportResponse.data || []);
      setGuides(guideResponse.data || []);

    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    // Validate required fields
    if (!selectedTour || !selectedVehicle || !selectedHotel || !selectedGuide || !groupQuantity) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Show medical section
    setShowMedicalSection(true);
  };

  const handleBack = () => {
    setShowMedicalSection(false);
  };

  const calculateTotalPrice = (tourDetails, vehicleDetails, hotelDetails, guideDetails, quantity) => {
    console.log("Tour", tourDetails);
    console.log("vehicleDetails", vehicleDetails);
    console.log("hotelDetails", hotelDetails);
    console.log("guideDetails", guideDetails);
    console.log("quantity", quantity);
    const tourPrice = tourDetails?.Kmrs * 10 || 0;
    const vehiclePrice = vehicleDetails?.PriceKm || 0;
    const hotelPrice = hotelDetails?.roomPrice || 0;
    const guidePrice = guideDetails?.charges || 0;

    return (tourPrice + vehiclePrice + hotelPrice + guidePrice) * quantity;
  };

  const handleSubmit = async () => {
    // Validate all required fields
    if (!selectedTour || !selectedVehicle || !selectedHotel || !selectedGuide || !groupQuantity) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Find the selected objects to get their full details
      const tourDetails = tours.find(tour => tour._id === selectedTour);
      const vehicleDetails = vehicles.find(vehicle => vehicle._id === selectedVehicle);
      const hotelDetails = hotels.find(hotel => hotel._id === selectedHotel);
      const guideDetails = guides.find(guide => guide._id === selectedGuide);

      // Calculate total price
      const total = calculateTotalPrice(
        tourDetails,
        vehicleDetails,
        hotelDetails,
        guideDetails,
        parseInt(groupQuantity)
      );

      setTotalPrice(total);

      // Create the quotation data object with complete details
      const quotationData = {
        tour: {
          id: selectedTour,
          name: tourDetails?.name,
          price: tourDetails?.Kmrs * 10,
          details: tourDetails
        },
        vehicle: {
          id: selectedVehicle,
          name: vehicleDetails?.vehicleName,
          price: vehicleDetails?.PriceKm,
          details: vehicleDetails
        },
        hotel: {
          id: selectedHotel,
          name: hotelDetails?.hotelName,
          price: hotelDetails?.roomPrice,
          details: hotelDetails
        },
        guide: {
          id: selectedGuide,
          name: guideDetails?.name,
          price: guideDetails?.charges,
          details: guideDetails
        },
        groupQuantity: parseInt(groupQuantity),
        medicalNeeds,
        roomDescription,
        totalPrice: total
      };

      setQuotationSummary(quotationData);

      // Generate content using AI
      let content = `This is a tourism quotation. Please generate a detailed travel itinerary and recommendations based on the following selected options:
      
Tour Package: ${tourDetails?.name}
Destination: ${tourDetails?.destination || 'paris to london'}
Days: ${tourDetails?.days || '40'}

Hotel: ${hotelDetails?.hotelName}
Hotel Category: ${hotelDetails?.category || 'Standard'}
Hotel Hotel Type: ${hotelDetails?.hotelType || 'Deluxe'}
Hotel Room Description: ${hotelDetails?.roomDescription || ' A hotel room is a private space within a hotel designed for guests to stay temporarily. It typically includes essential furniture such as a bed, a desk, and seating, along with amenities like a television, Wi-Fi, and an en-suite bathroom'}

Vehicle: ${vehicleDetails?.vehicleName}
Vehicle Type: ${vehicleDetails?.vehicleType || 'Standard'}

Guide: ${guideDetails?.name}
Guide Language: ${guideDetails?.language || 'English'}

Group Size: ${groupQuantity} people

Medical Considerations: ${medicalNeeds.length > 0 ? medicalNeeds.join(',') : 'None'}

under the topic named Other Medical needs give details for : ${roomDescription || 'tour 50 word summery'}

give me summery about my tour

Please provide a detailed day-by-day itinerary, recommendations for the trip based on the selected options, and any special considerations for the medical needs mentioned.

when sending the response dont highlight the headings. also use bullet points instead of *. limit to 250 words only.`;

      const apiResponse = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: content,
      });

      console.log(apiResponse.text)
      setGeneratedContent(apiResponse.text);

      // Send the data to the backend
      const response = await axios.post("http://localhost:3000/api/quotation", {
        tour: tourDetails?.name,
        vehicle: vehicleDetails?.vehicleName,
        hotel: hotelDetails?.hotelName,
        guide: guideDetails?.name,
        groupQuantity,
        medicalNeeds,
        roomDescription,
        description: apiResponse.text,
        totalPrice
      });

      toast.success("Quotation created successfully!");
      setShowPreview(true);

    } catch (error) {
      console.error("Error creating quotation:", error);
      toast.error(error.response?.data?.message || "Failed to create quotation");
    } finally {
      setIsSubmitting(false);
    }
  };

  const generatePDF = async () => {
    if (!pdfRef.current || !quotationSummary) return;

    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Helper function to add page header
    const addPageHeader = (pageTitle) => {
      // Add header background
      doc.setFillColor(242, 153, 74); // Orange color
      doc.rect(0, 0, pageWidth, 25, 'F');

      // Add company name
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('Flamingo Tours', 20, 15);

      // Add page title
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'normal');
      doc.text(pageTitle, pageWidth - 20, 15, { align: 'right' });

      // Add decorative line
      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(0.5);
      doc.line(20, 20, pageWidth - 20, 20);
    };

    // First page - Quotation details and pricing
    addPageHeader('Tour Quotation Summary');

    // Add quotation date and reference
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 35);
    doc.text(`Reference: QT-${Math.floor(Math.random() * 10000)}`, pageWidth - 20, 35, { align: 'right' });

    // Add client information
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Quotation For:', 20, 45);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(`Group of ${quotationSummary.groupQuantity} people`, 20, 52);

    // Add section title
    doc.setFillColor(240, 240, 240);
    doc.rect(20, 60, pageWidth - 40, 8, 'F');
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Selected Options', 25, 66);

    // Add tour details in a table-like format
    const startY = 75;
    const lineHeight = 7;

    // Column headers
    doc.setFillColor(230, 230, 230);
    doc.rect(20, startY, pageWidth - 40, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Item', 25, startY + 5.5);
    doc.text('Description', 70, startY + 5.5);
    doc.text('Price', pageWidth - 25, startY + 5.5, { align: 'right' });

    // Tour package row
    let currentY = startY + lineHeight + 6;
    doc.setFont('helvetica', 'bold');
    doc.text('Tour Package', 25, currentY);
    doc.setFont('helvetica', 'normal');

    // Fix for potentially undefined or null values
    const tourName = quotationSummary.tour.name || 'Sri Lanka Cultural and Scenic Highlights';
    const tourPrice = quotationSummary.tour.price ? `$${quotationSummary.tour.price}` : '$0';
    doc.text(tourName, 70, currentY);
    doc.text(tourPrice, pageWidth - 25, currentY, { align: 'right' });

    // Hotel row
    currentY += lineHeight;
    doc.setFont('helvetica', 'bold');
    doc.text('Hotel', 25, currentY);
    doc.setFont('helvetica', 'normal');

    const hotelName = quotationSummary.hotel.name || 'SonalHotel';
    const hotelPrice = quotationSummary.hotel.price ? `$${quotationSummary.hotel.price}` : '$0';
    doc.text(hotelName, 70, currentY);
    doc.text(hotelPrice, pageWidth - 25, currentY, { align: 'right' });

    // Vehicle row
    currentY += lineHeight;
    doc.setFont('helvetica', 'bold');
    doc.text('Vehicle', 25, currentY);
    doc.setFont('helvetica', 'normal');

    const vehicleName = quotationSummary.vehicle.name || 'Standard Mini-Bus';
    const vehiclePrice = quotationSummary.vehicle.price ? `$${quotationSummary.vehicle.price}` : '$0';
    doc.text(vehicleName, 70, currentY);
    doc.text(vehiclePrice, pageWidth - 25, currentY, { align: 'right' });

    // Guide row
    currentY += lineHeight;
    doc.setFont('helvetica', 'bold');
    doc.text('Guide', 25, currentY);
    doc.setFont('helvetica', 'normal');

    const guideName = quotationSummary.guide.name || 'Ashan';
    const guidePrice = quotationSummary.guide.price ? `$${quotationSummary.guide.price}` : '$0';
    doc.text(guideName, 70, currentY);
    doc.text(guidePrice, pageWidth - 25, currentY, { align: 'right' });

    // Draw a line
    currentY += lineHeight;
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(20, currentY, pageWidth - 20, currentY);

    // Total calculation
    currentY += lineHeight + 3;
    doc.setFont('helvetica', 'normal');
    doc.text(`Subtotal (per person):`, 25, currentY);

    const perPersonPrice = (quotationSummary.totalPrice / quotationSummary.groupQuantity).toFixed(2);
    doc.text(`$${perPersonPrice}`, pageWidth - 25, currentY, { align: 'right' });

    currentY += lineHeight;
    doc.text(`Group Size:`, 25, currentY);
    doc.text(`${quotationSummary.groupQuantity} people`, pageWidth - 25, currentY, { align: 'right' });

    currentY += lineHeight + 3;
    doc.setDrawColor(100, 100, 100);
    doc.setLineWidth(0.7);
    doc.line(pageWidth - 80, currentY - 2, pageWidth - 20, currentY - 2);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(`Total Price:`, 25, currentY + 5);
    doc.setFontSize(14);

    const totalPrice = quotationSummary.totalPrice.toFixed(2);
    doc.text(`$${totalPrice}`, pageWidth - 25, currentY + 5, { align: 'right' });

    // Medical needs if any
    if (quotationSummary.medicalNeeds && quotationSummary.medicalNeeds.length > 0) {
      currentY += lineHeight + 15;

      // Add section title
      doc.setFillColor(255, 245, 230);
      doc.rect(20, currentY, pageWidth - 40, 8, 'F');
      doc.setTextColor(200, 100, 0);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Medical Considerations', 25, currentY + 6);

      currentY += lineHeight + 5;
      doc.setTextColor(60, 60, 60);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');

      quotationSummary.medicalNeeds.forEach((need, index) => {
        if (need) {
          doc.text(`• ${need}`, 25, currentY + (index * 6));
        }
      });
    }

    // Add a footer
    doc.setDrawColor(242, 153, 74);
    doc.setLineWidth(1);
    doc.line(20, pageHeight - 20, pageWidth - 20, pageHeight - 20);

    doc.setTextColor(100, 100, 100);
    doc.setFontSize(8);
    doc.text('Flamingo Tours - Your Journey, Our Passion', pageWidth / 2, pageHeight - 15, { align: 'center' });
    doc.text('Page 1', pageWidth / 2, pageHeight - 10, { align: 'center' });

    // Add second page for the AI-generated content
    doc.addPage();
    addPageHeader('Detailed Itinerary and Recommendations');

    // Format and add the AI-generated content
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');

    // Split content into sections for better formatting
    const contentText = generatedContent || "Detailed itinerary will be provided.";
    const contentSections = contentText.split('\n\n');
    let yPos = 35;

    contentSections.forEach((section, index) => {
      if (!section) return; // Skip empty sections

      // Remove asterisks from the section text

      // Check if this is a heading (usually shorter and ends with a colon)
      const isHeading = section.length < 60 && section.includes(':');
      let textLines;
      if (isHeading) {
        // Add some space before headings (except the first one)
        if (index > 0) yPos += 5;
        const cleanedSection = section.replace(/\*/g, '');

        doc.setFont('helvetica', 'bold');
        doc.setTextColor(40, 40, 40);
        doc.setFontSize(12);
        textLines = doc.splitTextToSize(cleanedSection, pageWidth - 40);
      } else {
        const cleanedSection = section.replace(/\*/g, '');
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(60, 60, 60);
        doc.setFontSize(11);
        textLines = doc.splitTextToSize(cleanedSection, pageWidth - 40);
      }


      // Check if we need to add a new page
      if (yPos + (textLines.length * 6) > pageHeight - 25) {
        doc.addPage();
        addPageHeader('Detailed Itinerary and Recommendations');
        yPos = 35;
      }

      doc.text(textLines, 20, yPos);
      yPos += textLines.length * 6 + 4;
    });


    // Add page number to the footer
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setDrawColor(242, 153, 74);
      doc.setLineWidth(1);
      doc.line(20, pageHeight - 20, pageWidth - 20, pageHeight - 20);

      doc.setTextColor(100, 100, 100);
      doc.setFontSize(8);
      doc.text('Flamingo Tours - Your Journey, Our Passion', pageWidth / 2, pageHeight - 15, { align: 'center' });
      doc.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    }

    // Add a special third page with assumptions and considerations
    if (quotationSummary.medicalNeeds && quotationSummary.medicalNeeds.length > 0) {
      doc.addPage();
      addPageHeader('Special Considerations');

      let yPos = 35;

      // Add title
      doc.setTextColor(40, 40, 40);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Assumptions & Considerations', 20, yPos);

      yPos += 10;

      // Add medical considerations
      doc.setTextColor(60, 60, 60);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Medical Needs:', 20, yPos);

      yPos += 8;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);

      quotationSummary.medicalNeeds.forEach(need => {
        if (!need) return; // Skip empty needs

        const considerations = getMedicalConsiderations(need);
        const needText = `• ${need}:`;
        doc.setFont('helvetica', 'bold');
        doc.text(needText, 20, yPos);
        doc.setFont('helvetica', 'normal');

        const considerationText = doc.splitTextToSize(considerations, pageWidth - 50);
        doc.text(considerationText, 30, yPos + 6);

        yPos += considerationText.length * 6 + 12;
      });

      // Add tour package considerations
      yPos += 5;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      const tourNameText = quotationSummary.tour.name || 'Sri Lanka Cultural and Scenic Highlights';
      doc.text(`Tour Package "${tourNameText}":`, 20, yPos);

      yPos += 8;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      const packageConsideration = "Since there's no description, we've assumed this package focuses on general sightseeing and cultural experiences. The itinerary has been built accordingly. This is the biggest unknown, and this itinerary needs to be adjusted once the actual package details are known.";
      const packageText = doc.splitTextToSize(packageConsideration, pageWidth - 40);
      doc.text(packageText, 20, yPos);

      yPos += packageText.length * 6 + 10;

      // Add vehicle considerations
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      const vehicleNameText = quotationSummary.vehicle.name || 'Standard Mini-Bus';
      doc.text(`Vehicle "${vehicleNameText}":`, 20, yPos);

      yPos += 8;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      const vehicleConsideration = `For a group of ${quotationSummary.groupQuantity} people, we've assumed a vehicle with AC suitable for comfortable travel with luggage.`;
      const vehicleText = doc.splitTextToSize(vehicleConsideration, pageWidth - 40);
      doc.text(vehicleText, 20, yPos);

      // Add page number to the footer
      doc.setDrawColor(242, 153, 74);
      doc.setLineWidth(1);
      doc.line(20, pageHeight - 20, pageWidth - 20, pageHeight - 20);

      doc.setTextColor(100, 100, 100);
      doc.setFontSize(8);
      doc.text('Flamingo Tours - Your Journey, Our Passion', pageWidth / 2, pageHeight - 15, { align: 'center' });
      doc.text(`Page ${totalPages + 1} of ${totalPages + 1}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    }

    // Save the PDF
    doc.save('flamingo_tours_quotation.pdf');
  };

  // Helper function to get medical considerations based on condition
  const getMedicalConsiderations = (condition) => {

    // const considerations = {
    //   "Older than 65 years": "We'll ensure a comfortable pace, frequent rest stops, and accommodations with elevator access. Activities will be adjusted to moderate exertion levels.",
    //   "With Arthritis": "We'll recommend accommodations with accessibility features, arrange for ground floor rooms when possible, and schedule activities with minimal walking on uneven terrain.",
    //   "With Osteoporosis": "We'll ensure careful transportation arrangements, avoid rough terrain, and recommend gentle activities with minimal risk of falls.",
    //   "Respiratory Disease": "We'll avoid high altitude locations, ensure air-conditioned transportation, and recommend accommodations with good ventilation and air quality.",
    //   "Pregnancy": "We'll arrange for comfortable transportation with frequent stops, ensure accommodations near medical facilities, and recommend gentle activities.",
    //   "Deep Vein Thrombosis": "We'll schedule regular stops during long journeys, recommend compression stockings, and ensure adequate hydration throughout the tour.",
    //   "Heat and Cold Sensitivity": "We'll arrange climate-controlled transportation, recommend appropriate clothing, and schedule activities during comfortable temperature periods.",
    //   "Hypertension/Heart Diseases": "We'll ensure a relaxed pace, avoid high altitude locations, and recommend accommodations near medical facilities.",
    //   "High Altitude Sickness": "We'll arrange gradual acclimatization, ensure proper hydration, and avoid rapid ascents to high altitude locations.",
    //   "Insect Born Disease Risks": "We'll recommend appropriate insect repellents, ensure accommodations with proper screening, and provide information on local disease risks."
    // };
    var mc;
    console.log(medicalConsideration)
    medicalConsideration.forEach((consideration) => {
      if (consideration.name == condition) {
        mc = consideration.description;
      }
    })
    console.log(mc)
    return mc || "Special considerations will be made for this condition.";
  };




  return (
    <div className="font-sans">
      <header className="bg-orange-600 text-white py-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-4xl font-bold">Flamingo Tours</div>
          <nav className="flex space-x-6 text-lg">
            <a href="/TourPackage" className="hover:text-gray-200">Package</a>
            <a href="/Transport" className="hover:text-gray-200">Transport</a>
            <a href="/TourGide" className="hover:text-gray-200">Tour Guide</a>
            <a href="/userHotel" className="hover:text-gray-200">Hotels</a>
            <a href="/TourCotationCaculation" className="hover:text-gray-200">Quotation</a>
            <a href="#" className="hover:text-gray-200">Login</a>
            <a href="#" className="hover:text-gray-200">Sign Up</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-cover bg-center h-96" style={{ backgroundImage: `url(${hotel23})` }}>
        <div className="container mx-auto text-center py-24 text-white">
          <h2 className="text-4xl font-bold mb-4">Travel, enjoy and live a new and full life</h2>
          <p className="text-xl mb-4">Built Wicket longer admire do barton vanity itself do in it.</p>
          <div className="flex justify-center space-x-6">
            <a href="#find-out" className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg">Find out more</a>
            <a href="#play-demo" className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg">Play Demo</a>
          </div>
        </div>
      </section>

      {/* Report Preview Section */}
      {showPreview && quotationSummary && (
        <section className="container mx-auto py-8" ref={pdfRef}>
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold">Quotation Preview</h3>
            <div className="space-x-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition duration-300"
                onClick={generatePDF}
              >
                <i className="fas fa-download mr-2"></i> Download PDF
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition duration-300"
                onClick={() => setShowPreview(false)}
              >
                <i className="fas fa-edit mr-2"></i> Edit
              </button>
            </div>
          </div>
          <div className="border border-gray-300 rounded-lg shadow-lg mt-6 p-8 bg-white">
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h4 className="text-2xl font-bold text-orange-600 mb-4">Tour Quotation Summary</h4>
              <p className="text-gray-500">Generated on: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h5 className="text-lg font-semibold text-blue-700 mb-3">Tour Package</h5>
                <p className="text-xl mb-1">{quotationSummary.tour.name}</p>
                <p className="text-gray-600 font-medium">${quotationSummary.tour.price}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h5 className="text-lg font-semibold text-blue-700 mb-3">Hotel</h5>
                <p className="text-xl mb-1">{quotationSummary.hotel.name}</p>
                <p className="text-gray-600 font-medium">${quotationSummary.hotel.price}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h5 className="text-lg font-semibold text-blue-700 mb-3">Vehicle</h5>
                <p className="text-xl mb-1">{quotationSummary.vehicle.name}</p>
                <p className="text-gray-600 font-medium">${quotationSummary.vehicle.price}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h5 className="text-lg font-semibold text-blue-700 mb-3">Guide</h5>
                <p className="text-xl mb-1">{quotationSummary.guide.name}</p>
                <p className="text-gray-600 font-medium">${quotationSummary.guide.price}</p>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-8">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-gray-700">Subtotal (per person):</p>
                <p className="text-gray-800">${(quotationSummary.totalPrice / quotationSummary.groupQuantity).toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center mb-4">
                <p className="font-semibold text-gray-700">Group Size:</p>
                <p className="text-gray-800">{quotationSummary.groupQuantity} people</p>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-blue-200">
                <p className="text-lg font-bold text-blue-800">Total Price:</p>
                <p className="text-xl font-bold text-blue-800">${quotationSummary.totalPrice.toFixed(2)}</p>
              </div>
            </div>

            {quotationSummary.medicalNeeds.length > 0 && (
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 mb-8">
                <h5 className="text-lg font-semibold text-yellow-700 mb-3">Medical Considerations</h5>
                <ul className="list-disc pl-5 space-y-1">
                  {quotationSummary.medicalNeeds.map((need, index) => (
                    <li key={index} className="text-gray-700">{need}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8">
              <h4 className="text-2xl font-bold text-orange-600 mb-4">Detailed Itinerary and Recommendations</h4>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 whitespace-pre-line text-gray-700">
                {generatedContent}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Create Tour Package Quotation */}
      {!showMedicalSection && !showPreview && !showQuotationsList && (
        <section className="container mx-auto py-8" id="quotation">
          <h3 className="text-2xl font-semibold mb-6">Create Tour Package Quotation</h3>
          <div className="bg-white shadow-lg p-8 rounded-lg">
            <div className="flex justify-end mb-4">
              <button
                type="button"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                onClick={handleViewQuotations}
              >
                View Quotations
              </button>
            </div>
            <form>
              {/* Tour Package */}
              <div className="mb-4">
                <label className="block text-lg">Select Tour Package</label>
                <select
                  className="w-full p-3 border rounded-md mt-2"
                  value={selectedTour}
                  onChange={(e) => setSelectedTour(e.target.value)}
                >
                  <option value="">Select Tour Package</option>
                  {tours && tours.map((tour, index) => (
                    <option key={index} value={tour._id}>{tour.name}</option>
                  ))}
                </select>
              </div>

              {/* Select Vehicle */}
              <div className="mb-4">
                <label className="block text-lg">Select Vehicle</label>
                <select
                  className="w-full p-3 border rounded-md mt-2"
                  value={selectedVehicle}
                  onChange={(e) => setSelectedVehicle(e.target.value)}
                >
                  <option value="">Select Vehicle Type</option>
                  {vehicles && vehicles.map((vehicle, index) => (
                    <option key={index} value={vehicle._id}>{vehicle.vehicleName}</option>
                  ))}
                  <option key="1" value="none">Bajaj 3 Wheel</option>
                </select>
              </div>

              {/* Select Hotel */}
              <div className="mb-4">
                <label className="block text-lg">Select Hotel Category</label>
                <select
                  className="w-full p-3 border rounded-md mt-2"
                  value={selectedHotel}
                  onChange={(e) => setSelectedHotel(e.target.value)}
                >
                  <option value="">Choose Hotel Category</option>
                  {hotels && hotels.map((hotel, index) => (
                    <option key={index} value={hotel._id}>{hotel.hotelName}</option>
                  ))}
                </select>
              </div>

              {/* Select Guide */}
              <div className="mb-4">
                <label className="block text-lg">Select Guide Type</label>
                <select
                  className="w-full p-3 border rounded-md mt-2"
                  value={selectedGuide}
                  onChange={(e) => setSelectedGuide(e.target.value)}
                >
                  <option value="">Choose Guide Type</option>
                  {guides && guides.map((guide, index) => (
                    <option key={index} value={guide._id}>{guide.name}</option>
                  ))}
                </select>
              </div>

              {/* Group Quantity */}
              <div className="mb-4">
                <label className="block text-lg">Group Quantity</label>
                <input
                  type="number"
                  className="w-full p-3 border rounded-md mt-2"
                  placeholder="Enter number of people"
                  value={groupQuantity}
                  onChange={(e) => setGroupQuantity(e.target.value)}
                />
              </div>

              {/* Special Medical Needs Button */}
              <div className="flex justify-between items-center mb-6">
                <button
                  type="button"
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg"
                  onClick={handleNext}
                >
                  Next
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg"
                  onClick={() => setShowMedicalSection(true)}
                >
                  Special Medical Needs
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* Special Medical Needs Section */}
      {showMedicalSection && !showPreview && (
        <section className="container mx-auto py-8">
          <h3 className="text-2xl font-semibold mb-6">Special Medical Needs</h3>
          <div className="bg-white shadow-lg p-8 rounded-lg">
            <form>
              <div className="space-y-4">
                <label className="block text-lg">Select applicable medical conditions</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Older than 65 years",
                    "With Arthritis",
                    "With Osteoporosis",
                    "Respiratory Disease",
                    "Pregnancy",
                    "Deep Vein Thrombosis",
                    "Heat and Cold Sensitivity",
                    "Hypertension/Heart Diseases",
                    "High Altitude Sickness",
                    "Insect Born Disease Risks",
                  ].map((condition, idx) => (
                    <div key={idx} className="flex items-center">
                      <input
                        type="checkbox"
                        value={condition}
                        checked={medicalNeeds.includes(condition)}
                        onChange={handleMedicalChange}
                        className="form-checkbox h-5 w-5 text-blue-500"
                      />
                      <span className="ml-2">{condition}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-lg">Ask some questions about your tour</label>
                <textarea
                  className="w-full p-3 border rounded-md mt-2"
                  rows="4"
                  placeholder="Enter room description"
                  value={roomDescription}
                  onChange={(e) => setRoomDescription(e.target.value)}
                />
              </div>

              {/* Confirm Medical Needs Button */}
              <div className="flex justify-between items-center mt-6">
                <button
                  type="button"
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Confirm and Submit"}
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg"
                  onClick={handleBack}
                  disabled={isSubmitting}
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* Quotation Details Modal */}
      {showQuotationDetails && selectedQuotation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full my-8 mx-auto">
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b pb-4 mb-6 sticky top-0 bg-white">
                <h3 className="text-2xl font-bold text-orange-600">Quotation Details</h3>
                <button
                  onClick={() => setShowQuotationDetails(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-blue-700 mb-2">Tour Package</h4>
                  <p className="text-gray-800">{selectedQuotation.tour}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-blue-700 mb-2">Hotel</h4>
                  <p className="text-gray-800">{selectedQuotation.hotel}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-blue-700 mb-2">Vehicle</h4>
                  <p className="text-gray-800">{selectedQuotation.vehicle}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-blue-700 mb-2">Guide</h4>
                  <p className="text-gray-800">{selectedQuotation.guide}</p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold text-blue-700">Group Size</h4>
                  <p className="text-gray-800">{selectedQuotation.groupQuantity} people</p>
                </div>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-blue-100">
                  <h4 className="text-lg font-semibold text-blue-700">Total Price</h4>
                  <p className="text-xl font-bold text-blue-800">
                    ${selectedQuotation.totalPrice ? selectedQuotation.totalPrice.toFixed(2) : "N/A"}
                  </p>
                </div>
              </div>

              {selectedQuotation.medicalNeeds && selectedQuotation.medicalNeeds.length > 0 && (
                <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                  <h4 className="text-lg font-semibold text-yellow-700 mb-2">Medical Considerations</h4>
                  <ul className="list-disc pl-5">
                    {selectedQuotation.medicalNeeds.map((need, index) => (
                      <li key={index} className="text-gray-700 mb-1">{need}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedQuotation.description && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">Itinerary & Recommendations</h4>
                  <div className="whitespace-pre-line text-gray-700">
                    {selectedQuotation.description}
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowQuotationDetails(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quotations List Section */}
      {showQuotationsList && (
        <section className="container mx-auto py-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold">All Quotations</h3>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition duration-300"
              onClick={() => setShowQuotationsList(false)}
            >
              Back to Form
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading quotations...</p>
            </div>
          ) : quotations.length === 0 ? (
            <div className="bg-white shadow-lg rounded-lg p-8 text-center">
              <p className="text-gray-600">No quotations found.</p>
            </div>
          ) : (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quotation ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tour
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hotel
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {quotations.map((quotation) => (
                      <tr key={quotation._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {quotation._id.substring(0, 8)}...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {quotation.tour}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {quotation.hotel}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${quotation.totalPrice ? quotation.totalPrice.toFixed(2) : "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleViewQuotation(quotation)}
                            className="text-blue-600 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded-full transition duration-300"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Footer Section */}
      <footer className="bg-black text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Flamingo Tours. All rights reserved.</p>
          <div className="space-x-6">
            <a href="#" className="hover:text-gray-400">Facebook</a>
            <a href="#" className="hover:text-gray-400">Twitter</a>
            <a href="#" className="hover:text-gray-400">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TourPackageQuotation;

