/**
 * Royal Wedding Invitation Platform - Core Application Logic
 * Supports:
 * - Dual Family Perspectives (Bride's Side / Groom's Side / Joint)
 * - Dynamic URL Greetings (?guest=...&side=...)
 * - Photo File Uploads with Client-side Compression (Base64 in LocalStorage)
 * - Complete Ceremony / Function Customizer (Add, Edit, Delete, Reorder)
 * - Multi-Tone Auspicious Music Engine (Raag Yaman, Raag Bhairavi, Temple Flute & Custom Audio)
 * - Interactive Wax Seal Envelope Opening with Dynamic Monogram Initials
 * - Live Muhurat Countdown Timer
 * - Modern RSVP Tracker (Visual Analytics, Google Sheets Direct Copy, Family WhatsApp Report, Print Spec Sheet)
 * - 1-Click WhatsApp Personalized Share Tool
 */

// Universal Clean Template Data (No external reference hardcoding)
const DEFAULT_WEDDING_DATA = {
  theme: "jaipur", // "jaipur" | "pastel" | "emerald" | "midnight"
  musicTone: "yaman", // "yaman" | "bhairavi" | "temple" | "custom"
  customAudioUrl: "",
  bride: {
    firstName: "Uravashi",
    fullName: "Uravashi Sharma",
    title: "Daughter of Smt. Sunita & Shri Rajeev Sharma",
    grandparents: "Granddaughter of Smt. & Shri O.P. Sharma",
    photo: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    bio: "Graceful, affectionate, and full of warmth, bringing boundless joy and celebration to our lives.",
    hospitality: {
      teamName: "Sharma Family Hospitality Desk",
      contactPerson: "Hospitality Coordinator (Bride)",
      phone: "+91 98765 43210",
      whatsapp: "919876543210",
      notes: "For room allocations, check-in, and guest reception (Bride's side guests)"
    }
  },
  groom: {
    firstName: "Prakhar",
    fullName: "Prakhar Jain",
    title: "Son of Smt. Kalpana & Shri Padam Jain",
    grandparents: "Grandson of Late Smt. & Late Shri K.L. Jain",
    photo: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80",
    bio: "Warm-hearted, visionary, and adventurous, embarking on a lifelong journey of companionship and love.",
    hospitality: {
      teamName: "Jain Family Hospitality Desk",
      contactPerson: "Amit Jain (Brother)",
      phone: "+91 98765 43211",
      whatsapp: "919876543211",
      notes: "For Barat assembly, transport coordination, and stay assistance (Groom's side guests)"
    }
  },
  general: {
    hashtag: "#PU",
    weddingDate: "2027-03-14T19:30",
    venueName: "Jahwar Bhawan",
    venueAddress: "Jahwar Bhawan, Station Road",
    city: "Beawar, Rajasthan",
    googleMapsUrl: "https://maps.google.com/?q=Jahwar+Bhawan+Beawar",
    welcomeQuote: "Two souls, two families, united by love and blessings under auspicious stars.",
    liveStreamUrl: ""
  },
  events: [
    {
      id: "event-1",
      title: "Ganesh Pujan & Bhaat (Mayra)",
      side: "bride", // "bride" | "groom" | "joint"
      date: "Saturday, 13th March 2027",
      time: "10:00 AM onwards",
      venue: "Jahwar Bhawan, Main Courtyard",
      dressCode: "Traditional Rajasthani Yellow & Bandhani",
      description: "Invoking Lord Ganesha's blessings followed by the heartwarming traditional Bhaat celebration with maternal family.",
      calendarDate: "20270313T043000Z/20270313T073000Z"
    },
    {
      id: "event-2",
      title: "Haldi & Floral Carnival",
      side: "joint",
      date: "Saturday, 13th March 2027",
      time: "03:00 PM onwards",
      venue: "Jahwar Bhawan, Garden Lawns",
      dressCode: "Bright Yellows & Floral Ethnic",
      description: "A joyful afternoon of auspicious turmeric, fragrant flower showers, dhol beats, and dance.",
      calendarDate: "20270313T093000Z/20270313T123000Z"
    },
    {
      id: "event-3",
      title: "Musical Sangeet & Celebration Night",
      side: "joint",
      date: "Saturday, 13th March 2027",
      time: "07:30 PM onwards",
      venue: "Jahwar Bhawan, Royal Banquet Hall",
      dressCode: "Indo-Western Glitz & Glam",
      description: "An evening of dazzling family dance performances, lively music, laughter, and a grand dinner.",
      calendarDate: "20270313T140000Z/20270313T183000Z"
    },
    {
      id: "event-4",
      title: "Sehra Bandi & Barat Departure",
      side: "groom",
      date: "Sunday, 14th March 2027",
      time: "04:00 PM onwards",
      venue: "Assembly at Residence to Jahwar Bhawan",
      dressCode: "Royal Sherwanis & Safas (Turbans)",
      description: "Adorning the groom with the sacred sehra, tying traditional safas, and starting the grand Barat procession.",
      calendarDate: "20270314T103000Z/20270314T123000Z"
    },
    {
      id: "event-5",
      title: "Barat Swagat & Varmala",
      side: "joint",
      date: "Sunday, 14th March 2027",
      time: "06:30 PM onwards",
      venue: "Jahwar Bhawan, Main Toran Gate",
      dressCode: "Regal Indian Formals / Silk Attire",
      description: "Grand welcome of the Barat by the Bride's family with rose petals and aarti, followed by the majestic Varmala.",
      calendarDate: "20270314T130000Z/20270314T150000Z"
    },
    {
      id: "event-6",
      title: "Vedic Phere & Hastamelap",
      side: "joint",
      date: "Sunday, 14th March 2027",
      time: "08:30 PM onwards (Shubh Muhurat)",
      venue: "The Central Mandap, Jahwar Bhawan",
      dressCode: "Traditional Wedding Wear",
      description: "Sacred seven vows around the holy agni solemnizing eternal union amidst Vedic mantras and family blessings.",
      calendarDate: "20270314T150000Z/20270314T180000Z"
    },
    {
      id: "event-7",
      title: "Royal Gala Dinner & Reception",
      side: "joint",
      date: "Sunday, 14th March 2027",
      time: "09:00 PM onwards",
      venue: "Jahwar Bhawan, Grand Lawns",
      dressCode: "Festive Formal",
      description: "A lavish feast celebrating the newlyweds with traditional delicacies and cherished moments.",
      calendarDate: "20270314T153000Z/20270314T200000Z"
    }
  ],
  rsvps: [],
  wishes: [
    {
      name: "Chachi & Family",
      side: "groom",
      message: "Wishing Prakhar & Uravashi an eternity of laughter, harmony, and love! ❤️✨",
      emoji: "🌸"
    },
    {
      name: "Maternal Family (Nanaji & Mamaji)",
      side: "bride",
      message: "May God shower your path with prosperity, joy, and peace. Welcome to our family! 🥂💍",
      emoji: "🥂"
    }
  ]
};

class WeddingApp {
  constructor() {
    this.data = this.loadData();
    this.currentSide = this.getInitialSide();
    this.guestName = this.getGuestNameFromUrl();
    this.audioPlaying = false;
    this.audioContext = null;
    this.audioTimer = null;
    this.activeFilter = "all";
    this.activeNodes = [];
    this.editingEventId = null;

    this.init();
  }

  loadData() {
    try {
      const saved = localStorage.getItem("wedding_platform_data_v2");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Deep merge with default to ensure no missing keys
        return Object.assign({}, DEFAULT_WEDDING_DATA, parsed, {
          bride: Object.assign({}, DEFAULT_WEDDING_DATA.bride, parsed.bride || {}),
          groom: Object.assign({}, DEFAULT_WEDDING_DATA.groom, parsed.groom || {}),
          general: Object.assign({}, DEFAULT_WEDDING_DATA.general, parsed.general || {}),
          events: Array.isArray(parsed.events) && parsed.events.length > 0 ? parsed.events : DEFAULT_WEDDING_DATA.events,
          rsvps: Array.isArray(parsed.rsvps) ? parsed.rsvps : DEFAULT_WEDDING_DATA.rsvps,
          wishes: Array.isArray(parsed.wishes) ? parsed.wishes : DEFAULT_WEDDING_DATA.wishes
        });
      }
    } catch (e) {
      console.warn("Could not load from localStorage, using defaults", e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_WEDDING_DATA));
  }

  saveData() {
    try {
      localStorage.setItem("wedding_platform_data_v2", JSON.stringify(this.data));
      this.showSaveNotification("✅ All changes saved successfully!");
      return true;
    } catch (e) {
      console.error("Storage save error", e);
      alert("Notice: Browser storage limit reached. If you uploaded very large photos, please use smaller photos.");
      return false;
    }
  }

  showSaveNotification(msg) {
    const banner = document.getElementById("studio-save-status");
    if (banner) {
      banner.textContent = msg;
      banner.classList.remove("hidden", "opacity-0");
      banner.classList.add("opacity-100");
      setTimeout(() => {
        banner.classList.add("opacity-0");
        setTimeout(() => banner.classList.add("hidden"), 400);
      }, 3000);
    }
  }

  resetData() {
    if (confirm("Reset everything to clean defaults? This will erase custom text and restored default fields.")) {
      localStorage.removeItem("wedding_platform_data_v2");
      this.data = JSON.parse(JSON.stringify(DEFAULT_WEDDING_DATA));
      this.saveData();
      location.reload();
    }
  }

  getInitialSide() {
    const params = new URLSearchParams(window.location.search);
    const side = params.get("side");
    if (side && ["bride", "groom", "joint"].includes(side.toLowerCase())) {
      return side.toLowerCase();
    }
    return "joint";
  }

  getGuestNameFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("guest") || params.get("to") || params.get("family") || "";
  }

  parseEventTimestamp(ev) {
    if (!ev) return 0;
    let year = 2027, month = 2, day = 14, hours = 12, minutes = 0;

    // 1. Parse date string (e.g. "Sunday, 14th March 2027" or "13 March 2027")
    if (ev.date) {
      const d = ev.date;
      const yMatch = d.match(/\b(20\d\d)\b/);
      if (yMatch) year = parseInt(yMatch[1], 10);

      const mNames = {
        jan: 0, january: 0,
        feb: 1, february: 1,
        mar: 2, march: 2,
        apr: 3, april: 3,
        may: 4,
        jun: 5, june: 5,
        jul: 6, july: 6,
        aug: 7, august: 7,
        sep: 8, sept: 8, september: 8,
        oct: 9, october: 9,
        nov: 10, november: 10,
        dec: 11, december: 11
      };
      for (const [mKey, mVal] of Object.entries(mNames)) {
        if (new RegExp(`\\b${mKey}\\b`, 'i').test(d)) {
          month = mVal;
          break;
        }
      }

      const dMatch = d.match(/\b(\d{1,2})(?:st|nd|rd|th)?\b/);
      if (dMatch) day = parseInt(dMatch[1], 10);
    }

    // 2. Parse time string (e.g. "07:30 AM", "7:30 AM onwards", "04:00 PM", "19:30")
    if (ev.time) {
      const t = ev.time;
      const t12 = t.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i);
      if (t12) {
        let h = parseInt(t12[1], 10);
        const m = t12[2] ? parseInt(t12[2], 10) : 0;
        const isPm = t12[3].toLowerCase() === 'pm';
        if (isPm && h < 12) h += 12;
        if (!isPm && h === 12) h = 0;
        hours = h;
        minutes = m;
      } else {
        const t24 = t.match(/(\d{1,2}):(\d{2})/);
        if (t24) {
          hours = parseInt(t24[1], 10);
          minutes = parseInt(t24[2], 10);
        }
      }
    }

    return new Date(year, month, day, hours, minutes).getTime();
  }

  sortEventsChronologically(saveAndRender = false) {
    this.data.events.sort((a, b) => this.parseEventTimestamp(a) - this.parseEventTimestamp(b));
    if (saveAndRender) {
      this.saveData();
      this.renderEvents();
      this.renderStudioEventsList();
    }
  }

  moveEvent(idx, direction) {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= this.data.events.length) return;
    const temp = this.data.events[idx];
    this.data.events[idx] = this.data.events[targetIdx];
    this.data.events[targetIdx] = temp;
    this.saveData();
    this.renderEvents();
    this.renderStudioEventsList();
  }

  init() {
    this.sortEventsChronologically(false);
    this.applyTheme(this.data.theme || "jaipur");
    this.renderAll();
    this.initCountdown();
    this.setupEventListeners();
    this.setupAudioEngine();
    this.populateStudioFields();
    this.renderStudioEventsList();
    this.renderRsvpDashboard();
  }

  applyTheme(themeName) {
    document.body.className = `theme-${themeName}`;
    const themeSelect = document.getElementById("studio-theme");
    if (themeSelect) themeSelect.value = themeName;
  }

  setSide(side) {
    this.currentSide = side;
    
    document.querySelectorAll(".side-pill-btn").forEach(btn => {
      const btnSide = btn.getAttribute("data-side");
      if (btnSide === side) {
        btn.classList.add("bg-amber-500", "text-black", "font-bold", "shadow-lg");
        btn.classList.remove("text-amber-200", "hover:bg-amber-900/40");
      } else {
        btn.classList.remove("bg-amber-500", "text-black", "font-bold", "shadow-lg");
        btn.classList.add("text-amber-200", "hover:bg-amber-900/40");
      }
    });

    this.renderHeaderAndGreetings();
    this.renderHostsAndFamilies();
    this.renderHospitalityDesk();
    this.renderEvents();
  }

  renderAll() {
    this.renderEnvelopeModal();
    this.renderHeaderAndGreetings();
    this.renderHostsAndFamilies();
    this.renderEvents();
    this.renderHospitalityDesk();
    this.renderVenueAndMap();
    this.renderWishes();
    this.renderRsvpDashboard();
    this.updateWhatsAppSharePreview();
  }

  // 1. Dynamic Envelope Modal & Wax Seal Initials
  renderEnvelopeModal() {
    const { bride, groom, general } = this.data;
    
    const groomInit = (groom.firstName || "G").charAt(0).toUpperCase();
    const brideInit = (bride.firstName || "B").charAt(0).toUpperCase();
    const monogram = `${groomInit} & ${brideInit}`;

    const waxInitials = document.getElementById("wax-seal-initials");
    if (waxInitials) waxInitials.textContent = monogram;

    const envNames = document.getElementById("envelope-couple-names");
    if (envNames) envNames.textContent = `${groom.firstName} & ${bride.firstName}`;

    const envQuote = document.getElementById("envelope-invitation-text");
    if (envQuote) {
      envQuote.textContent = general.welcomeQuote || "With divine blessings of our ancestors, we request the pleasure of your gracious presence.";
    }

    const envFamilies = document.getElementById("envelope-inviting-families");
    if (envFamilies) {
      const gFamily = groom.title ? groom.title.replace(/Son of /i, '') : "Jain Family";
      const bFamily = bride.title ? bride.title.replace(/Daughter of /i, '') : "Sharma Family";
      envFamilies.textContent = `Warmly welcomed by ${gFamily} & ${bFamily}`;
    }
  }

  // 2. Dynamic Header, Hero & Personalized Greeting Banner
  renderHeaderAndGreetings() {
    const { bride, groom, general } = this.data;

    // Header Couple Title & Hashtag
    document.querySelectorAll(".couple-title").forEach(el => {
      el.textContent = `${groom.firstName} & ${bride.firstName}`;
    });
    
    const heroBride = document.getElementById("hero-bride-name");
    const heroGroom = document.getElementById("hero-groom-name");
    const heroHashtag = document.getElementById("hero-hashtag");
    const heroQuote = document.getElementById("hero-quote");
    const heroVenue = document.getElementById("hero-venue");

    if (heroBride) heroBride.textContent = bride.firstName;
    if (heroGroom) heroGroom.textContent = groom.firstName;
    if (heroHashtag) heroHashtag.textContent = general.hashtag;
    if (heroQuote) heroQuote.textContent = general.welcomeQuote;
    if (heroVenue) heroVenue.textContent = `${general.venueName}, ${general.city}`;

    // Personalized Guest Greeting Banner
    const guestBanner = document.getElementById("personalized-guest-banner");
    const guestNameEl = document.getElementById("guest-salutation");
    const guestSideBadge = document.getElementById("guest-side-badge");
    const guestInvitationText = document.getElementById("guest-invitation-text");

    if (guestBanner) {
      if (this.guestName) {
        guestBanner.classList.remove("hidden");
        if (guestNameEl) guestNameEl.textContent = decodeURIComponent(this.guestName);

        let bHost = bride.title || "The Bride's Parents";
        let gHost = groom.title || "The Groom's Parents";

        // Clean out leading "Son of " or "Daughter of " prefix for proper grammar
        bHost = bHost.replace(/^daughter of\s+/i, '').replace(/^daughter\s*:\s*/i, '').trim();
        gHost = gHost.replace(/^son of\s+/i, '').replace(/^son\s*:\s*/i, '').trim();

        if (this.currentSide === "bride") {
          if (guestSideBadge) guestSideBadge.textContent = "🌸 Honored Guest of the Bride's Family (Ladkiwale)";
          if (guestInvitationText) {
            guestInvitationText.innerHTML = `${bHost} cordially invite you and your family to celebrate the auspicious wedding of their beloved daughter <strong>${bride.firstName}</strong> with <strong>${groom.firstName}</strong>.`;
          }
        } else if (this.currentSide === "groom") {
          if (guestSideBadge) guestSideBadge.textContent = "✨ Honored Guest of the Groom's Family (Ladkewale)";
          if (guestInvitationText) {
            guestInvitationText.innerHTML = `${gHost} cordially invite you and your family to join the royal Barat and wedding festivities of their beloved son <strong>${groom.firstName}</strong> with <strong>${bride.firstName}</strong>.`;
          }
        } else {
          if (guestSideBadge) guestSideBadge.textContent = "👑 Joint Wedding Invitation";
          if (guestInvitationText) {
            guestInvitationText.innerHTML = `${bHost} and ${gHost} warmly invite you and your family to grace the auspicious wedding celebration of <strong>${bride.firstName}</strong> & <strong>${groom.firstName}</strong> with your presence and blessings.`;
          }
        }
      } else {
        guestBanner.classList.add("hidden");
      }
    }
  }

  // 3. Meet the Couple & Families (with Dynamic Uploaded Photos)
  renderHostsAndFamilies() {
    const { bride, groom } = this.data;

    // Bride Side Card
    const brideNameEl = document.getElementById("family-bride-name");
    const brideParentsEl = document.getElementById("family-bride-parents");
    const brideGrandEl = document.getElementById("family-bride-grand");
    const brideBioEl = document.getElementById("family-bride-bio");
    const brideImgEl = document.getElementById("family-bride-img");

    if (brideNameEl) brideNameEl.textContent = bride.fullName;
    if (brideParentsEl) brideParentsEl.textContent = bride.title;
    if (brideGrandEl) brideGrandEl.textContent = bride.grandparents;
    if (brideBioEl) brideBioEl.textContent = bride.bio;
    if (brideImgEl) {
      brideImgEl.src = bride.photo || "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80";
    }

    // Groom Side Card
    const groomNameEl = document.getElementById("family-groom-name");
    const groomParentsEl = document.getElementById("family-groom-parents");
    const groomGrandEl = document.getElementById("family-groom-grand");
    const groomBioEl = document.getElementById("family-groom-bio");
    const groomImgEl = document.getElementById("family-groom-img");

    if (groomNameEl) groomNameEl.textContent = groom.fullName;
    if (groomParentsEl) groomParentsEl.textContent = groom.title;
    if (groomGrandEl) groomGrandEl.textContent = groom.grandparents;
    if (groomBioEl) groomBioEl.textContent = groom.bio;
    if (groomImgEl) {
      groomImgEl.src = groom.photo || "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80";
    }

    // Dynamic Highlighting based on currentSide
    const brideCard = document.getElementById("card-bride-family");
    const groomCard = document.getElementById("card-groom-family");

    if (brideCard && groomCard) {
      brideCard.classList.remove("ring-4", "ring-amber-400", "scale-[1.02]");
      groomCard.classList.remove("ring-4", "ring-amber-400", "scale-[1.02]");

      if (this.currentSide === "bride") {
        brideCard.classList.add("ring-4", "ring-amber-400", "scale-[1.02]");
      } else if (this.currentSide === "groom") {
        groomCard.classList.add("ring-4", "ring-amber-400", "scale-[1.02]");
      }
    }
  }

  // 4. Events Timeline & Calendar Sync
  renderEvents() {
    this.sortEventsChronologically(false);
    const container = document.getElementById("events-timeline-container");
    if (!container) return;

    let filteredEvents = this.data.events;

    const filter = (this.activeFilter || "all").toLowerCase().trim();

    if (filter === "bride") {
      filteredEvents = this.data.events.filter(e => (e.side || "").toLowerCase().trim() === "bride");
    } else if (filter === "groom") {
      filteredEvents = this.data.events.filter(e => (e.side || "").toLowerCase().trim() === "groom");
    } else if (filter === "joint") {
      filteredEvents = this.data.events.filter(e => (e.side || "").toLowerCase().trim() === "joint");
    } else {
      filteredEvents = this.data.events;
    }

    // Keep filter button UI in sync
    this.updateFilterButtonsUI();

    if (filteredEvents.length === 0) {
      let filterName = "selected category";
      if (filter === "groom") filterName = "Groom's Side (Ladkewale)";
      else if (filter === "bride") filterName = "Bride's Side (Ladkiwale)";
      else if (filter === "joint") filterName = "Joint Celebrations";

      container.innerHTML = `
        <div class="text-center py-12 bg-white/95 rounded-2xl border border-amber-300 p-8 text-stone-800 shadow-lg">
          <p class="text-lg font-serif font-bold text-stone-900 mb-2">No ceremonies found under ${filterName}</p>
          <p class="text-xs text-stone-600 mb-5">You can add a ceremony in the Creator Studio or view all wedding ceremonies.</p>
          <div class="flex items-center justify-center gap-3">
            <button onclick="app.setFilter('all')" class="px-4 py-2 bg-stone-900 text-amber-300 rounded-xl text-xs font-bold hover:bg-stone-800 shadow">
              View All Functions
            </button>
            <button onclick="document.getElementById('studio-drawer').classList.remove('translate-x-full'); app.openAddEventModal();" class="px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold hover:bg-amber-500 shadow">
              ➕ Add ${filter === 'groom' ? 'Groom' : (filter === 'bride' ? 'Bride' : '')} Ceremony
            </button>
          </div>
        </div>
      `;
      return;
    }

    container.innerHTML = filteredEvents.map((ev, index) => {
      let sideBadgeClass = "bg-amber-100 text-amber-900 border-amber-300";
      let sideBadgeIcon = "👑";
      let sideLabel = "Joint Celebration";

      if (ev.side === "bride") {
        sideBadgeClass = "bg-rose-100 text-rose-900 border-rose-300";
        sideBadgeIcon = "🌸";
        sideLabel = "Bride's Ceremony (Ladkiwale)";
      } else if (ev.side === "groom") {
        sideBadgeClass = "bg-blue-100 text-blue-900 border-blue-300";
        sideBadgeIcon = "✨";
        sideLabel = "Groom's Ceremony (Ladkewale)";
      }

      const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(ev.title + ' - ' + this.data.general.hashtag)}&dates=${ev.calendarDate || '20270314T120000Z/20270314T160000Z'}&details=${encodeURIComponent((ev.description || '') + ' at ' + ev.venue)}&location=${encodeURIComponent(ev.venue + ', ' + this.data.general.city)}`;

      return `
        <div class="relative pl-8 md:pl-12 pb-12 border-l-2 border-amber-400/40 last:border-0 last:pb-0 group">
          <div class="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 border-2 border-stone-900 flex items-center justify-center text-stone-900 font-bold text-xs shadow-lg group-hover:scale-125 transition-transform duration-300">
            ${index + 1}
          </div>

          <div class="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-amber-200 shadow-xl hover:shadow-2xl hover:border-amber-400 transition-all duration-300">
            <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${sideBadgeClass}">
                <span>${sideBadgeIcon}</span>
                <span>${sideLabel}</span>
              </span>
              <span class="text-xs uppercase tracking-wider text-amber-800 font-medium bg-amber-50 px-3 py-1 rounded-md border border-amber-200/60">
                ${ev.date}
              </span>
            </div>

            <h3 class="text-2xl md:text-3xl font-serif font-bold text-stone-900 mb-2">
              ${ev.title}
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-stone-700 mb-4 bg-amber-50/60 p-4 rounded-xl border border-amber-100">
              <div class="flex items-center gap-2">
                <span class="text-amber-600 text-lg">⏰</span>
                <span class="font-medium">${ev.time}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-amber-600 text-lg">📍</span>
                <span class="font-medium truncate">${ev.venue}</span>
              </div>
              ${ev.dressCode ? `
                <div class="md:col-span-2 flex items-center gap-2 pt-1 border-t border-amber-200/40">
                  <span class="text-amber-600 text-lg">👗</span>
                  <span><strong>Dress Code:</strong> ${ev.dressCode}</span>
                </div>
              ` : ''}
            </div>

            ${ev.description ? `
              <p class="text-stone-600 text-sm leading-relaxed mb-6 font-light">
                ${ev.description}
              </p>
            ` : ''}

            <div class="flex flex-wrap items-center gap-3">
              <a href="${gCalUrl}" target="_blank" rel="noopener noreferrer" 
                 class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-900 text-amber-300 hover:bg-stone-800 text-xs font-semibold tracking-wide transition-colors shadow">
                <span>📅 Add to Google Calendar</span>
              </a>
              <button onclick="app.downloadIcs('${ev.id}')" 
                 class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-300 bg-white hover:bg-amber-50 text-stone-800 text-xs font-semibold tracking-wide transition-colors">
                <span>🍎 Download Apple .ics</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // 5. Hospitality Desks for Both Sides
  renderHospitalityDesk() {
    const { bride, groom } = this.data;
    const container = document.getElementById("hospitality-cards-container");
    if (!container) return;

    const bPhoneClean = (bride.hospitality.phone || '').replace(/[^0-9]/g, '');
    const gPhoneClean = (groom.hospitality.phone || '').replace(/[^0-9]/g, '');

    container.innerHTML = `
      <!-- Bride Side Hospitality -->
      <div class="bg-gradient-to-br from-rose-50/95 to-amber-50/95 border-2 ${this.currentSide === 'bride' ? 'border-rose-400 shadow-2xl scale-[1.02]' : 'border-rose-200 shadow-md'} rounded-2xl p-6 transition-all duration-300">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 rounded-full bg-rose-200 text-rose-900 flex items-center justify-center text-xl shadow-inner">
            🌸
          </div>
          <div>
            <span class="text-xs uppercase font-bold text-rose-700 tracking-wider">Bride's Family Desk</span>
            <h4 class="text-xl font-serif font-bold text-stone-900">${bride.hospitality.teamName}</h4>
          </div>
        </div>
        <p class="text-xs text-stone-600 mb-4 bg-white/70 p-3 rounded-lg border border-rose-100">
          ${bride.hospitality.notes || 'For guest room check-in and transport coordination.'}
        </p>
        <div class="space-y-2 mb-5 text-sm text-stone-800">
          <p><strong>Concierge POC:</strong> ${bride.hospitality.contactPerson}</p>
          <p><strong>Helpline:</strong> <a href="tel:${bride.hospitality.phone}" class="text-rose-700 font-semibold underline">${bride.hospitality.phone}</a></p>
        </div>
        <div class="flex gap-2">
          <a href="https://wa.me/${bPhoneClean}?text=Namaste!%20I%20am%20a%20guest%20from%20the%20Bride's%20side%20for%20${encodeURIComponent(bride.firstName)}%20%26%20${encodeURIComponent(groom.firstName)}'s%20wedding." target="_blank" 
             class="flex-1 text-center py-2.5 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs flex items-center justify-center gap-2 shadow">
            <span>💬 WhatsApp Bride Desk</span>
          </a>
          <a href="tel:${bride.hospitality.phone}" 
             class="py-2.5 px-4 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-300 font-medium text-xs flex items-center justify-center shadow">
            <span>📞 Call</span>
          </a>
        </div>
      </div>

      <!-- Groom Side Hospitality -->
      <div class="bg-gradient-to-br from-blue-50/95 to-amber-50/95 border-2 ${this.currentSide === 'groom' ? 'border-blue-400 shadow-2xl scale-[1.02]' : 'border-blue-200 shadow-md'} rounded-2xl p-6 transition-all duration-300">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 rounded-full bg-blue-200 text-blue-900 flex items-center justify-center text-xl shadow-inner">
            ✨
          </div>
          <div>
            <span class="text-xs uppercase font-bold text-blue-700 tracking-wider">Groom's Family Desk</span>
            <h4 class="text-xl font-serif font-bold text-stone-900">${groom.hospitality.teamName}</h4>
          </div>
        </div>
        <p class="text-xs text-stone-600 mb-4 bg-white/70 p-3 rounded-lg border border-blue-100">
          ${groom.hospitality.notes || 'For airport/station pickup and Barat assembly updates.'}
        </p>
        <div class="space-y-2 mb-5 text-sm text-stone-800">
          <p><strong>Concierge POC:</strong> ${groom.hospitality.contactPerson}</p>
          <p><strong>Helpline:</strong> <a href="tel:${groom.hospitality.phone}" class="text-blue-700 font-semibold underline">${groom.hospitality.phone}</a></p>
        </div>
        <div class="flex gap-2">
          <a href="https://wa.me/${gPhoneClean}?text=Namaste!%20I%20am%20a%20guest%20from%20the%20Groom's%20side%20for%20${encodeURIComponent(groom.firstName)}%20%26%20${encodeURIComponent(bride.firstName)}'s%20wedding." target="_blank" 
             class="flex-1 text-center py-2.5 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs flex items-center justify-center gap-2 shadow">
            <span>💬 WhatsApp Groom Desk</span>
          </a>
          <a href="tel:${groom.hospitality.phone}" 
             class="py-2.5 px-4 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-300 font-medium text-xs flex items-center justify-center shadow">
            <span>📞 Call</span>
          </a>
        </div>
      </div>
    `;
  }

  // 6. Venue & Directions (Dynamic Map Link)
  renderVenueAndMap() {
    const { general } = this.data;
    const vName = document.getElementById("venue-display-name");
    const vAddr = document.getElementById("venue-display-address");
    const vMapLink = document.getElementById("venue-maps-link");

    if (vName) vName.textContent = general.venueName;
    if (vAddr) vAddr.textContent = `${general.venueAddress}, ${general.city}`;

    const effectiveMapUrl = general.googleMapsUrl && general.googleMapsUrl.startsWith("http")
      ? general.googleMapsUrl
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(general.venueName + ' ' + (general.venueAddress || general.city))}`;

    if (vMapLink) {
      vMapLink.href = effectiveMapUrl;
    }
  }

  // 7. Wishes Wall
  renderWishes() {
    const container = document.getElementById("wishes-cards-container");
    if (!container) return;

    container.innerHTML = this.data.wishes.map(wish => {
      let sideTag = `<span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">Joint</span>`;
      if (wish.side === "bride") {
        sideTag = `<span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">Bride's Guest</span>`;
      } else if (wish.side === "groom") {
        sideTag = `<span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">Groom's Guest</span>`;
      }

      return `
        <div class="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-amber-200/70 shadow-md hover:shadow-xl transition-shadow">
          <div class="flex items-center justify-between mb-3">
            <span class="text-2xl">${wish.emoji || '💐'}</span>
            ${sideTag}
          </div>
          <p class="text-stone-700 text-sm italic font-serif leading-relaxed mb-4">
            "${wish.message}"
          </p>
          <div class="border-t border-amber-100 pt-3">
            <h5 class="text-xs font-bold uppercase tracking-wider text-stone-900">${wish.name}</h5>
          </div>
        </div>
      `;
    }).join('');
  }

  // 8. Modern RSVP Dashboard (Analytics + Google Sheets Copy + WhatsApp Headcount)
  renderRsvpDashboard() {
    const rsvps = this.data.rsvps || [];
    
    // Calculate Analytics
    const totalCount = rsvps.length;
    const attendingCount = rsvps.filter(r => r.attending === "yes").length;
    const declineCount = rsvps.filter(r => r.attending === "no").length;
    const totalAdults = rsvps.reduce((acc, r) => acc + (r.attending === "yes" ? (parseInt(r.adults) || 1) : 0), 0);
    const totalChildren = rsvps.reduce((acc, r) => acc + (r.attending === "yes" ? (parseInt(r.children) || 0) : 0), 0);
    const jainMeals = rsvps.reduce((acc, r) => acc + (r.attending === "yes" && r.dietary && r.dietary.toLowerCase().includes("jain") ? (parseInt(r.adults) || 1) : 0), 0);
    const pickupReq = rsvps.filter(r => r.attending === "yes" && r.pickupNeeded && !r.pickupNeeded.toLowerCase().includes("no")).length;

    // Update Counter Badges
    const badge = document.getElementById("studio-rsvp-count");
    if (badge) badge.textContent = `${totalCount} Responses (${totalAdults + totalChildren} Attending)`;

    // Render Stats Grid in Studio
    const statsContainer = document.getElementById("studio-rsvp-stats-grid");
    if (statsContainer) {
      statsContainer.innerHTML = `
        <div class="grid grid-cols-3 gap-2 text-center text-xs mb-4">
          <div class="bg-stone-800 p-2.5 rounded-xl border border-stone-700">
            <span class="text-emerald-400 font-bold text-lg block">${totalAdults + totalChildren}</span>
            <span class="text-stone-400 text-[10px] uppercase">Headcount</span>
          </div>
          <div class="bg-stone-800 p-2.5 rounded-xl border border-stone-700">
            <span class="text-amber-400 font-bold text-lg block">${jainMeals}</span>
            <span class="text-stone-400 text-[10px] uppercase">Jain Meals</span>
          </div>
          <div class="bg-stone-800 p-2.5 rounded-xl border border-stone-700">
            <span class="text-blue-400 font-bold text-lg block">${pickupReq}</span>
            <span class="text-stone-400 text-[10px] uppercase">Pickups Req</span>
          </div>
        </div>
      `;
    }

    // Render RSVP Table
    const tbody = document.getElementById("studio-rsvp-tbody");
    if (!tbody) return;

    if (rsvps.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center py-6 text-stone-500 text-xs">No RSVPs received yet.</td></tr>`;
      return;
    }

    tbody.innerHTML = rsvps.map((r, i) => `
      <tr class="border-b border-stone-800 hover:bg-stone-800/50 text-xs">
        <td class="p-2 font-semibold text-stone-200">
          ${r.name}
          ${r.phone ? `<br><span class="text-[10px] text-stone-400">${r.phone}</span>` : ''}
        </td>
        <td class="p-2">
          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${r.side === 'bride' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-blue-950 text-blue-300 border border-blue-800'}">
            ${r.side === 'bride' ? '🌸 Bride' : '✨ Groom'}
          </span>
        </td>
        <td class="p-2">
          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${r.attending === 'yes' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-red-950 text-red-300 border border-red-800'}">
            ${r.attending === 'yes' ? 'Attending' : 'Decline'}
          </span>
        </td>
        <td class="p-2 text-center">${(parseInt(r.adults) || 1) + (parseInt(r.children) || 0)}</td>
        <td class="p-2 text-[11px] text-amber-200/90">${r.dietary || 'Standard'}</td>
        <td class="p-2 text-[11px] text-stone-400">${r.pickupNeeded || '-'}</td>
        <td class="p-2 text-right">
          <button onclick="app.deleteRsvp('${r.id}')" class="text-red-400 hover:text-red-300 text-xs px-1.5 py-0.5" title="Delete">🗑️</button>
        </td>
      </tr>
    `).join('');
  }

  // 1-Click Copy Tab-Separated Data Directly for Google Sheets / Excel
  copyRsvpsForGoogleSheets() {
    if (!this.data.rsvps || this.data.rsvps.length === 0) {
      alert("No RSVPs to copy yet.");
      return;
    }

    const headers = ["Guest Name", "Phone", "Family Side", "Attending", "Adults", "Children", "Dietary", "Pickup Needed", "Message", "Timestamp"];
    const rows = this.data.rsvps.map(r => [
      r.name || '',
      r.phone || '',
      r.side === 'bride' ? "Bride's Side" : "Groom's Side",
      r.attending === 'yes' ? "Attending" : "Declined",
      r.adults || 1,
      r.children || 0,
      r.dietary || 'Standard',
      r.pickupNeeded || 'No',
      (r.message || '').replace(/\t|\n/g, ' '),
      r.timestamp || ''
    ]);

    const tabDelimited = [headers.join('\t'), ...rows.map(row => row.join('\t'))].join('\n');

    navigator.clipboard.writeText(tabDelimited).then(() => {
      alert("📋 Copied to Clipboard!\n\nYou can now open Google Sheets or Excel and press Ctrl+V (Paste) — all columns and rows will paste perfectly!");
    }).catch(err => {
      prompt("Copy data for Google Sheets:", tabDelimited);
    });
  }

  // 1-Click Copy WhatsApp Family Headcount Report
  copyFamilyWhatsAppReport() {
    const rsvps = this.data.rsvps || [];
    const attending = rsvps.filter(r => r.attending === "yes");
    const totalHeadcount = attending.reduce((acc, r) => acc + (parseInt(r.adults) || 1) + (parseInt(r.children) || 0), 0);
    const jainMeals = attending.filter(r => r.dietary && r.dietary.toLowerCase().includes("jain")).length;
    const pickups = attending.filter(r => r.pickupNeeded && !r.pickupNeeded.toLowerCase().includes("no")).length;

    const report = `📋 *WEDDING HEADCOUNT & RSVP REPORT (${this.data.general.hashtag})* 📋\n\n` +
      `👥 *Total Confirmed Guests:* ${totalHeadcount} (${attending.length} families)\n` +
      `🥗 *Jain Pure Veg Meals:* ${jainMeals}\n` +
      `🚗 *Station/Airport Pickups Needed:* ${pickups}\n\n` +
      `*Confirmed Guests List:*\n` +
      attending.map((r, i) => `${i+1}. ${r.name} (${(parseInt(r.adults)||1) + (parseInt(r.children)||0)} pax - ${r.side === 'bride' ? 'Bride Side' : 'Groom Side'})`).join('\n') +
      `\n\n_Generated from Wedding Invitation Studio_`;

    navigator.clipboard.writeText(report).then(() => {
      alert("✅ WhatsApp Headcount Report copied to clipboard! Paste it directly in your family WhatsApp group.");
    }).catch(err => {
      prompt("Copy WhatsApp Report:", report);
    });
  }

  deleteRsvp(id) {
    if (confirm("Delete this RSVP entry?")) {
      this.data.rsvps = this.data.rsvps.filter(r => r.id !== id);
      this.saveData();
      this.renderRsvpDashboard();
    }
  }

  // 9. Ceremonies / Functions Manager in Creator Studio
  renderStudioEventsList() {
    const container = document.getElementById("studio-events-list");
    if (!container) return;

    container.innerHTML = this.data.events.map((ev, idx) => `
      <div class="bg-stone-800/90 p-3 rounded-xl border border-stone-700 flex items-start justify-between gap-2 text-xs">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${ev.side === 'bride' ? 'bg-rose-900 text-rose-200' : (ev.side === 'groom' ? 'bg-blue-900 text-blue-200' : 'bg-amber-900 text-amber-200')}">
              ${ev.side === 'bride' ? '🌸 Bride' : (ev.side === 'groom' ? '✨ Groom' : '👑 Joint')}
            </span>
            <span class="font-bold text-stone-200 truncate">${ev.title}</span>
          </div>
          <p class="text-stone-400 text-[11px]">${ev.date} • <strong class="text-amber-300 font-semibold">${ev.time}</strong></p>
          <p class="text-stone-400 text-[11px] truncate">📍 ${ev.venue}</p>
        </div>
        <div class="flex items-center gap-1 shrink-0">
          <button onclick="app.moveEvent(${idx}, -1)" ${idx === 0 ? 'disabled class="px-2 py-1 rounded bg-stone-900 text-stone-600 opacity-40 cursor-not-allowed text-[11px]"' : 'class="px-2 py-1 rounded bg-stone-700 hover:bg-stone-600 text-amber-200 text-[11px]"'} title="Move earlier">
            ▲
          </button>
          <button onclick="app.moveEvent(${idx}, 1)" ${idx === this.data.events.length - 1 ? 'disabled class="px-2 py-1 rounded bg-stone-900 text-stone-600 opacity-40 cursor-not-allowed text-[11px]"' : 'class="px-2 py-1 rounded bg-stone-700 hover:bg-stone-600 text-amber-200 text-[11px]"'} title="Move later">
            ▼
          </button>
          <button onclick="app.openEditEventModal('${ev.id}')" class="p-1.5 rounded-lg bg-stone-700 hover:bg-stone-600 text-amber-300" title="Edit">
            ✏️
          </button>
          <button onclick="app.deleteEvent('${ev.id}')" class="p-1.5 rounded-lg bg-stone-700 hover:bg-red-800 text-red-300" title="Delete">
            🗑️
          </button>
        </div>
      </div>
    `).join('');
  }

  openAddEventModal() {
    this.editingEventId = null;
    document.getElementById("event-modal-title").textContent = "Add Wedding Ceremony";
    document.getElementById("edit-event-name").value = "";
    document.getElementById("edit-event-side").value = "joint";
    document.getElementById("edit-event-date").value = "Sunday, 14th March 2027";
    document.getElementById("edit-event-time").value = "07:30 AM onwards";
    document.getElementById("edit-event-venue").value = this.data.general.venueName;
    document.getElementById("edit-event-dress").value = "Traditional Formal";
    document.getElementById("edit-event-desc").value = "";

    document.getElementById("event-editor-modal").classList.remove("hidden");
  }

  openEditEventModal(id) {
    const ev = this.data.events.find(e => e.id === id);
    if (!ev) return;

    this.editingEventId = id;
    document.getElementById("event-modal-title").textContent = "Edit Ceremony";
    document.getElementById("edit-event-name").value = ev.title || "";
    document.getElementById("edit-event-side").value = ev.side || "joint";
    document.getElementById("edit-event-date").value = ev.date || "";
    document.getElementById("edit-event-time").value = ev.time || "";
    document.getElementById("edit-event-venue").value = ev.venue || "";
    document.getElementById("edit-event-dress").value = ev.dressCode || "";
    document.getElementById("edit-event-desc").value = ev.description || "";

    document.getElementById("event-editor-modal").classList.remove("hidden");
  }

  saveEventFromModal() {
    const title = document.getElementById("edit-event-name").value.trim();
    if (!title) {
      alert("Please enter a ceremony title.");
      return;
    }

    const side = document.getElementById("edit-event-side").value;
    const date = document.getElementById("edit-event-date").value.trim();
    const time = document.getElementById("edit-event-time").value.trim();
    const venue = document.getElementById("edit-event-venue").value.trim();
    const dressCode = document.getElementById("edit-event-dress").value.trim();
    const description = document.getElementById("edit-event-desc").value.trim();

    if (this.editingEventId) {
      const idx = this.data.events.findIndex(e => e.id === this.editingEventId);
      if (idx !== -1) {
        this.data.events[idx] = Object.assign({}, this.data.events[idx], {
          title, side, date, time, venue, dressCode, description
        });
      }
    } else {
      const newEv = {
        id: "event-" + Date.now(),
        title, side, date, time, venue, dressCode, description,
        calendarDate: "20270314T140000Z/20270314T180000Z"
      };
      this.data.events.push(newEv);
    }

    // Automatically sort all events chronologically so newly added events immediately place in their proper time slot!
    this.sortEventsChronologically(false);

    this.saveData();
    this.renderEvents();
    this.renderStudioEventsList();
    document.getElementById("event-editor-modal").classList.add("hidden");
  }

  deleteEvent(id) {
    if (confirm("Are you sure you want to remove this ceremony from the invitation?")) {
      this.data.events = this.data.events.filter(e => e.id !== id);
      this.saveData();
      this.renderEvents();
      this.renderStudioEventsList();
    }
  }

  // 10. Photo Upload Processing (Client-side Canvas Image Compression)
  setupPhotoUploads() {
    const brideInput = document.getElementById("upload-bride-photo");
    const groomInput = document.getElementById("upload-groom-photo");

    if (brideInput) {
      brideInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          this.compressAndSaveImage(file, (base64) => {
            this.data.bride.photo = base64;
            const preview = document.getElementById("preview-bride-thumb");
            if (preview) preview.src = base64;
            this.renderHostsAndFamilies();
            this.saveData();
          });
        }
      });
    }

    if (groomInput) {
      groomInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          this.compressAndSaveImage(file, (base64) => {
            this.data.groom.photo = base64;
            const preview = document.getElementById("preview-groom-thumb");
            if (preview) preview.src = base64;
            this.renderHostsAndFamilies();
            this.saveData();
          });
        }
      });
    }
  }

  compressAndSaveImage(file, callback) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX = 480;
        let w = img.width;
        let h = img.height;
        if (w > h) {
          if (w > MAX) { h = Math.round(h * (MAX / w)); w = MAX; }
        } else {
          if (h > MAX) { w = Math.round(w * (MAX / h)); h = MAX; }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.82);
        callback(compressedBase64);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // 11. Multi-Tone & Custom Audio Music Engine
  setupAudioEngine() {
    this.html5Audio = document.getElementById("wedding-html5-audio");
    if (!this.html5Audio) {
      this.html5Audio = new Audio();
      this.html5Audio.id = "wedding-html5-audio";
      this.html5Audio.loop = true;
      document.body.appendChild(this.html5Audio);
    }

    this.updateActiveAudioSource();

    // Top Header Music Button
    const headerBtn = document.getElementById("music-toggle-btn");
    if (headerBtn) {
      headerBtn.addEventListener("click", () => {
        if (this.audioPlaying) {
          this.stopMusic();
        } else {
          this.playMusic();
        }
      });
    }

    // Studio In-Drawer Preview Button
    const studioTestBtn = document.getElementById("studio-test-audio-btn");
    if (studioTestBtn) {
      studioTestBtn.addEventListener("click", () => {
        if (this.audioPlaying) {
          this.stopMusic();
        } else {
          this.playMusic();
        }
      });
    }

    // Volume Slider
    const volSlider = document.getElementById("studio-audio-volume");
    const volDisplay = document.getElementById("volume-display");
    if (volSlider) {
      volSlider.addEventListener("input", (e) => {
        const val = parseFloat(e.target.value);
        if (this.html5Audio) this.html5Audio.volume = val;
        if (volDisplay) volDisplay.textContent = Math.round(val * 100) + "%";
        this.data.general.musicVolume = val;
      });
    }

    // Upload Audio File
    const fileInput = document.getElementById("upload-music-file");
    if (fileInput) {
      fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const blobUrl = URL.createObjectURL(file);
          this.data.general.customMusicUrl = blobUrl;
          this.data.general.customMusicName = file.name;
          this.updateActiveAudioSource();

          const nameBadge = document.getElementById("loaded-music-filename");
          if (nameBadge) {
            nameBadge.textContent = "✅ Loaded: " + file.name;
            nameBadge.classList.remove("hidden");
          }

          const statusPill = document.getElementById("music-status-pill");
          if (statusPill) statusPill.textContent = "Custom File";

          this.saveData();
          this.playMusic();
        }
      });
    }

    // Custom Audio URL input
    const urlInput = document.getElementById("studio-audio-url");
    if (urlInput) {
      urlInput.addEventListener("change", (e) => {
        const val = e.target.value.trim();
        if (val) {
          this.data.general.customMusicUrl = val;
          this.data.general.customMusicName = "Custom URL Stream";
          this.updateActiveAudioSource();
          this.saveData();
        }
      });
    }

    // Preset Tone selector
    const toneSelect = document.getElementById("studio-music-tone");
    if (toneSelect) {
      toneSelect.addEventListener("change", (e) => {
        this.data.musicTone = e.target.value;
        this.data.general.customMusicUrl = ""; // Reset custom URL if preset chosen
        const nameBadge = document.getElementById("loaded-music-filename");
        if (nameBadge) nameBadge.classList.add("hidden");
        const statusPill = document.getElementById("music-status-pill");
        if (statusPill) statusPill.textContent = "Instrument Preset";
        this.updateActiveAudioSource();
        this.saveData();
        if (this.audioPlaying) {
          this.stopMusic();
          this.playMusic();
        }
      });
    }
  }

  updateActiveAudioSource() {
    if (!this.html5Audio) return;
    const vol = this.data.general.musicVolume !== undefined ? this.data.general.musicVolume : 0.7;
    this.html5Audio.volume = vol;

    if (this.data.general.customMusicUrl) {
      this.html5Audio.src = this.data.general.customMusicUrl;
    }
  }

  updateAudioButtonsUI(isPlaying) {
    const icon = document.getElementById("music-icon");
    const label = document.getElementById("music-label");
    const testIcon = document.getElementById("test-audio-icon");
    const testLabel = document.getElementById("test-audio-label");
    const statusPill = document.getElementById("music-status-pill");

    if (isPlaying) {
      if (icon) icon.textContent = "🔊";
      if (label) label.textContent = "Mute Music";
      if (testIcon) testIcon.textContent = "⏸️";
      if (testLabel) testLabel.textContent = "Stop Preview";
      if (statusPill) statusPill.textContent = "🔊 Playing";
    } else {
      if (icon) icon.textContent = "🎵";
      if (label) label.textContent = "Play Music";
      if (testIcon) testIcon.textContent = "▶️";
      if (testLabel) testLabel.textContent = "Preview Tune";
      if (statusPill) statusPill.textContent = "Ready";
    }
  }

  playMusic() {
    this.audioPlaying = true;
    this.updateAudioButtonsUI(true);

    if (this.data.general.customMusicUrl && this.html5Audio) {
      this.html5Audio.src = this.data.general.customMusicUrl;
      this.html5Audio.play().catch(err => {
        console.warn("HTML5 audio playback error, falling back to traditional raga", err);
        this.synthesizeWeddingRaga(this.data.musicTone || "yaman");
      });
    } else {
      this.synthesizeWeddingRaga(this.data.musicTone || "yaman");
    }
  }

  stopMusic() {
    this.audioPlaying = false;
    this.updateAudioButtonsUI(false);
    if (this.html5Audio) {
      try { this.html5Audio.pause(); } catch(e){}
    }
    if (this.audioTimer) {
      clearTimeout(this.audioTimer);
      this.audioTimer = null;
    }
    if (this.activeNodes) {
      this.activeNodes.forEach(n => {
        try { n.stop && n.stop(); n.disconnect && n.disconnect(); } catch (e) {}
      });
      this.activeNodes = [];
    }
  }

  synthesizeWeddingRaga(tone) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!this.audioContext) {
        this.audioContext = new AudioCtx();
      }
      if (this.audioContext.state === "suspended") {
        this.audioContext.resume();
      }
    } catch (e) {
      console.warn("AudioContext not supported", e);
      return;
    }

    const ctx = this.audioContext;
    const now = ctx.currentTime;

    let baseSa = 220; // A3
    let scale = [
      baseSa,             // Sa
      baseSa * (9 / 8),   // Re
      baseSa * (5 / 4),   // Ga
      baseSa * (45 / 32), // Tivra Ma
      baseSa * (3 / 2),   // Pa
      baseSa * (27 / 16), // Dha
      baseSa * (15 / 8),  // Ni
      baseSa * 2          // Taar Sa
    ];

    let melody = [0, 2, 4, 3, 2, 0, 4, 6, 7, 6, 4, 2, 0];

    if (tone === "bhairavi") {
      scale = [
        baseSa,
        baseSa * (16 / 15),
        baseSa * (6 / 5),
        baseSa * (4 / 3),
        baseSa * (3 / 2),
        baseSa * (8 / 5),
        baseSa * (9 / 5),
        baseSa * 2
      ];
      melody = [0, 1, 2, 3, 4, 3, 2, 1, 0, 4, 5, 4, 3, 2, 0];
    } else if (tone === "temple") {
      baseSa = 261.63; // C4
      scale = [baseSa, baseSa * (9/8), baseSa * (5/4), baseSa * (4/3), baseSa * (3/2), baseSa * (5/3), baseSa * (15/8), baseSa * 2];
      melody = [0, 2, 4, 2, 4, 7, 4, 2, 0];
    }

    // Tanpura Drone (Sa & Pa)
    const drone1 = ctx.createOscillator();
    const drone2 = ctx.createOscillator();
    const droneGain = ctx.createGain();

    drone1.type = "sawtooth";
    drone1.frequency.setValueAtTime(baseSa * 0.75, now);
    drone2.type = "sine";
    drone2.frequency.setValueAtTime(baseSa, now);

    const userVol = this.data.general.musicVolume !== undefined ? this.data.general.musicVolume : 0.7;
    droneGain.gain.setValueAtTime(0.04 * userVol, now);
    drone1.connect(droneGain);
    drone2.connect(droneGain);
    droneGain.connect(ctx.destination);

    drone1.start(now);
    drone2.start(now);
    this.activeNodes = [drone1, drone2, droneGain];

    // Melodic Shehnai Phrases
    let noteIdx = 0;
    const playNote = () => {
      if (!this.audioPlaying) return;
      const t = ctx.currentTime;
      const freq = scale[melody[noteIdx % melody.length]];

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.02, t + 0.35);
      osc.frequency.exponentialRampToValueAtTime(freq, t + 0.7);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1350, t);
      filter.Q.setValueAtTime(4.0, t);

      const gainLevel = 0.05 * (this.data.general.musicVolume !== undefined ? this.data.general.musicVolume : 0.7);
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(gainLevel, t + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.15);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 1.2);

      noteIdx++;
      this.audioTimer = setTimeout(playNote, 920);
    };

    playNote();
  }

  unsealEnvelope() {
    const modal = document.getElementById("envelope-modal");
    if (modal) {
      modal.classList.add("opened");
      if (!this.audioPlaying) {
        this.playMusic();
        const icon = document.getElementById("music-icon");
        const label = document.getElementById("music-label");
        if (icon) icon.textContent = "🔊";
        if (label) label.textContent = "Mute Music";
      }
    }
  }

  initCountdown() {
    const update = () => {
      const target = new Date(this.data.general.weddingDate).getTime();
      const now = new Date().getTime();
      const dist = target - now;

      const dEl = document.getElementById("countdown-days");
      const hEl = document.getElementById("countdown-hours");
      const mEl = document.getElementById("countdown-minutes");
      const sEl = document.getElementById("countdown-seconds");

      if (dist < 0) {
        if (dEl) dEl.textContent = "00";
        if (hEl) hEl.textContent = "00";
        if (mEl) mEl.textContent = "00";
        if (sEl) sEl.textContent = "00";
        return;
      }

      const days = Math.floor(dist / (1000 * 60 * 60 * 24));
      const hours = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((dist % (1000 * 60)) / 1000);

      if (dEl) dEl.textContent = String(days).padStart(2, '0');
      if (hEl) hEl.textContent = String(hours).padStart(2, '0');
      if (mEl) mEl.textContent = String(mins).padStart(2, '0');
      if (sEl) sEl.textContent = String(secs).padStart(2, '0');
    };

    update();
    setInterval(update, 1000);
  }

  setFilter(filter) {
    this.activeFilter = (filter || "all").toLowerCase().trim();
    this.renderEvents();
  }

  updateFilterButtonsUI() {
    const current = (this.activeFilter || "all").toLowerCase().trim();
    document.querySelectorAll(".event-filter-btn").forEach(btn => {
      const bFilter = (btn.getAttribute("data-filter") || "all").toLowerCase().trim();
      if (bFilter === current) {
        btn.classList.remove("bg-stone-100", "text-stone-700");
        btn.classList.add("bg-amber-600", "text-white", "shadow-md");
      } else {
        btn.classList.remove("bg-amber-600", "text-white", "shadow-md");
        btn.classList.add("bg-stone-100", "text-stone-700");
      }
    });
  }

  // 12. Setup Event Listeners
  setupEventListeners() {
    const waxBtn = document.getElementById("wax-seal-btn");
    const openBtn = document.getElementById("open-invite-text-btn");
    if (waxBtn) waxBtn.addEventListener("click", () => this.unsealEnvelope());
    if (openBtn) openBtn.addEventListener("click", () => this.unsealEnvelope());

    document.querySelectorAll(".side-pill-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        this.setSide(btn.getAttribute("data-side"));
      });
    });

    document.querySelectorAll(".event-filter-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const chosenFilter = btn.getAttribute("data-filter");
        this.setFilter(chosenFilter);
      });
    });

    // Guest RSVP Form Submission
    const rsvpForm = document.getElementById("guest-rsvp-form");
    if (rsvpForm) {
      rsvpForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const guestName = document.getElementById("rsvp-name").value.trim();
        const guestPhone = document.getElementById("rsvp-phone").value.trim();
        const side = document.getElementById("rsvp-side").value;
        const attending = document.getElementById("rsvp-attendance").value;
        const adults = parseInt(document.getElementById("rsvp-adults").value) || 1;
        const children = parseInt(document.getElementById("rsvp-children").value) || 0;
        const dietary = document.getElementById("rsvp-dietary").value;
        const pickupNeeded = document.getElementById("rsvp-pickup").value;
        const message = document.getElementById("rsvp-message").value.trim();

        const newRsvp = {
          id: "rsvp-" + Date.now(),
          name: guestName,
          phone: guestPhone,
          side, attending, adults, children, dietary, pickupNeeded, message,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
        };

        this.data.rsvps.unshift(newRsvp);
        this.saveData();
        this.renderRsvpDashboard();

        const successMsg = document.getElementById("rsvp-success-msg");
        if (successMsg) {
          successMsg.classList.remove("hidden");
          setTimeout(() => successMsg.classList.add("hidden"), 8000);
        }

        // Offer instant WhatsApp sync to host
        const hostPhone = side === 'bride' 
          ? (this.data.bride.hospitality.phone || '').replace(/[^0-9]/g, '')
          : (this.data.groom.hospitality.phone || '').replace(/[^0-9]/g, '');

        if (hostPhone) {
          const waText = `Namaste! RSVP Confirmation for ${this.data.general.hashtag}:\nName: ${guestName}\nSide: ${side}\nAttending: ${attending === 'yes' ? 'Yes' : 'No'}\nHeadcount: ${adults} Adults, ${children} Children\nDiet: ${dietary}\nPickup: ${pickupNeeded}`;
          const waBtn = document.getElementById("rsvp-direct-wa-sync");
          if (waBtn) {
            waBtn.href = `https://wa.me/${hostPhone}?text=${encodeURIComponent(waText)}`;
            waBtn.classList.remove("hidden");
          }
        }

        rsvpForm.reset();
      });
    }

    // Guest Wish Form
    const wishForm = document.getElementById("guest-wish-form");
    if (wishForm) {
      wishForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newWish = {
          name: document.getElementById("wish-name").value.trim(),
          side: document.getElementById("wish-side").value,
          message: document.getElementById("wish-text").value.trim(),
          emoji: document.getElementById("wish-emoji").value || "🌸"
        };

        this.data.wishes.unshift(newWish);
        this.saveData();
        this.renderWishes();
        wishForm.reset();
        alert("✨ Thank you! Your warm blessings have been posted.");
      });
    }

    // Creator Studio Drawer
    const studioToggle = document.getElementById("studio-toggle-btn");
    const studioClose = document.getElementById("studio-close-btn");
    const studioDrawer = document.getElementById("studio-drawer");

    if (studioToggle && studioDrawer) {
      studioToggle.addEventListener("click", () => studioDrawer.classList.toggle("translate-x-full"));
    }
    if (studioClose && studioDrawer) {
      studioClose.addEventListener("click", () => studioDrawer.classList.add("translate-x-full"));
    }

    // WhatsApp Tool
    const waGuestInput = document.getElementById("studio-wa-guest-name");
    const waSideSelect = document.getElementById("studio-wa-side");
    if (waGuestInput) waGuestInput.addEventListener("input", () => this.updateWhatsAppSharePreview());
    if (waSideSelect) waSideSelect.addEventListener("change", () => this.updateWhatsAppSharePreview());

    const waCopyBtn = document.getElementById("studio-wa-copy-btn");
    if (waCopyBtn) {
      waCopyBtn.addEventListener("click", () => this.copyWhatsAppInvite());
    }

    this.setupPhotoUploads();
  }

  // 13. Populate & Save Creator Studio Fields
  populateStudioFields() {
    const { bride, groom, general, theme, musicTone } = this.data;

    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    };

    setVal("studio-theme", theme);
    setVal("studio-music-tone", musicTone || "yaman");
    setVal("studio-audio-url", general.customMusicUrl);

    const volSlider = document.getElementById("studio-audio-volume");
    const volDisplay = document.getElementById("volume-display");
    const vol = general.musicVolume !== undefined ? general.musicVolume : 0.7;
    if (volSlider) volSlider.value = vol;
    if (volDisplay) volDisplay.textContent = Math.round(vol * 100) + "%";

    const nameBadge = document.getElementById("loaded-music-filename");
    if (nameBadge) {
      if (general.customMusicName) {
        nameBadge.textContent = "✅ Loaded: " + general.customMusicName;
        nameBadge.classList.remove("hidden");
      } else {
        nameBadge.classList.add("hidden");
      }
    }

    // Bride
    setVal("studio-bride-first", bride.firstName);
    setVal("studio-bride-full", bride.fullName);
    setVal("studio-bride-parents", bride.title);
    setVal("studio-bride-grandparents", bride.grandparents);
    setVal("studio-bride-bio", bride.bio);
    setVal("studio-bride-hosp-poc", bride.hospitality.contactPerson);
    setVal("studio-bride-hosp-phone", bride.hospitality.phone);

    const bThumb = document.getElementById("preview-bride-thumb");
    if (bThumb && bride.photo) bThumb.src = bride.photo;

    // Groom
    setVal("studio-groom-first", groom.firstName);
    setVal("studio-groom-full", groom.fullName);
    setVal("studio-groom-parents", groom.title);
    setVal("studio-groom-grandparents", groom.grandparents);
    setVal("studio-groom-bio", groom.bio);
    setVal("studio-groom-hosp-poc", groom.hospitality.contactPerson);
    setVal("studio-groom-hosp-phone", groom.hospitality.phone);

    const gThumb = document.getElementById("preview-groom-thumb");
    if (gThumb && groom.photo) gThumb.src = groom.photo;

    // General
    setVal("studio-hashtag", general.hashtag);
    setVal("studio-wedding-date", general.weddingDate ? general.weddingDate.substring(0, 16) : '');
    setVal("studio-venue-name", general.venueName);
    setVal("studio-venue-address", general.venueAddress);
    setVal("studio-venue-city", general.city);
    setVal("studio-maps-url", general.googleMapsUrl);
    setVal("studio-welcome-quote", general.welcomeQuote);
  }

  saveStudioChanges() {
    const getVal = (id) => document.getElementById(id)?.value?.trim() || '';

    this.data.theme = getVal("studio-theme") || "jaipur";
    this.data.musicTone = getVal("studio-music-tone") || "yaman";
    const customAudio = getVal("studio-audio-url");
    if (customAudio) {
      this.data.general.customMusicUrl = customAudio;
    }

    // Bride
    this.data.bride.firstName = getVal("studio-bride-first") || "Bride";
    this.data.bride.fullName = getVal("studio-bride-full") || this.data.bride.firstName;
    this.data.bride.title = getVal("studio-bride-parents");
    this.data.bride.grandparents = getVal("studio-bride-grandparents");
    this.data.bride.bio = getVal("studio-bride-bio");
    this.data.bride.hospitality.contactPerson = getVal("studio-bride-hosp-poc");
    this.data.bride.hospitality.phone = getVal("studio-bride-hosp-phone");
    this.data.bride.hospitality.whatsapp = (getVal("studio-bride-hosp-phone") || "").replace(/[^0-9]/g, '');

    // Groom
    this.data.groom.firstName = getVal("studio-groom-first") || "Groom";
    this.data.groom.fullName = getVal("studio-groom-full") || this.data.groom.firstName;
    this.data.groom.title = getVal("studio-groom-parents");
    this.data.groom.grandparents = getVal("studio-groom-grandparents");
    this.data.groom.bio = getVal("studio-groom-bio");
    this.data.groom.hospitality.contactPerson = getVal("studio-groom-hosp-poc");
    this.data.groom.hospitality.phone = getVal("studio-groom-hosp-phone");
    this.data.groom.hospitality.whatsapp = (getVal("studio-groom-hosp-phone") || "").replace(/[^0-9]/g, '');

    // General & Maps
    this.data.general.hashtag = getVal("studio-hashtag") || "#Wedding";
    this.data.general.weddingDate = getVal("studio-wedding-date") || this.data.general.weddingDate;
    this.data.general.venueName = getVal("studio-venue-name") || "Wedding Venue";
    this.data.general.venueAddress = getVal("studio-venue-address") || "";
    this.data.general.city = getVal("studio-venue-city") || "";
    
    let mapInput = getVal("studio-maps-url");
    if (!mapInput || !mapInput.startsWith("http")) {
      mapInput = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.data.general.venueName + ' ' + (this.data.general.venueAddress || this.data.general.city))}`;
      const mapEl = document.getElementById("studio-maps-url");
      if (mapEl) mapEl.value = mapInput;
    }
    this.data.general.googleMapsUrl = mapInput;
    this.data.general.welcomeQuote = getVal("studio-welcome-quote");

    this.saveData();
    this.applyTheme(this.data.theme);
    this.renderAll();
    this.initCountdown();

    alert("✨ Wedding Invitation updated and saved successfully!");
  }

  // 14. 1-Click WhatsApp Invite Share Tool
  updateWhatsAppSharePreview() {
    const guestInput = document.getElementById("studio-wa-guest-name");
    const sideSelect = document.getElementById("studio-wa-side");
    const previewEl = document.getElementById("studio-wa-preview-text");
    const urlEl = document.getElementById("studio-wa-url-preview");

    if (!previewEl || !urlEl) return;

    const guestName = (guestInput?.value?.trim()) || "Guest Name / Family";
    const side = sideSelect?.value || "joint";
    const baseUrl = window.location.origin + window.location.pathname;
    const personalizedUrl = `${baseUrl}?side=${side}&guest=${encodeURIComponent(guestName)}`;

    urlEl.textContent = personalizedUrl;

    let message = "";
    if (side === "bride") {
      message = `🌸 *Namaste ${guestName}!* 🌸\n\n${this.data.bride.title || "The Bride's Family"} cordially invite you and your family to celebrate the auspicious wedding of their beloved daughter *${this.data.bride.firstName}* with *${this.data.groom.firstName}* at ${this.data.general.venueName}, ${this.data.general.city}.\n\n👉 *View your personalized invitation card, ceremonies schedule & RSVP here:*\n${personalizedUrl}\n\nWe warmly look forward to celebrating with you!\n${this.data.general.hashtag}`;
    } else if (side === "groom") {
      message = `✨ *Namaste ${guestName}!* ✨\n\n${this.data.groom.title || "The Groom's Family"} cordially invite you and your family to celebrate the Barat and wedding of their beloved son *${this.data.groom.firstName}* with *${this.data.bride.firstName}* at ${this.data.general.venueName}, ${this.data.general.city}.\n\n👉 *View your personalized invitation card, ceremonies schedule & RSVP here:*\n${personalizedUrl}\n\nWe look forward to dancing with you at the Barat!\n${this.data.general.hashtag}`;
    } else {
      message = `👑 *Namaste ${guestName}!* 👑\n\nWith the divine blessings of our ancestors, you are cordially invited to grace the wedding celebration of *${this.data.groom.firstName} & ${this.data.bride.firstName}* at ${this.data.general.venueName}, ${this.data.general.city}.\n\n👉 *Open your royal invitation card:*\n${personalizedUrl}\n\nWith warm regards,\nThe Families\n${this.data.general.hashtag}`;
    }

    previewEl.textContent = message;
    this.currentGeneratedWhatsAppText = message;
  }

  copyWhatsAppInvite() {
    if (!this.currentGeneratedWhatsAppText) return;
    navigator.clipboard.writeText(this.currentGeneratedWhatsAppText).then(() => {
      const btn = document.getElementById("studio-wa-copy-btn");
      if (btn) {
        const oldText = btn.innerHTML;
        btn.innerHTML = "✅ Copied to Clipboard!";
        setTimeout(() => btn.innerHTML = oldText, 2500);
      }
    }).catch(err => {
      prompt("Copy WhatsApp Invitation text:", this.currentGeneratedWhatsAppText);
    });
  }

  downloadIcs(eventId) {
    const ev = this.data.events.find(e => e.id === eventId);
    if (!ev) return;

    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Royal Wedding Invitation Platform//EN\nBEGIN:VEVENT\nSUMMARY:${ev.title} - ${this.data.general.hashtag}\nDESCRIPTION:${ev.description || ''}\\nDress Code: ${ev.dressCode || ''}\\nVenue: ${ev.venue}\nLOCATION:${ev.venue}, ${this.data.general.city}\nDTSTART:${ev.calendarDate ? ev.calendarDate.split('/')[0] : '20270314T120000Z'}\nDTEND:${ev.calendarDate ? ev.calendarDate.split('/')[1] : '20270314T160000Z'}\nSTATUS:CONFIRMED\nEND:VEVENT\nEND:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${ev.title.replace(/[^a-zA-Z0-9]/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  exportConfigJson() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.data, null, 2));
    const dlAnchor = document.createElement("a");
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `wedding_config_${Date.now()}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
  }

  printSpecSheet() {
    window.print();
  }
}

// Global App Initialization
let app;
document.addEventListener("DOMContentLoaded", () => {
  app = new WeddingApp();
  window.app = app;
});
