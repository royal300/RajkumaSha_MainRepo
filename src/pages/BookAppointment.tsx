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
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const BookAppointment = () => {
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
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

    if (!formData.fullName || !formData.email || !formData.mobile || !formData.caseType) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const { supabase } = await import("@/integrations/supabase/client");
      
      const appointmentData = {
        fullName: formData.fullName,
        email: formData.email,
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

      const { data, error } = await supabase.functions.invoke('save-to-sheets', {
        body: appointmentData,
      });

      if (error) {
        console.error("Booking error:", error);
        throw error;
      }

      console.log("Booking saved successfully:", data);
      const bookingId = (data as any)?.bookingId;

      // Call N8N webhook directly
      try {
        const n8nWebhookUrl = 'https://n8n.srv985905.hstgr.cloud/webhook/appointment-booking';
        
        const response = await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...appointmentData,
            bookingId,
            source: 'website',
            timestamp: new Date().toISOString(),
          }),
        });

        if (response.ok) {
          console.log('N8N webhook called successfully');
        } else {
          console.error('N8N webhook responded with status:', response.status);
        }
      } catch (n8nError) {
        console.error('N8N webhook call failed:', n8nError);
        // Do not block user flow if webhook fails
      }

      setIsSubmitted(true);
      toast.success("Thank you! Partial booking received. Check your email for payment to confirm your appointment.");

      // Reset form
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
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
      toast.error("Failed to book appointment. Please try again.");
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
            Partial booking received. Check your email for payment to confirm your appointment.
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

          {/* Time Slot Selection */}
          <div className="mb-8">
            <Label className="text-navy font-semibold mb-3 block">
              Preferred Time Slot
            </Label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {["12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"].map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setFormData({ ...formData, timeSlot: time })}
                  className={cn(
                    "px-4 py-3 rounded-lg border-2 transition-all text-sm font-medium",
                    formData.timeSlot === time
                      ? "border-golden bg-golden/10 text-golden"
                      : "border-muted hover:border-golden/50"
                  )}
                >
                  {time}
                </button>
              ))}
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
            {isSubmitting ? "Booking..." : "Book Appointment"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
