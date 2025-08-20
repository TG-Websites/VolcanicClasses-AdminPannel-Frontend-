// types.ts
export interface CourseFormValues {
  title: string;
  slug: string;
  category: string;
  subtitle: string;
  description: string;
  duration: string;
  successRate: number;
  qualifiedCount: string;
  yearsOfExcellence: number ;
  bannerImageUrl: File | null |string;
  floatingHighlights: string[];
  examPattern: {
    questionFormat: string;
    duration: string;
    markingSystem: string;
  };
  topicBreakdown: Array<{
    topic: string;
    percentage: number | '';
  }>;
  programs: Array<{
    mode: string;
    title: string;
    description: string;
    price: number ;
    priceLabel: string;
    features: string[];
  }>;
  whyChooseUs: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  topicCoverage: Array<{
    title: string;
    description: string;
  }>;
  faculty: Array<{
    name: string;
    designation: string;
    bio: string;
    expertise: string[];
    photoUrl: File | null | string;
  }>;
  testimonials: Array<{
    name: string;
    scoreSummary: string;
    subjectScore: string;
    quote: string;
    photoUrl: File | null | string;
  }>;
  showTrialButton: boolean;
  showBrochureButton: boolean;
  brochureUrl: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  isPublished: boolean;
}