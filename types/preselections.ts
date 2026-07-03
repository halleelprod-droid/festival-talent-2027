export type PreselectionCandidate = {
  id: string;
  full_name: string;
  phone: string;
  email?: string | null;
  age?: number | null;
  city: string;
  discipline: string;
  experience?: string | null;
  portfolio_link?: string | null;
  message?: string | null;
  created_at: string;
};

export type PreselectionAggregate = {
  label: string;
  count: number;
};
