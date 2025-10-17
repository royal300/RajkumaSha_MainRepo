import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Scale, Gavel, Users, Briefcase, Award, Clock, Shield } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import heroBackground from "@/assets/hero-background.jpg";
import rajKumarShaPortrait from "@/assets/raj-kumar-sha-portrait.png";
import courtBuilding from "@/assets/court-building.jpg";
import rajKumarShaOffice from "@/assets/raj-kumar-sha-office.jpg";

const Home = () => {
  const [typewriterText, setTypewriterText] = useState("");
  const fullText = "Advocate Raj Kumar Sha";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypewriterText(fullText.substring(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const services = [
    {
      icon: Gavel,
      title: "Criminal Cases",
      description: "Expert defense in criminal cases with proven track record of successful outcomes.",
    },
    {
      icon: Scale,
      title: "Civil Matters",
      description: "Comprehensive civil litigation services including property disputes, contracts, and damages.",
    },
    {
      icon: Users,
      title: "Family Disputes",
      description: "Sensitive handling of family disputes including child custody.",
    },
    {
      icon: Briefcase,
      title: "DRT/LRT",
      description: "Handling and resolving disputes related to cases under the Debt Recovery Tribunal and Land Recovery Tribunal.",
    },
  ];

  const testimonials = [
    {
      name: "Amit Kumar",
      case: "Property Dispute",
      rating: 5,
      content: "Advocate Saha handled my complex property case with utmost professionalism. His expertise and dedication resulted in a favorable outcome. Highly recommended!",
    },
    {
      name: "Priya Sharma",
      case: "Family Law",
      rating: 5,
      content: "Very compassionate and understanding during a difficult time. He provided excellent legal guidance for my custody case and fought for my rights.",
    },
    {
      name: "Rahul Banerjee",
      case: "Criminal Defense",
      rating: 5,
      content: "Outstanding lawyer! His strategic approach and deep knowledge of criminal law helped me win my case. Forever grateful for his support.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy-dark/90"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold text-golden mb-6">
            {typewriterText}
            <span className="animate-blink">|</span>
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 font-light">
            Expert Legal Solutions with Trust & Integrity
          </p>
          <Link
            to="/book-appointment"
            className="btn-golden inline-block"
          >
            Book Appointment
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-golden/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-golden rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-navy mb-4">
              Our Legal Services
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive legal solutions tailored to your needs with 8+ Years experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-navy text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up space-y-4">
              <img
                src={rajKumarShaPortrait}
                alt="Advocate Raj Kumar Sha"
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
              />
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <img
                  src={courtBuilding}
                  alt="Court Building"
                  className="rounded-lg shadow-lg w-full h-40 object-cover"
                />
                <img
                  src={rajKumarShaOffice}
                  alt="Advocate Raj Kumar Sha Office"
                  className="rounded-lg shadow-lg w-full h-40 object-cover"
                />
              </div>
            </div>

            <div className="animate-fade-in">
              <h2 className="text-4xl font-playfair font-bold text-golden mb-6">
                About Advocate Raj Kumar Sha
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Advocate Raj Kumar Sha, B.A. (Honours), L.L.B. (Honours), is a distinguished legal practitioner at Barrackpore Court with a reputation for excellence, integrity, and unwavering commitment to justice.
              </p>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Specializing in Criminal Cases, Civil Matters, Family Disputes, DRT/LRT, and more, he has successfully represented numerous clients, earning their trust through strategic legal acumen and a compassionate approach.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start space-x-3">
                  <Award className="h-6 w-6 text-golden flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">8+ Years Experience</h3>
                    <p className="text-sm text-gray-400">Proven track record of success</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-golden flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Several Cases Won</h3>
                    <p className="text-sm text-gray-400">Delivering favorable outcomes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-golden flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Client-Focused</h3>
                    <p className="text-sm text-gray-400">Your case, our priority</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-6 w-6 text-golden flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Available Support</h3>
                    <p className="text-sm text-gray-400">Always here when you need legal support</p>
                  </div>
                </div>
              </div>

              <Link to="/book-appointment" className="btn-outline-golden inline-block">
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-navy mb-4">
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground text-lg">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-navy via-navy-dark to-navy text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
            Need Legal Assistance?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Schedule a consultation today and let us help you navigate your legal challenges
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book-appointment" className="btn-golden">
              Book Appointment
            </Link>
            <Link to="/contact" className="btn-outline-golden">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
