"use client";

/**
 * Carregamento condicional de scripts de analítica/marketing.
 * Só injeta os scripts depois de consentimento de cookies e quando os IDs
 * estiverem definidos em variáveis de ambiente (preparado para integração futura):
 *   NEXT_PUBLIC_GA_ID, NEXT_PUBLIC_GTM_ID, NEXT_PUBLIC_META_PIXEL_ID
 */
import { useEffect, useState } from "react";
import Script from "next/script";
import { siteConfig } from "@/lib/site-config";
import { getCookieConsent } from "@/components/widgets/CookieBanner";

export function AnalyticsScripts() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(getCookieConsent() === "accepted");

    function handleConsent(event: Event) {
      const detail = (event as CustomEvent<string>).detail;
      setConsented(detail === "accepted");
    }

    window.addEventListener("cq-cookie-consent", handleConsent);
    return () => window.removeEventListener("cq-cookie-consent", handleConsent);
  }, []);

  const { googleAnalyticsId, googleTagManagerId, metaPixelId } = siteConfig.integrations;

  if (!consented) return null;

  return (
    <>
      {googleTagManagerId && (
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${googleTagManagerId}');
          `}
        </Script>
      )}

      {googleAnalyticsId && !googleTagManagerId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}');
            `}
          </Script>
        </>
      )}

      {metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}
