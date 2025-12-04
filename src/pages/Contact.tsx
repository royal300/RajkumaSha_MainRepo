import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Construct WhatsApp message
      const whatsappMessage = `New Contact Inquiry:
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject || "N/A"}
Message: ${formData.message}`;

      const whatsappUrl = `https://wa.me/918013763607?text=${encodeURIComponent(whatsappMessage)}`;

      console.log('Attempting to send WhatsApp message...');

      // Method 1: Direct window.open with specific parameters
      try {
        const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer,width=800,height=600');
        if (newWindow && !newWindow.closed) {
          console.log('WhatsApp opened successfully via window.open');
          // Success handling
          toast.success("Opening WhatsApp to send your message...");
          setFormData({ name: "", email: "", subject: "", message: "" });
          setIsSubmitting(false);
          return;
        }
      } catch (error) {
        console.log('Method 1 failed:', error);
      }

      // Method 2: Create temporary link and click
      try {
        const link = document.createElement('a');
        link.href = whatsappUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        setTimeout(() => document.body.removeChild(link), 100);
        console.log('WhatsApp opened successfully via temporary link');
        toast.success("Opening WhatsApp to send your message...");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setIsSubmitting(false);
        return;
      } catch (error) {
        console.log('Method 2 failed:', error);
      }

      // Method 3: Use iframe approach
      try {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = whatsappUrl;
        document.body.appendChild(iframe);
        setTimeout(() => document.body.removeChild(iframe), 1000);
        console.log('WhatsApp opened successfully via iframe');
        toast.success("Opening WhatsApp to send your message...");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setIsSubmitting(false);
        return;
      } catch (error) {
        console.log('Method 3 failed:', error);
      }

      // Method 4: Use location.href as last resort
      try {
        window.location.href = whatsappUrl;
        console.log('WhatsApp opened successfully via location.href');
        toast.success("Opening WhatsApp to send your message...");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } catch (error) {
        console.log('Method 4 failed:', error);
        toast.error("Failed to open WhatsApp. Please try again.");
      }

    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-navy mb-4">
            Get in Touch
          </h1>
          <p className="text-muted-foreground text-lg">
            Reach out to Advocate Raj Kumar Sha, B.A. (Honours), L.L.B. (Honours) for legal consultation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6 animate-slide-up">
            <div className="card-elegant p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-golden/10 rounded-lg">
                  <MapPin className="h-6 w-6 text-golden" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy mb-2">Office Address</h3>
                  <p className="text-muted-foreground text-sm">
                    8, Mochi Mahal, Sadar Bazar<br />
                    Barrackpore, Kolkata – 700120
                  </p>
                </div>
              </div>
            </div>

            <div className="card-elegant p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-golden/10 rounded-lg">
                  <Phone className="h-6 w-6 text-golden" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy mb-2">Phone Numbers</h3>
                  <div className="space-y-1">
                    <a
                      href="tel:8013763607"
                      className="block text-muted-foreground text-sm hover:text-golden transition-colors"
                    >
                      8013763607
                    </a>
                    <a
                      href="tel:9143175368"
                      className="block text-muted-foreground text-sm hover:text-golden transition-colors"
                    >
                      9143175368
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-elegant p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-golden/10 rounded-lg">
                  <Mail className="h-6 w-6 text-golden" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy mb-2">Email Address</h3>
                  <a
                    href="mailto:advocaterajkumarsha@gmail.com"
                    className="text-muted-foreground text-sm hover:text-golden transition-colors break-all"
                  >
                    advocaterajkumarsha@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="card-elegant p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-golden/10 rounded-lg">
                  <Clock className="h-6 w-6 text-golden" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy mb-2">Office Hours</h3>
                  <p className="text-muted-foreground text-sm">
                    Monday - Saturday: 10:00 AM - 6:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <form onSubmit={handleSubmit} className="card-elegant p-8">
              <h2 className="text-2xl font-playfair font-bold text-navy mb-6">
                Send Us a Message
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="name" className="text-navy font-semibold">
                    Your Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter your name"
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-navy font-semibold">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="your.email@example.com"
                    required
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="mb-6">
                <Label htmlFor="subject" className="text-navy font-semibold">
                  Subject
                </Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="Enter subject"
                  className="mt-2"
                />
              </div>

              <div className="mb-6">
                <Label htmlFor="message" className="text-navy font-semibold">
                  Your Message *
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Enter your message..."
                  rows={8}
                  required
                  className="mt-2"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-golden text-lg py-6"
              >
                {isSubmitting ? "Sending..." : "Send Message via WhatsApp"}
              </Button>
            </form>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-12 animate-fade-in">
          <div className="card-elegant p-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.0!2d88.38!3d22.76!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQ1JzM2LjAiTiA4OMKwMjInNDguMCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
              title="Barrackpore Court Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
