export interface TeamMember {
  slug: string;
  name: string;
  title: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  photo: string;
  location: string;
}

export const team: TeamMember[] = [
  {
    slug: "miguel",
    name: "Miguel",
    title: "Intermediário de Crédito · Gerente",
    phone: "+351927144425",
    phoneDisplay: "927 144 425",
    whatsapp: "351927144425",
    email: "geral@cqfinancas.com",
    photo: "/images/team/miguel.jpg",
    location: "Elvas · Online a nível nacional e ilhas",
  },
  {
    slug: "daniel",
    name: "Daniel",
    title: "Intermediário de Crédito · Gerente",
    phone: "+351963133551",
    phoneDisplay: "963 133 551",
    whatsapp: "351963133551",
    email: "geral@cqfinancas.com",
    photo: "/images/team/daniel.jpg",
    location: "Elvas · Online a nível nacional e ilhas",
  },
];

export function getTeamMember(slug: string): TeamMember | undefined {
  return team.find((m) => m.slug === slug);
}
