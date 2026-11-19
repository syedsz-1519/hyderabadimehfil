import { FormEvent, useState } from 'react';
import {
  Mail,
  User,
  AtSign,
  MessageSquare,
  Send,
  CheckCircle2,
  MapPin,
  ArrowUpRight,
  Phone,
  PhoneForwarded,
  Clock,
  Compass,
  Navigation,
  Utensils,
  Flame,
  ExternalLink,
} from 'lucide-react';
import { CONTACT_VIGNETTES, RESTAURANT_INFO } from '../data/restaurantData';
import { ResilientImage } from '../components/ResilientImage';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
}

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const validateForm = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!name.trim()) {
      nextErrors.name = 'Please enter your name.';
    }
    const emailTrimmed = email.trim();
    if (!emailTrimmed) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!subject.trim()) {
      nextErrors.subject = 'Please let us know how we can help you.';
    }
    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmittedName(name.trim());
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="flex flex-col w-full bg-[#FFF8F6]">
      {/* 1. TOP HEADER BANNER */}
      <section className="relative w-full bg-[#5A0F1F] text-[#FFF8F6] overflow-hidden py-14 lg:py-20 shadow-lg">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[#795902]/25 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[#3A000D]/70 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 lg:px-12 text-center flex flex-col items-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 sm:w-12 h-px bg-gradient-to-r from-transparent to-[#FDD275]" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#FDD275] font-semibold">
              290 Ilford Lane · London IG1 2LP
            </span>
            <span className="w-10 sm:w-12 h-px bg-gradient-to-l from-transparent to-[#FDD275]" />
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FFF8F6] tracking-tight mb-4">
            CONTACT US
          </h1>

          <p className="text-base sm:text-lg text-[#FAEBE5] max-w-2xl mx-auto font-normal leading-relaxed">
            We would love to welcome you to our restaurant in Ilford, London.
          </p>

          <div className="mt-7 flex items-center justify-center gap-2">
            <span className="w-20 h-px bg-[#FDD275]/35" />
            <div className="w-2.5 h-2.5 rotate-45 border-2 border-[#FDD275] bg-[#5A0F1F]" />
            <span className="w-20 h-px bg-[#FDD275]/35" />
          </div>
        </div>
      </section>

      {/* 2. AMBIENT PHOTO VIGNETTE BAND */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 -mt-7 relative z-20">
        <div className="bg-[#FFF1EC] rounded-xl shadow-lg overflow-hidden p-3 lg:p-4 grid grid-cols-1 md:grid-cols-3 gap-3 border border-[#C9A24B]/35">
          {CONTACT_VIGNETTES.map((item) => (
            <div
              key={item.title}
              className="relative h-36 md:h-40 rounded-lg overflow-hidden group shadow-xs"
            >
              <ResilientImage
                src={item.imageUrl}
                alt={item.alt}
                fallbackLabel={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B1411]/75 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs uppercase tracking-wider text-[#FFF8F6] font-bold">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TWO-COLUMN FORM & RESTAURANT INFO */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: SEND US A MESSAGE */}
          <div className="lg:col-span-6">
            <div className="bg-[#FFF1EC] rounded-xl p-6 sm:p-8 lg:p-10 shadow-md border border-[#C9A24B]/35 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#795902] via-[#E8A317] to-[#795902]" />

              <div className="flex items-center gap-2 mb-2 pt-1">
                <Mail className="w-4 h-4 text-[#795902]" aria-hidden="true" />
                <span className="text-xs uppercase tracking-[0.2em] text-[#795902] font-bold">
                  Direct Inquiry
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#3A000D] mb-3">
                SEND US A MESSAGE
              </h2>

              <p className="text-sm sm:text-base text-[#554243] mb-7 leading-relaxed">
                Whether inquiring about table bookings, group catering, or takeaway orders, our team
                is happy to help.
              </p>

              <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Your name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="userName"
                    className="text-xs sm:text-sm font-semibold text-[#211A17] uppercase tracking-wide"
                  >
                    Your name
                  </label>
                  <div className="relative flex items-center">
                    <User
                      className="w-4 h-4 absolute left-4 text-[#C9A24B] pointer-events-none"
                      aria-hidden="true"
                    />
                    <input
                      id="userName"
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="Enter your name"
                      required
                      aria-invalid={Boolean(errors.name)}
                      className="w-full bg-[#FAEBE5] border border-[#DAC0C2] text-[#211A17] placeholder:text-[#877273] text-sm sm:text-base pl-11 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8A317]/40 focus:border-[#795902] transition-all"
                    />
                  </div>
                  {errors.name && (
                    <p role="alert" className="text-xs font-medium text-[#BA1A1A]">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Your email */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="userEmail"
                    className="text-xs sm:text-sm font-semibold text-[#211A17] uppercase tracking-wide"
                  >
                    Your email
                  </label>
                  <div className="relative flex items-center">
                    <AtSign
                      className="w-4 h-4 absolute left-4 text-[#C9A24B] pointer-events-none"
                      aria-hidden="true"
                    />
                    <input
                      id="userEmail"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="Enter your email address"
                      required
                      aria-invalid={Boolean(errors.email)}
                      className="w-full bg-[#FAEBE5] border border-[#DAC0C2] text-[#211A17] placeholder:text-[#877273] text-sm sm:text-base pl-11 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8A317]/40 focus:border-[#795902] transition-all"
                    />
                  </div>
                  {errors.email && (
                    <p role="alert" className="text-xs font-medium text-[#BA1A1A]">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="userSubject"
                    className="text-xs sm:text-sm font-semibold text-[#211A17] uppercase tracking-wide"
                  >
                    Subject
                  </label>
                  <div className="relative flex items-center">
                    <MessageSquare
                      className="w-4 h-4 absolute left-4 text-[#C9A24B] pointer-events-none"
                      aria-hidden="true"
                    />
                    <input
                      id="userSubject"
                      name="subject"
                      type="text"
                      value={subject}
                      onChange={(e) => {
                        setSubject(e.target.value);
                        if (errors.subject) setErrors((prev) => ({ ...prev, subject: undefined }));
                      }}
                      placeholder="How can we help you?"
                      required
                      aria-invalid={Boolean(errors.subject)}
                      className="w-full bg-[#FAEBE5] border border-[#DAC0C2] text-[#211A17] placeholder:text-[#877273] text-sm sm:text-base pl-11 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8A317]/40 focus:border-[#795902] transition-all"
                    />
                  </div>
                  {errors.subject && (
                    <p role="alert" className="text-xs font-medium text-[#BA1A1A]">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Your message (optional) */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-baseline">
                    <label
                      htmlFor="userMessage"
                      className="text-xs sm:text-sm font-semibold text-[#211A17] uppercase tracking-wide"
                    >
                      Your message (optional)
                    </label>
                    <span className="text-xs text-[#877273] font-medium">Optional</span>
                  </div>
                  <textarea
                    id="userMessage"
                    name="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message..."
                    className="w-full bg-[#FAEBE5] border border-[#DAC0C2] text-[#211A17] placeholder:text-[#877273] text-sm sm:text-base p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8A317]/40 focus:border-[#795902] transition-all resize-y"
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-gradient-to-r from-[#C9A24B] via-[#E8A317] to-[#C9A24B] text-[#241600] text-sm font-bold uppercase tracking-wider rounded-lg shadow-md hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A000D]"
                  >
                    <span>SEND MESSAGE</span>
                    <Send
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </button>
                </div>

                {submittedName && (
                  <div
                    role="status"
                    className="mt-2 p-4 rounded-lg bg-white border border-[#C9A24B]/50 text-[#3A000D] text-sm flex items-start gap-3 shadow-xs"
                  >
                    <CheckCircle2
                      className="w-5 h-5 text-[#795902] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">
                        Thank you, {submittedName}! Your message has been received and our team will
                        reply shortly.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubmittedName(null)}
                        className="mt-1.5 text-xs font-bold uppercase tracking-wider text-[#795902] hover:underline cursor-pointer"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: ADDRESS, PHONE, HOURS, EMAIL & MAP */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Address Card */}
              <div className="bg-[#FFF1EC] rounded-xl p-6 shadow-xs border border-[#C9A24B]/30 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#5A0F1F] text-[#FDD275] flex items-center justify-center mb-4">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="text-[11px] uppercase tracking-widest text-[#795902] font-bold block mb-1">
                    ADDRESS
                  </span>
                  <p className="font-serif text-xl font-semibold text-[#3A000D]">
                    {RESTAURANT_INFO.addressLine1}
                  </p>
                  <p className="text-sm sm:text-base text-[#554243] mb-4">
                    {RESTAURANT_INFO.addressLine2}
                  </p>
                </div>
                <a
                  href={RESTAURANT_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#795902] uppercase hover:text-[#3A000D] transition-colors mt-2"
                >
                  <span>Get Directions</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>

              {/* Phone Card */}
              <div className="bg-[#FFF1EC] rounded-xl p-6 shadow-xs border border-[#C9A24B]/30 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#5A0F1F] text-[#FDD275] flex items-center justify-center mb-4">
                    <Phone className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="text-[11px] uppercase tracking-widest text-[#795902] font-bold block mb-1">
                    PHONE
                  </span>
                  <a
                    href={RESTAURANT_INFO.phoneHref}
                    className="font-serif text-xl font-semibold text-[#3A000D] hover:text-[#795902] transition-colors block mb-2 tabular-nums"
                  >
                    {RESTAURANT_INFO.phoneDisplay}
                  </a>
                  <p className="text-sm text-[#554243]">
                    Direct line for table reservations and fresh takeaway orders.
                  </p>
                </div>
                <a
                  href={RESTAURANT_INFO.phoneHref}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#795902] uppercase hover:text-[#3A000D] transition-colors mt-4"
                >
                  <PhoneForwarded className="w-4 h-4" aria-hidden="true" />
                  <span>Tap to Call</span>
                </a>
              </div>

              {/* Opening Hours Card */}
              <div className="bg-[#FFF1EC] rounded-xl p-6 shadow-xs border border-[#C9A24B]/30 sm:col-span-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-[#5A0F1F] text-[#FDD275] flex items-center justify-center mb-3">
                      <Clock className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="text-[11px] uppercase tracking-widest text-[#795902] font-bold block mb-2">
                      OPENING HOURS
                    </span>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#795902]">
                    Fresh Dum Daily
                  </span>
                </div>

                <div className="space-y-3 mt-2 text-sm sm:text-base">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#EEDFDA]">
                    <span className="text-[#211A17] font-semibold">Every day except Friday:</span>
                    <span className="text-[#3A000D] font-bold">12 Noon – 11 PM</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <span className="text-[#211A17] font-semibold">Friday:</span>
                    <span className="text-[#3A000D] font-bold">2 PM – 11 PM</span>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-[#FFF1EC] rounded-xl p-6 shadow-xs border border-[#C9A24B]/30 sm:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-[#5A0F1F] text-[#FDD275] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] uppercase tracking-widest text-[#795902] font-bold block">
                      EMAIL
                    </span>
                    <a
                      href={RESTAURANT_INFO.emailHref}
                      className="text-base sm:text-lg text-[#3A000D] hover:text-[#795902] font-semibold transition-colors block truncate"
                    >
                      {RESTAURANT_INFO.email}
                    </a>
                  </div>
                </div>
                <a
                  href={RESTAURANT_INFO.emailHref}
                  className="self-start sm:self-auto px-4 py-2 bg-[#FAEBE5] border border-[#C9A24B]/40 text-[#3A000D] text-xs font-bold uppercase rounded-lg hover:bg-[#F4E5E0] transition-colors shrink-0"
                >
                  Write Email
                </a>
              </div>
            </div>

            {/* Embedded Google Map Card */}
            <div className="bg-[#FFF1EC] rounded-xl p-4 shadow-xs border border-[#C9A24B]/30 flex flex-col gap-3">
              <div className="flex items-center justify-between px-1 pt-1">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#795902]" aria-hidden="true" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#3A000D]">
                    FIND US IN ILFORD
                  </span>
                </div>
                <span className="text-xs text-[#554243] font-medium">East London</span>
              </div>

              <div className="w-full h-72 rounded-lg relative overflow-hidden flex flex-col justify-between p-4 border border-[#C9A24B]/30 bg-[#FAEBE5]">
                <iframe
                  title="Map showing 290 Ilford Lane, Ilford, IG1 2LP"
                  src={RESTAURANT_INFO.mapsEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full border-0"
                />

                <div className="relative z-10 flex justify-end pointer-events-none">
                  <span className="bg-[#3A000D]/90 text-[#FFF8F6] backdrop-blur-md px-3 py-1 rounded-md text-xs uppercase font-semibold tracking-wider flex items-center gap-1.5 shadow-sm border border-[#C9A24B]/45">
                    <Navigation className="w-3.5 h-3.5 text-[#FDD275]" aria-hidden="true" />
                    <span>IG1 2LP</span>
                  </span>
                </div>

                <div className="relative z-10 bg-[#FFF8F6]/95 backdrop-blur-md p-4 rounded-lg shadow-lg max-w-sm border border-[#C9A24B]/40">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#5A0F1F] text-[#FDD275] flex items-center justify-center shrink-0">
                      <Utensils className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-base font-semibold text-[#3A000D] leading-tight">
                        {RESTAURANT_INFO.name}
                      </h3>
                      <p className="text-xs text-[#554243] truncate mt-0.5">
                        {RESTAURANT_INFO.fullAddress}
                      </p>
                      <a
                        href={RESTAURANT_INFO.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 text-[11px] font-bold uppercase tracking-wider text-[#795902] hover:text-[#3A000D] inline-flex items-center gap-1"
                      >
                        <span>Open in Maps</span>
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VISIT INVITATION BANNER */}
      <section className="w-full bg-[#FAEBE5] py-10 px-5 sm:px-6 lg:px-12 border-t border-[#C9A24B]/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#3A000D] text-[#FDD275] flex items-center justify-center shrink-0 shadow-sm">
              <Flame className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#3A000D]">
                Visit Hyderabadi Mehfil in Ilford
              </h3>
              <p className="text-sm sm:text-base text-[#554243]">
                Cooked slow in sealed handis with pure saffron, aged basmati rice, and fresh spices.
              </p>
            </div>
          </div>

          <a
            href={RESTAURANT_INFO.phoneHref}
            className="px-6 py-3 bg-[#5A0F1F] hover:bg-[#3A000D] text-[#FFF8F6] text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg transition-colors inline-flex items-center gap-2 shadow-sm shrink-0 whitespace-nowrap"
          >
            <Phone className="w-4 h-4 text-[#FFDF9E]" aria-hidden="true" />
            <span>Book a Table</span>
          </a>
        </div>
      </section>
    </div>
  );
}
