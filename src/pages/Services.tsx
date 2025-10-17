import { Scale, FileText, Users, Building2, Home, ShoppingCart, Briefcase, Calculator } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: Scale,
      title: "Criminal Cases",
      description: "Expert defense in criminal cases including sessions trials, bail applications, anticipatory bail, and quashing petitions.",
      details: [
        "Sessions Court Trials",
        "Bail Applications",
        "Anticipatory Bail",
        "Quashing Petitions",
        "Criminal Appeals",
        "FIR Quashing"
      ],
      gradient: "from-red-500/10 to-orange-500/10",
      iconColor: "text-red-600"
    },
    {
      icon: FileText,
      title: "Civil Matters",
      description: "Comprehensive civil litigation services for property disputes, contract matters, and civil suits.",
      details: [
        "Property Disputes",
        "Contract Disputes",
        "Partition Suits",
        "Injunction Applications",
        "Money Recovery",
        "Specific Performance"
      ],
      gradient: "from-blue-500/10 to-cyan-500/10",
      iconColor: "text-blue-600"
    },
    {
      icon: Users,
      title: "Family Law",
      description: "Sensitive handling of family disputes including child custody and domestic violence cases.",
      details: [
        "Divorce Proceedings",
        "Child Custody",
        "Alimony & Maintenance",
        "Domestic Violence Cases",
        "Adoption",
        "Guardianship Matters"
      ],
      gradient: "from-pink-500/10 to-rose-500/10",
      iconColor: "text-pink-600"
    },
    {
      icon: Building2,
      title: "DRT & LRT",
      description: "Handling and resolving disputes related to cases under the Debt Recovery Tribunal and Land Recovery Tribunal.",
      details: [
        "Debt Recovery Matters",
        "Land Recovery Cases",
        "Loan Recovery",
        "Tribunal Representation",
        "Recovery Proceedings",
        "Appeals & Revisions"
      ],
      gradient: "from-purple-500/10 to-violet-500/10",
      iconColor: "text-purple-600"
    },
    {
      icon: Home,
      title: "Property Law",
      description: "Expert assistance in property transactions, documentation, and dispute resolution.",
      details: [
        "Property Registration / Land Registration",
        "Property Disputes",
        "Lease Agreements"
      ],
      gradient: "from-green-500/10 to-emerald-500/10",
      iconColor: "text-green-600"
    },
    {
      icon: ShoppingCart,
      title: "Consumer Law",
      description: "Protection of consumer rights and representation in consumer disputes.",
      details: [
        "Consumer Complaint Cases",
        "Product Liability",
        "Unfair Trade Practices",
        "Service Deficiency",
        "E-commerce Disputes",
        "Consumer Forum Representation"
      ],
      gradient: "from-yellow-500/10 to-amber-500/10",
      iconColor: "text-yellow-600"
    },
    {
      icon: Briefcase,
      title: "Labour & Employment Disputes",
      description: "Comprehensive legal support for employment-related matters and workplace disputes.",
      details: [
        "Employment Disputes",
        "Wrongful Termination",
        "Workplace Harassment",
        "Labour Law Compliance",
        "Industrial Disputes",
        "Service Matters"
      ],
      gradient: "from-indigo-500/10 to-blue-500/10",
      iconColor: "text-indigo-600"
    },
    {
      icon: Calculator,
      title: "Tax Law",
      description: "Expert guidance on tax matters, appeals, and compliance issues.",
      details: [
        "Income Tax Appeals",
        "GST Matters",
        "Tax Planning",
        "Tax Litigation",
        "Tax Compliance",
        "Assessment Proceedings"
      ],
      gradient: "from-teal-500/10 to-cyan-500/10",
      iconColor: "text-teal-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-navy mb-4">
            Our Legal Services
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive legal solutions tailored to your needs with 8+ Years experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br ${service.gradient} border-2 border-transparent hover:border-golden/20`}
              >
                <CardHeader>
                  <div className={`w-14 h-14 rounded-lg bg-background flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-7 w-7 ${service.iconColor}`} />
                  </div>
                  <CardTitle className="text-navy group-hover:text-golden transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-golden mt-1">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="card-elegant p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-playfair font-bold text-navy mb-4">
              Need Legal Assistance?
            </h2>
            <p className="text-muted-foreground mb-6">
              Contact Advocate Raj Kumar Sha for expert legal representation and guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:8013763607"
                className="btn-golden inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Call: 8013763607
              </a>
              <a
                href="tel:9143175368"
                className="btn-outline inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Call: 9143175368
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
