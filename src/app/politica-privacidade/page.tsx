import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Política de Privacidade",
  description: "Política de Privacidade e proteção de dados pessoais da C&Q Finanças & Soluções.",
  path: "/politica-privacidade",
});

export default function PoliticaPrivacidadePage() {
  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ label: "Política de Privacidade", href: "/politica-privacidade" }]} />
      <Container className="max-w-3xl py-14 sm:py-20">
        <h1 className="text-3xl font-bold text-navy-950">Política de Privacidade</h1>
        <p className="mt-2 text-sm text-navy-400">Data de alteração: 21/06/2026</p>

        <div className="prose prose-navy mt-8 max-w-none space-y-6 text-navy-600">
          <section>
            <h2 className="text-xl font-semibold text-navy-950">1. Informação relativa à atividade de intermediário de crédito</h2>
            <p className="mt-2 leading-relaxed">
              Empresa: {siteConfig.name}, Lda
              <br />
              Sede: {siteConfig.contact.address.street}
              <br />
              NIPC: {siteConfig.banking.nipc}
              <br />
              Telefone: {siteConfig.contact.phoneDisplay}
              <br />
              E-mail: {siteConfig.contact.email}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">2. Informação sobre o tratamento</h2>
            <p className="mt-2 leading-relaxed">
              O Regulamento Geral sobre a Proteção de Dados (Regulamento (UE) 2016/679 do Parlamento
              Europeu e do Conselho de 27 de abril de 2016, &ldquo;RGPD&rdquo;) e a Lei n.º 58/2019, de 8
              de agosto, asseguram a proteção das pessoas singulares no que diz respeito ao tratamento de
              dados pessoais e à livre circulação desses dados.
            </p>
            <p className="mt-2 leading-relaxed">
              Nos termos legais consideram-se dados pessoais, qualquer &ldquo;informação relativa a uma
              pessoa singular identificada ou identificável (&apos;o titular dos dados&apos;); é
              considerada identificável uma pessoa singular que possa ser identificada, direta ou
              indiretamente, em especial por referência a um identificador, como por exemplo um nome, um
              número de identificação, dados de localização, identificadores por via eletrónica ou a um ou
              mais elementos específicos da identidade física, fisiológica, genética, mental, económica,
              cultural ou social dessa pessoa singular&rdquo;.
            </p>
            <p className="mt-2 leading-relaxed">
              Os dados pessoais fornecidos pelo utilizador serão incluídos num ficheiro da responsabilidade
              da {siteConfig.name}, Lda, cujo tratamento será realizado nos termos da legislação sobre
              proteção de dados pessoais, sendo aplicadas as medidas de segurança técnicas e
              organizativas adequadas.
            </p>
            <p className="mt-2 leading-relaxed">
              A {siteConfig.name}, Lda mantém uma base de dados com o registo dos seus clientes composta
              apenas pelos dados pessoais fornecidos pelo próprio titular dos dados, sendo estes recolhidos
              e tratados automaticamente pela {siteConfig.name}, Lda, entidade responsável pelo tratamento
              de dados pessoais.
            </p>
            <p className="mt-2 leading-relaxed">
              Em caso algum serão solicitados dados pessoais sobre a origem racial ou étnica, opiniões
              políticas, convicções religiosas ou filosóficas, filiação sindical, dados relativos à saúde,
              dados genéticos, biométricos ou dados relativos à vida sexual ou orientação sexual.
            </p>
            <p className="mt-2 leading-relaxed">
              Em caso algum a {siteConfig.name}, Lda realizará qualquer uma das seguintes atividades com
              os dados pessoais facultados através deste site, sem o consentimento prévio expresso do
              titular dos dados:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed">
              <li>Ceder a outras pessoas ou outras entidades;</li>
              <li>Transferir para fora do Espaço Económico Europeu (EEE).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">3. Finalidades do tratamento de dados pessoais</h2>
            <p className="mt-2 leading-relaxed">
              Os dados pessoais tratados através desta página serão unicamente utilizados para as
              seguintes finalidades:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed">
              <li>
                Permitir a atuação da {siteConfig.name}, Lda como intermediário de crédito para proceder
                à recolha de dados para proposta de crédito junto de instituições de crédito. Esta
                recolha é necessária para diligências pré-contratuais ou contratuais a pedido do titular
                dos dados;
              </li>
              <li>
                Identificar os serviços que melhor se aplicam ao caso concreto do utilizador, adequando-os
                e limitando-os ao necessário. Esta recolha é necessária para diligências pré-contratuais
                ou contratuais a pedido do titular dos dados;
              </li>
              <li>
                Atividades de análise estatística, compatíveis e limitadas ao interesse legítimo da{" "}
                {siteConfig.name}, Lda no âmbito da sua atividade comercial;
              </li>
              <li>
                Marketing, com base no fundamento legal de interesse legítimo e através de envio de
                comunicações promocionais ou ações de marketing sobre produtos da {siteConfig.name}, Lda
                análogos aos serviços e produtos anteriormente solicitados e tomando em conta as
                expetativas razoáveis dos titulares dos dados. O titular dos dados pode solicitar a sua
                remoção, a qualquer momento.
              </li>
            </ul>
            <p className="mt-2 leading-relaxed">
              A {siteConfig.name}, Lda garante a confidencialidade de todos os dados fornecidos, procedendo
              à recolha e ao tratamento de dados de forma segura, que impede a sua perda ou manipulação,
              utilizando as técnicas mais adequadas para o efeito.
            </p>
            <p className="mt-2 leading-relaxed">
              A falta de resposta aos dados assinalados como obrigatórios implica a impossibilidade de dar
              resposta à solicitação do titular dos dados.
            </p>
            <p className="mt-2 leading-relaxed">
              Os dados são conservados durante o tempo necessário para as finalidades para os quais foram
              recolhidos, para o cumprimento de prazos legais de conservação e até à extinção de eventuais
              responsabilidades do responsável pelo tratamento.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">4. Medidas de Segurança</h2>
            <p className="mt-2 leading-relaxed">
              A {siteConfig.name}, Lda implementou e continuará a implementar as medidas de segurança de
              natureza técnica e organizativa necessárias para garantir a segurança dos dados pessoais que
              lhe sejam fornecidos, visando evitar a sua alteração, perda, tratamento e/ou acesso não
              autorizado, tendo em conta o estado atual da tecnologia, a natureza dos dados armazenados e
              os riscos a que estão expostos.
            </p>
            <p className="mt-2 leading-relaxed">
              Sempre que aceder a dados pessoais, a {siteConfig.name}, Lda compromete-se a:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed">
              <li>
                Armazená-los por intermédio de medidas de segurança, legalmente exigíveis, de natureza
                técnica e organizativa, que garantam a sua segurança, evitando assim a alteração, perda,
                tratamento ou acesso não autorizado, em conformidade com o estado da tecnologia em cada
                momento, a natureza dos dados e os possíveis riscos a que estejam expostos;
              </li>
              <li>Utilizar os dados exclusivamente para as finalidades previamente definidas;</li>
              <li>
                Certificar-se que os dados são tratados unicamente pelos colaboradores cuja intervenção
                seja necessária para satisfazer a solicitação do titular dos dados, estando os mesmos
                obrigados ao dever de sigilo e de confidencialidade. Existindo a possibilidade de a
                informação ser transmitida a terceiros para os referidos fins, estes são obrigados a
                guardar a devida confidencialidade.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">5. Exercício dos Direitos</h2>
            <p className="mt-2 leading-relaxed">
              De acordo com o RGPD e a Lei n.º 58/2019, de 8 de agosto, o utilizador pode exercer a todo o
              tempo os seus direitos de informação, acesso, retificação, apagamento, limitação,
              portabilidade e oposição, através de solicitação escrita dirigida à {siteConfig.name}, Lda
              pelos seguintes meios:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed">
              <li>Via postal para o endereço: {siteConfig.contact.address.street}</li>
              <li>
                Email para o endereço de correio eletrónico:{" "}
                <a href={`mailto:${siteConfig.contact.email}`} className="font-medium text-gold-600 hover:underline">
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">6. Autoridade de Controlo</h2>
            <p className="mt-2 leading-relaxed">
              O titular dos dados tem, ainda, o direito a apresentar reclamação na Comissão Nacional de
              Proteção de Dados (CNPD):{" "}
              <a
                href="https://www.cnpd.pt"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gold-600 hover:underline"
              >
                www.cnpd.pt
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
