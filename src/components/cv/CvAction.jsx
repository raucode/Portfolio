export default function CvActions() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="cv-actions">
      <button type="button" onClick={handlePrint}>
        Export PDF
      </button>
    </div>
  );
}