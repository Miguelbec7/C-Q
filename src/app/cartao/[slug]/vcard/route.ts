import { NextResponse } from "next/server";
import { getTeamMember } from "@/lib/data/team";

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = getTeamMember(slug);

  if (!member) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${member.name}`,
    `N:;${member.name};;;`,
    "ORG:C&Q Finanças & Soluções",
    `TITLE:${member.title}`,
    `TEL;TYPE=CELL,VOICE:${member.phone}`,
    `EMAIL;TYPE=WORK:${member.email}`,
    "URL:https://cqfinancassolucoes.com",
    "ADR;TYPE=WORK:;;Rua Dom Augusto Eduardo Nunes n.º 51;Elvas;;7350-128;Portugal",
    "END:VCARD",
  ].join("\r\n");

  return new NextResponse(vcard, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${member.slug}.vcf"`,
    },
  });
}
