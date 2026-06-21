import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Termos e Condições",
  description: "Termos e Condições de utilização do website da C&Q Finanças & Soluções.",
  path: "/termos",
});

export default function TermosPage() {
  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ label: "Termos e Condições", href: "/termos" }]} />
      <Container className="max-w-3xl py-14 sm:py-20">
        <h1 className="text-3xl font-bold text-navy-950">Termos e Condições</h1>
        <p className="mt-2 text-sm text-navy-400">Data de alteração: 21/06/2026</p>

        <div className="prose prose-navy mt-8 max-w-none space-y-6 text-navy-600">
          <section>
            <h2 className="text-xl font-semibold text-navy-950">1. Informação relativa à atividade de intermediário de crédito</h2>
            <p className="mt-2 leading-relaxed">
              Denominação do intermediário de crédito: &ldquo;{siteConfig.name}, Lda&rdquo;
              <br />
              Sede: {siteConfig.contact.address.street}
              <br />
              NIPC: {siteConfig.banking.nipc}
              <br />
              Telefone: {siteConfig.contact.phoneDisplay}
              <br />
              E-mail: {siteConfig.contact.email}
            </p>
            <p className="mt-2 leading-relaxed">
              A {siteConfig.name}, Lda encontra-se registada como Intermediário de Crédito junto do Banco
              de Portugal sob o {siteConfig.banking.bdpRegistration}, registo que pode ser confirmado
              através da seguinte hiperligação:{" "}
              <a
                href={siteConfig.banking.bdpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gold-600 hover:underline"
              >
                {siteConfig.banking.bdpUrl}
              </a>
              .
            </p>
            <p className="mt-2 leading-relaxed">
              A {siteConfig.name}, Lda exerce a sua atividade como intermediário de crédito vinculado sem
              exclusividade.
            </p>
            <p className="mt-2 leading-relaxed">
              A {siteConfig.name}, Lda não concede crédito, exercendo a sua atividade como mero
              intermediário de crédito vinculado nos termos dispostos na lei, mantendo, para o efeito,
              contratos de vinculação com as seguintes entidades mutuantes:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed">
              {siteConfig.partners.map((partner) => (
                <li key={partner.name}>{partner.name}</li>
              ))}
            </ul>
            <p className="mt-2 leading-relaxed">
              A {siteConfig.name}, Lda está autorizada a prestar os seguintes serviços:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed">
              <li>Apresentação ou proposta de contratos de crédito a consumidores;</li>
              <li>
                Assistência a consumidores, mediante a realização de atos preparatórios ou de outros
                trabalhos de gestão pré-contratual relativamente a contratos de crédito que não tenham
                sido por si apresentados ou propostos;
              </li>
              <li>Serviços de consultoria.</li>
            </ul>
            <p className="mt-2 leading-relaxed">
              Responsabilidade civil: a entidade que garante a responsabilidade civil pela atividade de
              intermediação de crédito da {siteConfig.name}, Lda é a Zurich Insurance Europe AG, Sucursal
              em Portugal com a apólice nº 010033277 e 010032971 válidas de 16/06/2026 até 16/06/2027 e de
              12/06/2026 até 12/06/2027.
            </p>
            <p className="mt-2 leading-relaxed">
              Não existe qualquer encargo a suportar pelos consumidores pelos serviços prestados pela{" "}
              {siteConfig.name}, Lda.
            </p>
            <p className="mt-2 leading-relaxed">
              Está vedada à {siteConfig.name}, Lda a possibilidade de receber ou entregar quaisquer valores
              relacionados com a formação, execução e cumprimento antecipado dos contratos de crédito.
            </p>
            <p className="mt-2 leading-relaxed">
              A atividade de intermediação de crédito desenvolvida pela {siteConfig.name}, Lda está
              sujeita à supervisão do Banco de Portugal e à legislação aplicável, nomeadamente ao regime
              jurídico que define os requisitos de acesso e de exercício da atividade de intermediário de
              crédito e da prestação de serviços de consultoria relativamente a contratos de crédito
              estabelecido no Decreto-Lei n.º 81-C/2017, de 7 de julho.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">2. Introdução</h2>
            <p className="mt-2 leading-relaxed">
              Os presentes Termos e Condições de Utilização (doravante, &ldquo;Termos e
              Condições&rdquo;) regulam o acesso e utilização do website e simulador (doravante
              designados por &ldquo;Websites&rdquo;) da {siteConfig.name}, Lda, assim como as condições
              dos serviços de intermediação de crédito nestes divulgados e disponibilizados.
            </p>
            <p className="mt-2 leading-relaxed">
              Os Termos e Condições consagram os direitos e obrigações do utilizador e da{" "}
              {siteConfig.name}, Lda no que diz respeito à utilização dos Websites e aos serviços de
              intermediação de crédito disponibilizados através do mesmo.
            </p>
            <p className="mt-2 leading-relaxed">
              A navegação nos Websites, bem como o recurso aos serviços de intermediação de crédito
              disponibilizados nos Websites, implica a aceitação dos presentes Termos e Condições pelo
              Utilizador.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">3. Uso dos Websites</h2>
            <p className="mt-2 leading-relaxed">
              O Utilizador compromete-se a utilizar os Websites da {siteConfig.name}, Lda em cumprimento
              com o disposto na lei, abstendo-se de toda e qualquer atividade que atente contra a lei,
              moral, bons costumes ou direitos de terceiros.
            </p>
            <p className="mt-2 leading-relaxed">
              Ao recorrer aos serviços prestados através dos Websites, o Utilizador declara que é maior
              de 18 (dezoito) anos de idade e que dispõe de capacidade legal para celebrar contratos.
            </p>
            <p className="mt-2 leading-relaxed">
              O Utilizador compromete-se a cumprir e a respeitar os Termos e Condições, nomeadamente:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed">
              <li>
                A abster-se de introduzir, armazenar ou difundir através dos Websites conteúdos
                difamatórios, obscenos, injuriosos, xenófobos e/ou de qualquer outra índole que violem o
                direito à reserva da intimidade da vida privada e familiar ou a propriedade intelectual
                de terceiros, bem como a disponibilização de qualquer informação que possa ser
                prejudicial para terceiros ou para o titular dos Websites;
              </li>
              <li>A não utilizar identidades falsas;</li>
              <li>
                A facultar os seus dados pessoais e, eventualmente, os de terceiros, de forma exata e
                atualizada de modo a que a {siteConfig.name}, Lda possa prestar os serviços solicitados;
              </li>
              <li>
                A guardar e não divulgar a sua palavra-passe de entrada na área de cliente por forma a
                impedir que terceiros acedam à sua conta.
              </li>
            </ul>
            <p className="mt-2 leading-relaxed">
              A {siteConfig.name}, Lda rejeita qualquer responsabilidade por eventual atraso ou
              impossibilidade de prestação do serviço solicitado, decorrente de erro ou insuficiência dos
              dados fornecidos pelo Utilizador.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">4. Serviços</h2>
            <p className="mt-2 leading-relaxed">
              Descrição dos serviços de intermediação de crédito da {siteConfig.name}, Lda:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed">
              <li>
                Informar o utilizador das características dos produtos financeiros oferecidos por
                terceiros para que possa tomar uma decisão adequada no momento da contratação;
              </li>
              <li>
                Oferecer informação personalizada depois de analisar e selecionar os produtos financeiros
                que melhor se adequam ao perfil do utilizador, de acordo com as características e
                necessidades que tenha introduzido no simulador da {siteConfig.name}, Lda e que poderão
                ser ampliadas e negociadas por telefone ou por qualquer outra forma de comunicação à
                distância;
              </li>
              <li>
                A {siteConfig.name}, Lda poderá atuar como intermediário financeiro por telefone ou por
                qualquer outra forma de comunicação à distância nos casos em que o serviço o exija,
                intermediando a relação entre a entidade de crédito e o utilizador e ajudando na
                realização dos trabalhos prévios de negociação e tramitação do produto a ser vendido.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">5. Comissões e Incentivos</h2>
            <p className="mt-2 leading-relaxed">
              A informação sobre os montantes recebidos pela {siteConfig.name}, Lda pela prestação dos
              serviços de intermediação de Crédito Habitação a título de comissões e outros incentivos
              será prestada na ficha de informação normalizada europeia (FINE) prevista na legislação
              aplicável àquele tipo de contratos de crédito.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">6. Política de Privacidade e de Cookies</h2>
            <p className="mt-2 leading-relaxed">
              A {siteConfig.name}, Lda respeita a privacidade do utilizador e a proteção dos seus dados
              pessoais. Toda e qualquer informação recolhida nos Websites será mantida confidencial e não
              será cedida a terceiros sem consentimento prévio expresso do utilizador.
            </p>
            <p className="mt-2 leading-relaxed">
              Os dados disponibilizados pelo utilizador serão tratados exclusivamente para prestar os
              serviços solicitados pelo utilizador e melhorar a sua experiência nos Websites, cfr.{" "}
              <a href="/politica-privacidade" className="font-medium text-gold-600 hover:underline">
                Política de Privacidade
              </a>{" "}
              e Política de Cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">7. Propriedade Intelectual</h2>
            <p className="mt-2 leading-relaxed">
              Todos os textos, comentários, trabalhos, ilustrações, obras e imagens reproduzidos ou
              representados nos Websites encontram-se devidamente protegidos pelo direito de autor e são
              propriedade da {siteConfig.name}, Lda. Nos termos do Código do Direito de Autor e dos
              Direitos Conexos (CDADC), apenas será autorizada a sua utilização para fins privados, sem
              prejuízo de disposições mais restritivas constantes do mencionado Código. Qualquer
              reprodução ou representação total ou parcial dos Websites ou de todo ou parte dos elementos
              incluídos no mesmo é estritamente proibida, sob pena de recurso aos meios legais
              competentes.
            </p>
            <p className="mt-2 leading-relaxed">
              As denominações sociais, marcas, bem como quaisquer sinais distintivos reproduzidos nos
              Websites encontram-se protegidos nos termos das disposições legais aplicáveis à propriedade
              industrial e são propriedade da {siteConfig.name}, Lda. A reprodução ou representação de
              todo ou parte desses sinais distintivos é estritamente proibida e deve ser objeto de uma
              autorização escrita prévia da {siteConfig.name}, Lda.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">8. Comunicações</h2>
            <p className="mt-2 leading-relaxed">
              Ao utilizar os Websites o utilizador aceita expressamente que a comunicação com a{" "}
              {siteConfig.name}, Lda revista a forma eletrónica ou outro meio de comunicação à distância,
              satisfazendo a exigência legal para comunicações sujeitas a forma escrita.
            </p>
            <p className="mt-2 leading-relaxed">
              As comunicações serão realizadas entre as partes através dos contactos constantes nos
              presentes Termos e Condições no momento da celebração do contrato.
            </p>
            <p className="mt-2 leading-relaxed">
              Qualquer comunicação será tida por recebida quando for inserida no Website, 24 (vinte e
              quatro) horas após o envio de um email. Para prova do envio de uma comunicação, basta provar
              que o mesmo email foi enviado para o endereço de email indicado pelo utilizador.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">9. Responsabilidade e Exclusões</h2>
            <p className="mt-2 leading-relaxed">
              A {siteConfig.name}, Lda não é responsável por eventuais prejuízos decorrentes de
              interferências, interrupções, vírus informáticos, avarias ou desconexões do sistema
              operativo que possam impedir temporariamente o acesso, a navegação ou a prestação de
              serviços ao utilizador.
            </p>
            <p className="mt-2 leading-relaxed">
              A {siteConfig.name}, Lda pode, a qualquer momento e de acordo com a sua vontade, alterar,
              adicionar ou eliminar qualquer um dos Termos e Condições previstos. Recomendamos que visite
              periodicamente a página para ver se foram efetuadas quaisquer atualizações. Pode
              descontinuar, a qualquer momento e de acordo com a sua vontade, o website sem aviso prévio.
            </p>
            <p className="mt-2 leading-relaxed">
              A {siteConfig.name}, Lda realiza todos os esforços para assegurar que a informação dos seus
              Websites se encontra exata e atualizada e para retificar quaisquer erros ou omissões logo
              que seja possível quando comunicados.
            </p>
            <p className="mt-2 leading-relaxed">
              O simulador da {siteConfig.name}, Lda recorre a informação proveniente de terceiros ou por
              si inserida no simulador, pelo que qualquer responsabilização por eventuais imprecisões,
              erros, omissões, informação incompleta ou desatualizada, ou dados inexatos existentes no
              resultado apresentado pelo simulador, não poderá ser imputada à {siteConfig.name}, Lda.
            </p>
            <p className="mt-2 leading-relaxed">
              No caso de se verificarem eventuais discrepâncias, prevalecem as informações disponibilizadas
              pelas instituições ou agentes financeiros.
            </p>
            <p className="mt-2 leading-relaxed">
              A {siteConfig.name}, Lda não possui qualquer responsabilidade por perdas ou danos decorrentes
              da incapacidade de aceder aos Websites e por qualquer uso do mesmo que está além do seu
              controlo. Tal inclui qualquer perda de poupanças que o utilizador espera fazer, serviços,
              oportunidades de negócio, lucros ou receitas ou qualquer perda ou dano que possa sofrer ou
              incorrer relacionados com a utilização dos Websites.
            </p>
            <p className="mt-2 leading-relaxed">
              Se o utilizador solicitar e adquirir alguma proposta indicada nos Websites, entrará em
              contacto com um terceiro que lhe irá fornecer o produto ou serviço pretendido, nos seus
              próprios termos e condições. É da inteira responsabilidade do utilizador confirmar que
              concorda com esses termos e condições antes de celebrar um contrato para adquirir esse
              produto ou serviço.
            </p>
            <p className="mt-2 leading-relaxed">
              A utilização de qualquer website de terceiros é regulada pelos termos e condições e pela
              política de privacidade desse mesmo website, isentando a {siteConfig.name}, Lda de qualquer
              responsabilidade proveniente dessa utilização.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">10. Redução</h2>
            <p className="mt-2 leading-relaxed">
              A declaração de invalidade, ilegalidade ou ineficácia, por autoridade competente, de
              qualquer uma das disposições dos presentes Termos e Condições não afetará nenhuma das
              restantes disposições, que continuarão em pleno vigor.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">11. Reclamações</h2>
            <p className="mt-2 leading-relaxed">
              A apresentação de qualquer reclamação no âmbito da atividade de intermediação de crédito
              poderá ser endereçada:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed">
              <li>
                À {siteConfig.name}, Lda, através do preenchimento do livro de reclamações em formato
                físico disponível na sede ou em formato eletrónico disponível em{" "}
                <a
                  href="https://www.livroreclamacoes.pt/Inicio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gold-600 hover:underline"
                >
                  www.livroreclamacoes.pt
                </a>
                ;
              </li>
              <li>
                Diretamente ao Banco de Portugal, através de correio eletrónico, de carta ou formulário
                disponível no Portal do Cliente Bancário, em{" "}
                <a
                  href="https://www.clientebancario.bportugal.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gold-600 hover:underline"
                >
                  www.clientebancario.bportugal.pt
                </a>
                .
              </li>
            </ul>
            <p className="mt-2 leading-relaxed">
              Qualquer que seja o canal que utilize para apresentar a sua reclamação, o utilizador deve
              inserir os seus dados, identificar a entidade em causa e descrever, de forma clara e exata,
              os factos que justificam a reclamação.
            </p>
            <p className="mt-2 leading-relaxed">A apresentação de reclamações não tem custos para o utilizador.</p>
            <p className="mt-2 leading-relaxed">
              O Banco de Portugal analisa todas as reclamações que lhe sejam remetidas, independentemente
              de as mesmas terem sido apresentadas no livro de reclamações da instituição visada, no livro
              de reclamações eletrónico, ou enviadas diretamente ao Banco de Portugal através do Portal do
              Cliente Bancário.
            </p>
            <p className="mt-2 leading-relaxed">
              O utilizador deve dirigir a sua queixa/reclamação diretamente à entidade mutuante
              responsável pelo produto ou serviço no caso de esta estar relacionada com a aquisição de
              algum serviço intermediado através dos Websites.
            </p>
            <p className="mt-2 leading-relaxed">
              A {siteConfig.name}, Lda não pode responder a reclamações relativas a produtos ou serviços
              das entidades mutuantes nem é responsável por quaisquer queixas/reclamações dessa natureza.
            </p>
            <p className="mt-2 leading-relaxed">
              Recomenda-se ao utilizador que visite o website correspondente ao fornecedor do produto ou
              serviço se desejar realizar alguma reclamação contra esse fornecedor.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-950">
              12. Legislação Aplicável e Resolução Alternativa de Litígios
            </h2>
            <p className="mt-2 leading-relaxed">
              Os contratos de prestação de serviços celebrados através dos Websites são regulados pela
              Lei Portuguesa.
            </p>
            <p className="mt-2 leading-relaxed">
              Qualquer litígio resultante ou relacionado com esses contratos está sujeito à jurisdição
              exclusiva dos tribunais Portugueses.
            </p>
            <p className="mt-2 leading-relaxed">
              A {siteConfig.name}, Lda aderiu aos seguintes meios de resolução alternativa de litígios:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed">
              <li>
                Centro Nacional de Informação e Arbitragem de Conflitos de Consumo - CNIACC:{" "}
                <a
                  href="https://www.cniacc.pt/pt/pedido-adesao-plena-de-empresas-ao-cniacc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gold-600 hover:underline"
                >
                  www.cniacc.pt
                </a>
              </li>
              <li>
                Centro de Arbitragem de Conflitos de Consumo de Lisboa – CACCL:{" "}
                <a
                  href="https://www.centroarbitragemlisboa.pt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gold-600 hover:underline"
                >
                  www.centroarbitragemlisboa.pt
                </a>
              </li>
            </ul>
            <p className="mt-2 leading-relaxed">
              Neste sentido, se os serviços forem concluídos através dos Websites, informa-se, de acordo
              com o Regulamento n.º 524/2013 do Parlamento Europeu e do Conselho de 21 de maio de 2013,
              que tem a faculdade de resolver qualquer litígio de forma extrajudicial através do acesso à
              plataforma eletrónica de resolução de conflitos em linha, através do endereço eletrónico{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gold-600 hover:underline"
              >
                ec.europa.eu/consumers/odr/
              </a>
              .
            </p>
            <p className="mt-2 leading-relaxed">
              Pode consultar a lista atualizada das Entidades de Resolução Alternativa de Litígios
              disponíveis ao abrigo do artigo 17.º da Lei n.º 144/2015, de 8 de setembro, no Portal do
              Consumidor, através do seguinte website{" "}
              <a
                href="https://www.consumidor.pt"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gold-600 hover:underline"
              >
                www.consumidor.pt
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
