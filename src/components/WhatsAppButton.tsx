import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "919330833711";
  const message = "Hello, I would like to inquire about legal services.";
  
  const handleClick = () => {
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-24 right-6 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6 group-hover:rotate-12 transition-transform" />
    </button>
  );
};

export default WhatsAppButton;
