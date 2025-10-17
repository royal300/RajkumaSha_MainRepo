import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ServiceCard = ({ icon: Icon, title, description }: ServiceCardProps) => {
  return (
    <div className="card-elegant p-8 group cursor-pointer">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-4 bg-golden/10 rounded-full group-hover:bg-golden/20 transition-colors">
          <Icon className="h-12 w-12 text-golden group-hover:scale-110 transition-transform" />
        </div>
        <h3 className="text-xl font-playfair font-semibold text-navy">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
