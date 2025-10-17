import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  case: string;
  rating: number;
  content: string;
}

const TestimonialCard = ({ name, case: caseType, rating, content }: TestimonialCardProps) => {
  return (
    <div className="card-elegant p-8">
      <div className="flex mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="h-5 w-5 text-golden fill-golden" />
        ))}
      </div>
      <p className="text-muted-foreground italic mb-6 leading-relaxed">
        "{content}"
      </p>
      <div>
        <h4 className="font-semibold text-navy">{name}</h4>
        <p className="text-sm text-muted-foreground">{caseType}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
