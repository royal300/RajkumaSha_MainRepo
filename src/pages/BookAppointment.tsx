import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

const BookAppointment = () => {
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    caseType: "",
    timeSlot: "",
    caseDetails: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) {
      toast.error("Please select an appointment date");
      return;
    }

    if (!formData.fullName || !formData.mobile || !formData.caseType) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const appointmentData = {
        fullName: formData.fullName,
        mobile: formData.mobile,
        caseType: formData.caseType,
        timeSlot: formData.timeSlot,
        caseDetails: formData.caseDetails,
        appointmentDate: date.toLocaleDateString('en-IN', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
      };

      // Send WhatsApp message with appointment details - Multiple fallback mechanisms
      const sendWhatsAppMessage = () => {
        const whatsappMessage = `I want to book appointment. Details:
Name: ${appointmentData.fullName}
Mobile: ${appointmentData.mobile}
Case Type: ${appointmentData.caseType}
Appointment Date: ${appointmentData.appointmentDate}
Case Details: ${appointmentData.caseDetails}`;

        const whatsappUrl = `https://wa.me/918013763607?text=${encodeURIComponent(whatsappMessage)}`;
        
        console.log('Attempting to send WhatsApp message...');
        
        // Method 1: Direct window.open with specific parameters
        try {
          const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer,width=800,height=600');
          if (newWindow && !newWindow.closed) {
            console.log('WhatsApp opened successfully via window.open');
            return true;
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
          return true;
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
          return true;
        } catch (error) {
          console.log('Method 3 failed:', error);
        }
        
        // Method 4: Use location.href as last resort
        try {
          window.location.href = whatsappUrl;
          console.log('WhatsApp opened successfully via location.href');
          return true;
        } catch (error) {
          console.log('Method 4 failed:', error);
        }
        
        return false;
      };

      // Try multiple times with different delays and methods
      let whatsappSuccess = false;
      
      // Immediate attempt
      whatsappSuccess = sendWhatsAppMessage();
      
      // If first attempt fails, try again with different delays
      if (!whatsappSuccess) {
        setTimeout(() => {
          whatsappSuccess = sendWhatsAppMessage();
          
          // If still fails, try one more time after 300ms
          if (!whatsappSuccess) {
            setTimeout(() => {
              whatsappSuccess = sendWhatsAppMessage();
              
              // Final attempt after 800ms
              if (!whatsappSuccess) {
                setTimeout(() => {
                  sendWhatsAppMessage();
                }, 800);
              }
            }, 300);
          }
        }, 150);
      }

      setIsSubmitted(true);
      toast.success("Opening WhatsApp to send your appointment details...");

      // Reset form
      setTimeout(() => {
        setFormData({
          fullName: "",
          mobile: "",
          caseType: "",
          timeSlot: "",
          caseDetails: "",
        });
        setDate(undefined);
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Appointment booking error:", error);
      toast.error("Failed to process request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4 pt-20">
        <div className="text-center max-w-md animate-scale-in">
          <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-playfair font-bold text-navy mb-4">
            Thank You!
          </h1>
          <p className="text-muted-foreground text-lg">
            Please complete the booking by sending the message on WhatsApp.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-navy mb-4">
            Book Your Appointment
          </h1>
          <p className="text-muted-foreground text-lg">
            Schedule a consultation with Advocate Raj Kumar Sha, B.A. (Honours), L.L.B. (Honours)
          </p>
          <div className="mt-4 inline-block px-6 py-3 bg-golden/10 border-2 border-golden rounded-lg">
            <p className="text-golden font-bold text-2xl">
              Consultation Fee: ₹400/-
            </p>
            <p className="text-golden font-semibold text-lg mt-2">
              Consultation Time: 7pm - 9pm
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card-elegant p-8 md:p-12 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Calendar */}
            <div>
              <Label className="text-navy font-semibold mb-3 block">
                Select Appointment Date *
              </Label>
              <div className="border rounded-lg p-4 bg-muted/30">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) =>
                    date < new Date() || date.getDay() === 0
                  }
                  className="pointer-events-auto"
                />
              </div>
              {date && (
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4 mr-2 text-golden" />
                  Selected: {format(date, "PPP")}
                </div>
              )}
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              <div>
                <Label htmlFor="fullName" className="text-navy font-semibold">
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="Enter your full name"
                  required
                  className="mt-2"
                />
              </div>


              <div>
                <Label htmlFor="mobile" className="text-navy font-semibold">
                  Mobile Number *
                </Label>
                <Input
                  id="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                  placeholder="+91 XXXXXXXXXX"
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="caseType" className="text-navy font-semibold">
                  Case Type *
                </Label>
                <Select
                  value={formData.caseType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, caseType: value })
                  }
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select case type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="criminal">Criminal Cases</SelectItem>
                    <SelectItem value="civil">Civil Matters</SelectItem>
                    <SelectItem value="family">Family Disputes</SelectItem>
                    <SelectItem value="drt-lrt">DRT/LRT</SelectItem>
                    <SelectItem value="property">Property Law</SelectItem>
                    <SelectItem value="consumer">Consumer Law</SelectItem>
                    <SelectItem value="labour">Labour & Employment Disputes</SelectItem>
                    <SelectItem value="tax">Tax Law</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>


          {/* Case Details */}
          <div className="mb-8">
            <Label htmlFor="caseDetails" className="text-navy font-semibold">
              Case/Dispute Details
            </Label>
            <Textarea
              id="caseDetails"
              value={formData.caseDetails}
              onChange={(e) =>
                setFormData({ ...formData, caseDetails: e.target.value })
              }
              placeholder="...Please provide brief details about your case/dispute...."
              rows={6}
              className="mt-2"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-golden text-lg py-6"
          >
            {isSubmitting ? "Processing..." : "Book Appointment via WhatsApp"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
