/* Kavéra Aesthetics — shared config, translations and helpers */
window.KV = (function () {
  // ===== EDIT THESE =====
  const CONFIG = {
    whatsapp: '529841318637',                 // Kavéra WhatsApp: +52 984 131 8637
    calendly: 'https://calendly.com/YOUR-LINK',
    instagram: 'https://www.instagram.com/kavera.aesthetics/',
    // Instagram posts shown on the homepage (newest first). Copy the code from the post link: instagram.com/reel/<CODE>/
    // Featured post shown big in a phone frame near the top (seasonal). Set to null to hide.
    featuredPost: 'reel/DeaD133IZvK',
    instagramPosts: ['p/DeksOWnx7z4', 'reel/DZT5zoLN5dT', 'reel/DZJqM9QN-wq', 'reel/DYtJ3s2NNWG', 'reel/DYku_VERDLT', 'p/DW4tGhbEUZG', 'p/DWhXIHFEUg5', 'reel/DWR4cnuAZBQ', 'p/DJzjFj4RK9H', 'reel/DHMh3JkxnOS', 'p/DB7S4hExlXm'],
    hours: ['10:00', '11:30', '13:00', '15:00', '16:30', '18:00'],
    discount: '[X]'
  };
  // ======================

  // ===== PRICE LIST (MXN) — from her official list, Oct 2026 =====
  const LASH_ES = [['Clásicas', '$500'], ['Rímel', '$550'], ['Tecnológicas 3D/5D', '$600'], ['Efecto Aura', '$600'], ['Efecto hawaiano', '$600'], ['Volumen 8D', '$650'], ['Efecto delineado', '$650'], ['Efecto wispy', '$700'], ['Lifting de pestañas', '$350'], ['Retoque', '$450'], ['Retiro de pestañas', '$100']];
  const LASH_EN = [['Classic', '$500'], ['Mascara effect', '$550'], ['Tech 3D/5D', '$600'], ['Aura effect', '$600'], ['Hawaiian effect', '$600'], ['Volume 8D', '$650'], ['Eyeliner effect', '$650'], ['Wispy effect', '$700'], ['Lash lift', '$350'], ['Refill', '$450'], ['Lash removal', '$100']];
  const BROW_ES = [['Laminado', '$150'], ['Laminado + limpieza', '$200'], ['Limpieza y perfilación', 'Consultar']];
  const BROW_EN = [['Lamination', '$150'], ['Lamination + cleanup', '$200'], ['Cleanup & shaping', 'Ask us']];
  const FACIAL_ES = [['Limpieza profunda', '$500'], ['Control acné', '$600'], ['Detox', '$600'], ['Profunda premium', '$650'], ['Hidratante', '$650']];
  const FACIAL_EN = [['Deep cleansing', '$500'], ['Acne control', '$600'], ['Detox', '$600'], ['Premium deep cleansing', '$650'], ['Hydrating', '$650']];
  // ================================================================

  const T = {
    es: {
      navScenes: 'Tratamientos', navServices: 'Precios', navFaq: 'Preguntas', navBook: 'Reservar',
      eyebrow: 'Estética · Quintana Roo',
      h1a: 'Tu belleza,', h1b: 'en su versión más pura.',
      heroSub: 'Pestañas, faciales, keratina y cejas con un toque delicado y profesional. Un espacio pensado para que te sientas consentida desde que llegas.',
      ctaBook: 'Agendar cita', ctaWa: 'Escríbenos por WhatsApp',
      trust1: 'Atención personalizada', trust2: 'Productos premium', trust3: 'Citas en minutos',
      badge: 'RESERVA TU CITA · KAVÉRA · RESERVA TU CITA · KAVÉRA ·', badgeAria: 'Reservar tu cita',
      m1: 'Pestañas', m2: 'Faciales', m3: 'Keratina', m4: 'Laminado de cejas',
      scEyebrow: 'Tratamientos', scA: 'Mira la magia', scB: 'suceder.', scBook: 'Reservar',
      scFacial: 'Limpieza, mascarilla e hidratación para una piel que brilla.',
      scHair: 'Adiós frizz: cabello liso, suave y con brillo por semanas.',
      scLash: 'Pestaña por pestaña, una mirada que despierta lista.',
      scBrow: 'Cejas peinadas hacia arriba, definidas y fijas.',
      svcEyebrow: 'Servicios y precios', svcTitle: 'Rituales para resaltar lo que ya eres.',
      svcSub: 'Elige tu tratamiento y reserva en línea o por WhatsApp. Te confirmamos el horario al instante.',
      bookThis: 'Reservar',
      howEyebrow: 'Cómo reservar', howTitle: 'Tu cita en cuatro pasos.',
      offerEyebrow: 'Primera visita', offerTitle: '% de descuento en tu primera cita', offerSub: 'Menciónalo al reservar. [CONDICIONES]', offerBtn: 'Quiero mi descuento',
      subEyebrow: 'Promociones', subTitle: 'Sé la primera en enterarte.', subSub: 'Recibe promociones, lugares libres de la semana y novedades de Kavéra por correo o WhatsApp. Sin spam: te das de baja cuando quieras.', subName: 'Tu nombre', subEmail: 'Correo', subWa: 'WhatsApp', subOptEmail: 'Quiero recibir promociones por correo', subOptWa: 'Quiero recibir promociones por WhatsApp', subLegal: 'Al suscribirte aceptas nuestro', subLegalLink: 'aviso de privacidad', subBtn: 'Suscribirme', subOk: '¡Listo! Ya estás en la lista 💕', subNeed: 'Escribe tu correo o tu WhatsApp y marca al menos una opción.', subErr: 'No se pudo guardar. Intenta de nuevo o escríbenos por WhatsApp.', subWaMsg: 'Hola Kavéra, quiero recibir promociones.',
      featEyebrow: 'Temporada de Halloween 🎃', featTitle: 'Lo nuevo en Kavéra.', featSub: 'Mira nuestro Reel de temporada y aparta tu cita para lucir increíble este Halloween y Día de Muertos.', igFollow: 'Síguenos @kavera.aesthetics',
      igEyebrow: 'Instagram', igTitle: 'Nuestro trabajo, en vivo.', igSub: 'Pestañas, keratina y cejas reales de nuestras clientas en Playa del Carmen. Por Karen Valero, cosmetóloga y lash artist.',
      revEyebrow: 'Clientas felices', revTitle: 'Lo que dicen de Kavéra.', revText: '[Pega aquí una reseña real de una clienta]', revWho: '[Nombre]',
      faqEyebrow: 'Preguntas frecuentes', faqTitle: 'Todo lo que quieres saber.',
      bookEyebrow: 'Reserva', bookTitle: 'Aparta tu momento.',
      bookSub: 'Elige servicio, día y hora en nuestra página de reservas, o mándanos un mensaje rápido y te ayudamos a encontrar el horario perfecto.',
      calBtn: 'Abrir página de reservas', calAlt: 'o agenda directo en Calendly',
      formTitle: 'Mensaje rápido por WhatsApp',
      fName: 'Tu nombre', fNamePh: 'Nombre y apellido',
      fService: 'Servicio', fPick: 'Elige un servicio', fDate: 'Día u horario preferido', fDatePh: 'Ej. sábado por la mañana',
      formBtn: 'Enviar por WhatsApp',
      footerLoc: 'Quintana Roo, México',
      waHello: 'Hola Kavéra, me gustaría agendar una cita.', waName: 'Nombre', waSvc: 'Servicio', waWhen: 'Horario preferido',
      services: [
        { id: 'lashes', num: 'i', name: 'Pestañas', sub: 'Extensiones, efectos y lifting', desc: 'Extensiones y lifting para una mirada intensa y natural. Muchos estilos y efectos a tu medida.', prices: LASH_ES },
        { id: 'facials', num: 'ii', name: 'Faciales', sub: 'Limpieza, detox e hidratación', desc: 'Limpieza profunda, control de acné, detox e hidratación. Tu piel, descansada y radiante.', prices: FACIAL_ES },
        { id: 'keratin', num: 'iii', name: 'Keratina', sub: 'Precio según largo', desc: 'Cabello liso, suave y sin frizz por semanas. El precio depende del largo.', prices: [['Cabello corto', 'desde $500'], ['Cabello largo', 'hasta $2,000']] },
        { id: 'brows', num: 'iv', name: 'Laminado de cejas', sub: 'Lifting y planchado', desc: 'Cejas peinadas, definidas y con más volumen. Un lifting que enmarca tu rostro.', prices: BROW_ES }
      ],
      bookOpts: { lashes: LASH_ES, facials: FACIAL_ES, keratin: [['Cabello corto', '$500'], ['Cabello largo', '$2,000']], brows: BROW_ES },
      steps: [['01', 'Elige tu servicio', 'Pestañas, faciales, keratina o cejas, con su opción y precio.'], ['02', 'Escoge día y hora', 'Ves los horarios disponibles y apartas el que te quede mejor.'], ['03', 'Deja tus datos', 'Solo tu nombre y WhatsApp, para confirmarte la cita.'], ['04', 'Recibe tu confirmación', 'Te escribimos por WhatsApp con la ubicación y los detalles.']],
      faq: [['¿Cómo agendo mi cita?', 'En nuestra página de reservas eliges servicio, día y hora, y nos dejas tu nombre y WhatsApp. También puedes escribirnos directo por WhatsApp.'], ['¿Dónde están ubicados?', 'En Quintana Roo. Te compartimos la ubicación exacta por WhatsApp al confirmar tu cita.'], ['¿Cuánto cuesta la keratina?', 'Depende del largo de tu cabello: desde $500 MXN en cabello corto hasta $2,000 MXN en cabello largo.'], ['¿Cómo puedo pagar?', '[MÉTODOS DE PAGO: efectivo, transferencia, tarjeta…]'], ['¿Puedo cambiar o cancelar mi cita?', 'Sí, avísanos por WhatsApp. [POLÍTICA DE CANCELACIÓN]']],
      // booking page
      bEyebrow: 'Reservar', bH1a: 'Aparta tu', bH1b: 'momento.', progressAria: 'Progreso de la reserva',
      bSteps: ['Servicio', 'Día y hora', 'Tus datos', 'Confirmar'],
      s1Title: '¿Qué te gustaría hacerte?', s1Opt: 'Elige una opción',
      s2Title: '¿Qué día te queda mejor?', s2Time: 'Horarios disponibles',
      s3Title: 'Tus datos', fPhonePh: '+52 …', fNotes: 'Notas (opcional)', fNotesPh: 'Alergias, estilo que te gusta, referencias…',
      s4Title: 'Revisa y confirma', s4Sub: 'Al confirmar se abre WhatsApp con tu solicitud lista para enviar. Te respondemos para confirmar tu cita.',
      s4Wa: 'Confirmar por WhatsApp', s4Cal: 'Prefiero agendar en Calendly',
      doneTitle: '¡Listo, ya casi!', doneSub: 'Envía el mensaje que se abrió en WhatsApp y te confirmamos tu cita con la ubicación y los detalles. ¡Te esperamos!', doneHome: 'Volver al inicio', doneAgain: 'Hacer otra reserva',
      back: 'Atrás', next: 'Continuar',
      sumEyebrow: 'Tu cita', kSvc: 'Servicio', kOpt: 'Opción', kPrice: 'Precio', kDate: 'Día', kTime: 'Hora', kName: 'Nombre', kPhone: 'WhatsApp', kNotes: 'Notas',
      how: ['Elige tu servicio y la opción que quieres.', 'Escoge el día y la hora que te acomodan.', 'Déjanos tu nombre y WhatsApp.', 'Confirma: te escribimos para apartar tu lugar y enviarte la ubicación.'],
      help: '¿Dudas? Escríbenos por WhatsApp', waIntro: 'Hola Kavéra, quiero reservar una cita:', waHelp: 'Hola Kavéra, tengo una pregunta sobre las citas.',
      locale: 'es-MX'
    },
    en: {
      navScenes: 'Treatments', navServices: 'Prices', navFaq: 'FAQ', navBook: 'Book',
      eyebrow: 'Aesthetics · Quintana Roo',
      h1a: 'Your beauty,', h1b: 'in its purest form.',
      heroSub: 'Lashes, facials, keratin and brows with a delicate, professional touch. A space designed to pamper you from the moment you arrive.',
      ctaBook: 'Book an appointment', ctaWa: 'Message us on WhatsApp',
      trust1: 'Personal attention', trust2: 'Premium products', trust3: 'Book in minutes',
      badge: 'BOOK YOUR VISIT · KAVÉRA · BOOK YOUR VISIT · KAVÉRA ·', badgeAria: 'Book your visit',
      m1: 'Lashes', m2: 'Facials', m3: 'Keratin', m4: 'Brow lamination',
      scEyebrow: 'Treatments', scA: 'Watch the magic', scB: 'happen.', scBook: 'Book',
      scFacial: 'Cleanse, mask and hydrate for skin that glows.',
      scHair: 'Goodbye frizz: smooth, soft, shiny hair for weeks.',
      scLash: 'Lash by lash, eyes that wake up ready.',
      scBrow: 'Brows brushed up, defined and set.',
      svcEyebrow: 'Services & prices', svcTitle: 'Rituals that bring out who you already are.',
      svcSub: 'Choose your treatment and book online or on WhatsApp. We confirm your time right away.',
      bookThis: 'Book',
      howEyebrow: 'How to book', howTitle: 'Your appointment in four steps.',
      offerEyebrow: 'First visit', offerTitle: '% off your first appointment', offerSub: 'Mention it when you book. [TERMS]', offerBtn: 'Claim my discount',
      subEyebrow: 'Promotions', subTitle: 'Be the first to know.', subSub: 'Get promotions, open spots this week and Kavéra news by email or WhatsApp. No spam: unsubscribe anytime.', subName: 'Your name', subEmail: 'Email', subWa: 'WhatsApp', subOptEmail: 'Send me promotions by email', subOptWa: 'Send me promotions on WhatsApp', subLegal: 'By subscribing you accept our', subLegalLink: 'privacy notice', subBtn: 'Subscribe', subOk: 'Done! You are on the list 💕', subNeed: 'Enter your email or WhatsApp and check at least one option.', subErr: 'Could not save. Try again or message us on WhatsApp.', subWaMsg: 'Hi Kavéra, I would like to receive promotions.',
      featEyebrow: 'Halloween season 🎃', featTitle: 'New at Kavéra.', featSub: 'Watch our seasonal Reel and book your appointment to look amazing this Halloween and Día de Muertos.', igFollow: 'Follow @kavera.aesthetics',
      igEyebrow: 'Instagram', igTitle: 'Our work, live.', igSub: 'Real lashes, keratin and brows from our clients in Playa del Carmen. By Karen Valero, cosmetologist and lash artist.',
      revEyebrow: 'Happy clients', revTitle: 'What they say about Kavéra.', revText: '[Paste a real client review here]', revWho: '[Name]',
      faqEyebrow: 'FAQ', faqTitle: 'Everything you want to know.',
      bookEyebrow: 'Booking', bookTitle: 'Reserve your moment.',
      bookSub: 'Pick a service, day and time on our booking page, or send us a quick message and we will help you find the perfect slot.',
      calBtn: 'Open booking page', calAlt: 'or book directly on Calendly',
      formTitle: 'Quick WhatsApp message',
      fName: 'Your name', fNamePh: 'First and last name',
      fService: 'Service', fPick: 'Choose a service', fDate: 'Preferred day or time', fDatePh: 'e.g. Saturday morning',
      formBtn: 'Send on WhatsApp',
      footerLoc: 'Quintana Roo, Mexico',
      waHello: 'Hi Kavéra, I would like to book an appointment.', waName: 'Name', waSvc: 'Service', waWhen: 'Preferred time',
      services: [
        { id: 'lashes', num: 'i', name: 'Lashes', sub: 'Extensions, effects and lifts', desc: 'Extensions and lash lifts for an intense yet natural look. Many styles and effects, made for you.', prices: LASH_EN },
        { id: 'facials', num: 'ii', name: 'Facials', sub: 'Cleanse, detox and hydrate', desc: 'Deep cleansing, acne control, detox and hydration. Your skin, rested and radiant.', prices: FACIAL_EN },
        { id: 'keratin', num: 'iii', name: 'Keratin', sub: 'Price by length', desc: 'Smooth, soft, frizz-free hair for weeks. Price depends on length.', prices: [['Short hair', 'from $500'], ['Long hair', 'up to $2,000']] },
        { id: 'brows', num: 'iv', name: 'Brow lamination', sub: 'Lift and set', desc: 'Brushed-up, defined, fuller brows. A lift that frames your face.', prices: BROW_EN }
      ],
      bookOpts: { lashes: LASH_EN, facials: FACIAL_EN, keratin: [['Short hair', '$500'], ['Long hair', '$2,000']], brows: BROW_EN },
      steps: [['01', 'Choose your service', 'Lashes, facials, keratin or brows, with the option and price.'], ['02', 'Pick a day and time', 'See the open times and grab the one that suits you.'], ['03', 'Leave your details', 'Just your name and WhatsApp so we can confirm.'], ['04', 'Get your confirmation', 'We message you on WhatsApp with the location and details.']],
      faq: [['How do I book?', 'On our booking page you pick a service, day and time, then leave your name and WhatsApp. You can also message us directly on WhatsApp.'], ['Where are you located?', 'In Quintana Roo. We share the exact location on WhatsApp when we confirm your appointment.'], ['How much is keratin?', 'It depends on your hair length: from $500 MXN for short hair up to $2,000 MXN for long hair.'], ['How can I pay?', '[PAYMENT METHODS: cash, transfer, card…]'], ['Can I change or cancel?', 'Yes, just let us know on WhatsApp. [CANCELLATION POLICY]']],
      bEyebrow: 'Book', bH1a: 'Reserve your', bH1b: 'moment.', progressAria: 'Booking progress',
      bSteps: ['Service', 'Day & time', 'Your details', 'Confirm'],
      s1Title: 'What would you like?', s1Opt: 'Choose an option',
      s2Title: 'Which day works best?', s2Time: 'Available times',
      s3Title: 'Your details', fPhonePh: '+52 …', fNotes: 'Notes (optional)', fNotesPh: 'Allergies, styles you like, references…',
      s4Title: 'Review and confirm', s4Sub: 'Confirming opens WhatsApp with your request ready to send. We reply to confirm your appointment.',
      s4Wa: 'Confirm on WhatsApp', s4Cal: 'I prefer booking on Calendly',
      doneTitle: 'Almost done!', doneSub: 'Send the message that opened in WhatsApp and we will confirm your appointment with the location and details. See you soon!', doneHome: 'Back to home', doneAgain: 'Book another',
      back: 'Back', next: 'Continue',
      sumEyebrow: 'Your appointment', kSvc: 'Service', kOpt: 'Option', kPrice: 'Price', kDate: 'Day', kTime: 'Time', kName: 'Name', kPhone: 'WhatsApp', kNotes: 'Notes',
      how: ['Choose your service and option.', 'Pick the day and time that suit you.', 'Leave your name and WhatsApp.', 'Confirm: we message you to hold your spot and send the location.'],
      help: 'Questions? Message us on WhatsApp', waIntro: 'Hi Kavéra, I would like to book an appointment:', waHelp: 'Hi Kavéra, I have a question about appointments.',
      locale: 'en-US'
    }
  };

  // Show every price as Mexican pesos (MXN) so foreigners don't read it as USD
  ['es', 'en'].forEach((l) => {
    const lists = T[l].services.map((s) => s.prices).concat(Object.values(T[l].bookOpts));
    lists.forEach((list) => list.forEach((p) => { if (p[1].includes('$') && !p[1].endsWith('MXN')) p[1] += ' MXN'; }));
  });

  function getLang() {
    try { const q = new URLSearchParams(location.search).get('lang'); if (q === 'en' || q === 'es') { localStorage.setItem('kv-lang', q); return q; } } catch (e) {}
    try { const s = localStorage.getItem('kv-lang'); if (s === 'en' || s === 'es') return s; } catch (e) {}
    return 'es'; // Spanish by default; English only when the visitor taps EN
  }
  function setLang(l) { try { localStorage.setItem('kv-lang', l); } catch (e) {} }
  const num = () => String(CONFIG.whatsapp).replace(/[^0-9]/g, '');
  const wa = (text) => 'https://wa.me/' + num() + '?text=' + encodeURIComponent(text);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function applyText(t) {
    document.querySelectorAll('[data-t]').forEach((el) => { const v = t[el.getAttribute('data-t')]; if (v != null) el.textContent = v; });
    document.querySelectorAll('[data-t-ph]').forEach((el) => { const v = t[el.getAttribute('data-t-ph')]; if (v != null) el.placeholder = v; });
    document.querySelectorAll('[data-t-aria]').forEach((el) => { const v = t[el.getAttribute('data-t-aria')]; if (v != null) el.setAttribute('aria-label', v); });
  }
  function langButtons(lang, onChange) {
    document.querySelectorAll('.lang button').forEach((b) => {
      b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false');
      b.onclick = () => { setLang(b.dataset.lang); onChange(b.dataset.lang); };
    });
  }
  function reveal() {
    const els = document.querySelectorAll('.kv-reveal');
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('on')); return; }
    const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('on'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach((e) => io.observe(e));
  }

  // Subscriber form (email + WhatsApp opt-in). Saves via /api/subscribe; falls back to WhatsApp if not configured.
  function initSubscribe() {
    const f = document.getElementById('subscribe-form'); if (!f || f._kvReady) return; f._kvReady = true;
    f.addEventListener('submit', async (e) => {
      e.preventDefault();
      const t = T[getLang()], msg = document.getElementById('subscribe-msg'), btn = f.querySelector('button[type=submit]');
      const el = f.elements; const d = { name: el.namedItem('name').value.trim(), email: el.namedItem('email').value.trim(), whatsapp: el.namedItem('whatsapp').value.trim(), optEmail: el.namedItem('optEmail').checked, optWhatsapp: el.namedItem('optWhatsapp').checked, website: el.namedItem('website').value, lang: getLang(), source: location.pathname };
      if ((!d.email && !d.whatsapp) || (!(d.optEmail && d.email) && !(d.optWhatsapp && d.whatsapp))) { msg.textContent = t.subNeed; return; }
      btn.disabled = true; msg.textContent = '…';
      try {
        const r = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) });
        if (r.ok) { f.reset(); msg.textContent = t.subOk; }
        else if (r.status === 503) {
          const lines = [t.subWaMsg, d.name && (t.waName + ': ' + d.name), d.email && ('Email: ' + d.email), d.whatsapp && ('WhatsApp: ' + d.whatsapp), (d.optEmail ? '✓ email' : '') + (d.optWhatsapp ? ' ✓ WhatsApp' : '')].filter(Boolean);
          window.open(wa(lines.join('\n')), '_blank', 'noopener'); f.reset(); msg.textContent = t.subOk;
        } else msg.textContent = t.subErr;
      } catch (err) { msg.textContent = t.subErr; }
      btn.disabled = false;
    });
  }
  if (typeof document !== 'undefined' && document.addEventListener) document.addEventListener('DOMContentLoaded', initSubscribe);

  return { CONFIG, T, getLang, setLang, wa, esc, applyText, langButtons, reveal, initSubscribe };
})();
