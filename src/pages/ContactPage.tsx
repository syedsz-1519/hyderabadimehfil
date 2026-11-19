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
    <div className="flex flex-col w-full bg-[#FAF5EA] dark:bg-[#1A171D] transition-colors">
      {/* 1. TOP HEADER BANNER */}
      <section className="relative w-full bg-[#18151B] text-[#F7F1E3] overflow-hidden py-16 lg:py-24 shadow-lg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <ResilientImage
            src={RESTAURANT_INFO.contactHeroImageUrl}
            alt="Warm evening dining room interior at Hyderabadi Mehfil in Ilford with brass pendant lighting"
            eager
            className="w-full h-full object-cover object-center opacity-85"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#1A171D]/88 via-[#1A171D]/45 to-[#18151B]/35 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(24,21,27,0.46)_0%,transparent_72%)] pointer-events-none"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 lg:px-12 text-center flex flex-col items-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 sm:w-12 h-px bg-gradient-to-r from-transparent to-[#ECC55F]" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#ECC55F] font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.75)]">
              290 Ilford Lane · London IG1 2LP
            </span>
            <span className="w-10 sm:w-12 h-px bg-gradient-to-l from-transparent to-[#ECC55F]" />
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F7F1E3] tracking-tight mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.75)]">
            CONTACT US
          </h1>

          <p className="text-base sm:text-lg text-[#F7F1E3] max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">
            We would love to welcome you to our restaurant in Ilford, London.
          </p>

          <div className="mt-7 flex items-center justify-center gap-2">
            <span className="w-20 h-px bg-[#ECC55F]/55" />
            <div className="w-2.5 h-2.5 rotate-45 border-2 border-[#ECC55F] bg-[#18151B]" />
            <span className="w-20 h-px bg-[#ECC55F]/55" />
          </div>
        </div>
      </section>

      {/* 2. AMBIENT PHOTO VIGNETTE BAND */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 -mt-7 relative z-20">
        <div className="bg-white dark:bg-[#27222C] rounded-xl shadow-lg overflow-hidden p-3 lg:p-4 grid grid-cols-1 md:grid-cols-3 gap-3 border border-[#D4AF37]/35">
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#141217]/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs uppercase tracking-wider text-[#F7F1E3] font-bold">
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
            <div className="bg-white dark:bg-[#27222C] rounded-xl p-6 sm:p-8 lg:p-10 shadow-md border border-[#D4AF37]/35 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2 pt-1">
                <Mail className="w-4 h-4 text-[#9A6B10] dark:text-[#ECC55F]" aria-hidden="true" />
                <span className="text-xs uppercase tracking-[0.2em] text-[#9A6B10] dark:text-[#ECC55F] font-bold">
                  Direct Inquiry
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F1A17] dark:text-[#F7F1E3] mb-3">
                SEND US A MESSAGE
              </h2>

              <p className="text-sm sm:text-base text-[#4E4237] dark:text-[#D8CFC4] mb-7 leading-relaxed">
                Whether inquiring about table bookings, group catering, or takeaway orders, our team
                is happy to help.
              </p>

              <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Your name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="userName"
                    className="text-xs sm:text-sm font-semibold text-[#1F1A17] dark:text-[#F7F1E3] uppercase tracking-wide"
                  >
                    Your name
                  </label>
                  <div className="relative flex items-center">
                    <User
                      className="w-4 h-4 absolute left-4 text-[#9A6B10] dark:text-[#ECC55F] pointer-events-none"
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
                      className="w-full bg-[#FAF5EA] dark:bg-[#1B181F] border border-[#D4AF37]/35 dark:border-[#D4AF37]/30 text-[#1F1A17] dark:text-[#F7F1E3] placeholder:text-[#8A7968] dark:placeholder:text-[#B4A89B] text-sm sm:text-base pl-11 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 dark:focus:ring-[#F0C75E]/35 focus:border-[#9A6B10] dark:focus:border-[#F0C75E] transition-all"
                    />
                  </div>
                  {errors.name && (
                    <p role="alert" className="text-xs font-medium text-[#B91C1C] dark:text-[#FCA5A5]">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Your email */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="userEmail"
                    className="text-xs sm:text-sm font-semibold text-[#1F1A17] dark:text-[#F7F1E3] uppercase tracking-wide"
                  >
                    Your email
                  </label>
                  <div className="relative flex items-center">
                    <AtSign
                      className="w-4 h-4 absolute left-4 text-[#9A6B10] dark:text-[#ECC55F] pointer-events-none"
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
                      className="w-full bg-[#FAF5EA] dark:bg-[#1B181F] border border-[#D4AF37]/35 dark:border-[#D4AF37]/30 text-[#1F1A17] dark:text-[#F7F1E3] placeholder:text-[#8A7968] dark:placeholder:text-[#B4A89B] text-sm sm:text-base pl-11 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 dark:focus:ring-[#F0C75E]/35 focus:border-[#9A6B10] dark:focus:border-[#F0C75E] transition-all"
                    />
                  </div>
                  {errors.email && (
                    <p role="alert" className="text-xs font-medium text-[#B91C1C] dark:text-[#FCA5A5]">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="userSubject"
                    className="text-xs sm:text-sm font-semibold text-[#1F1A17] dark:text-[#F7F1E3] uppercase tracking-wide"
                  >
                    Subject
                  </label>
                  <div className="relative flex items-center">
                    <MessageSquare
                      className="w-4 h-4 absolute left-4 text-[#9A6B10] dark:text-[#ECC55F] pointer-events-none"
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
                      className="w-full bg-[#FAF5EA] dark:bg-[#1B181F] border border-[#D4AF37]/35 dark:border-[#D4AF37]/30 text-[#1F1A17] dark:text-[#F7F1E3] placeholder:text-[#8A7968] dark:placeholder:text-[#B4A89B] text-sm sm:text-base pl-11 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 dark:focus:ring-[#F0C75E]/35 focus:border-[#9A6B10] dark:focus:border-[#F0C75E] transition-all"
                    />
                  </div>
                  {errors.subject && (
                    <p role="alert" className="text-xs font-medium text-[#B91C1C] dark:text-[#FCA5A5]">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Your message (optional) */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-baseline">
                    <label
                      htmlFor="userMessage"
                      className="text-xs sm:text-sm font-semibold text-[#1F1A17] dark:text-[#F7F1E3] uppercase tracking-wide"
                    >
                      Your message (optional)
                    </label>
                    <span className="text-xs text-[#6B5B4E] dark:text-[#B4A89B] font-medium">
                      Optional
                    </span>
                  </div>
                  <textarea
                    id="userMessage"
                    name="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message..."
                    className="w-full bg-[#FAF5EA] dark:bg-[#1B181F] border border-[#D4AF37]/35 dark:border-[#D4AF37]/30 text-[#1F1A17] dark:text-[#F7F1E3] placeholder:text-[#8A7968] dark:placeholder:text-[#B4A89B] text-sm sm:text-base p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 dark:focus:ring-[#F0C75E]/35 focus:border-[#9A6B10] dark:focus:border-[#F0C75E] transition-all resize-y"
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-gradient-to-r from-[#C99B35] via-[#F0C75E] to-[#D4A63B] text-[#1D1810] text-sm font-bold uppercase tracking-wider rounded-lg shadow-md hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A6B10] dark:focus-visible:outline-[#F7F1E3]"
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
                    className="mt-2 p-4 rounded-lg bg-[#F2E9D6] dark:bg-[#1D1921] border border-[#D4AF37]/50 text-[#1F1A17] dark:text-[#F7F1E3] text-sm flex items-start gap-3 shadow-xs"
                  >
                    <CheckCircle2
                      className="w-5 h-5 text-[#9A6B10] dark:text-[#ECC55F] shrink-0 mt-0.5"
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
                        className="mt-1.5 text-xs font-bold uppercase tracking-wider text-[#9A6B10] dark:text-[#ECC55F] hover:underline cursor-pointer"
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
              <div className="bg-white dark:bg-[#27222C] rounded-xl p-6 shadow-xs border border-[#D4AF37]/30 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#FAF5EA] dark:bg-[#18151B] border border-[#D4AF37]/45 text-[#9A6B10] dark:text-[#ECC55F] flex items-center justify-center mb-4">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="text-[11px] uppercase tracking-widest text-[#9A6B10] dark:text-[#ECC55F] font-bold block mb-1">
                    ADDRESS
                  </span>
                  <p className="font-serif text-xl font-semibold text-[#1F1A17] dark:text-[#F7F1E3]">
                    {RESTAURANT_INFO.addressLine1}
                  </p>
                  <p className="text-sm sm:text-base text-[#4E4237] dark:text-[#D8CFC4] mb-4">
                    {RESTAURANT_INFO.addressLine2}
                  </p>
                </div>
                <a
                  href={RESTAURANT_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9A6B10] hover:text-[#1F1A17] dark:text-[#ECC55F] dark:hover:text-[#F7F1E3] uppercase transition-colors mt-2"
                >
                  <span>Get Directions</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>

              {/* Phone Card */}
              <div className="bg-white dark:bg-[#27222C] rounded-xl p-6 shadow-xs border border-[#D4AF37]/30 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#FAF5EA] dark:bg-[#18151B] border border-[#D4AF37]/45 text-[#9A6B10] dark:text-[#ECC55F] flex items-center justify-center mb-4">
                    <Phone className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="text-[11px] uppercase tracking-widest text-[#9A6B10] dark:text-[#ECC55F] font-bold block mb-1">
                    PHONE
                  </span>
                  <a
                    href={RESTAURANT_INFO.phoneHref}
                    className="font-serif text-xl font-semibold text-[#1F1A17] hover:text-[#9A6B10] dark:text-[#F7F1E3] dark:hover:text-[#ECC55F] transition-colors block mb-2 tabular-nums"
                  >
                    {RESTAURANT_INFO.phoneDisplay}
                  </a>
                  <p className="text-sm text-[#4E4237] dark:text-[#D8CFC4]">
                    Direct line for table reservations and fresh takeaway orders.
                  </p>
                </div>
                <a
                  href={RESTAURANT_INFO.phoneHref}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9A6B10] hover:text-[#1F1A17] dark:text-[#ECC55F] dark:hover:text-[#F7F1E3] uppercase transition-colors mt-4"
                >
                  <PhoneForwarded className="w-4 h-4" aria-hidden="true" />
                  <span>Tap to Call</span>
                </a>
              </div>

              {/* Opening Hours Card */}
              <div className="bg-white dark:bg-[#27222C] rounded-xl p-6 shadow-xs border border-[#D4AF37]/30 sm:col-span-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-[#FAF5EA] dark:bg-[#18151B] border border-[#D4AF37]/45 text-[#9A6B10] dark:text-[#ECC55F] flex items-center justify-center mb-3">
                      <Clock className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="text-[11px] uppercase tracking-widest text-[#9A6B10] dark:text-[#ECC55F] font-bold block mb-2">
                      OPENING HOURS
                    </span>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#9A6B10] dark:text-[#ECC55F]">
                    Fresh Dum Daily
                  </span>
                </div>

                <div className="space-y-3 mt-2 text-sm sm:text-base">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#D4AF37]/25 dark:border-[#D4AF37]/20">
                    <span className="text-[#4E4237] dark:text-[#D8CFC4] font-semibold">
                      Every day except Friday:
                    </span>
                    <span className="text-[#1F1A17] dark:text-[#F7F1E3] font-bold">
                      12 Noon – 11 PM
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <span className="text-[#4E4237] dark:text-[#D8CFC4] font-semibold">
                      Friday:
                    </span>
                    <span className="text-[#1F1A17] dark:text-[#F7F1E3] font-bold">
                      2 PM – 11 PM
                    </span>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-white dark:bg-[#27222C] rounded-xl p-6 shadow-xs border border-[#D4AF37]/30 sm:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-[#FAF5EA] dark:bg-[#18151B] border border-[#D4AF37]/45 text-[#9A6B10] dark:text-[#ECC55F] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] uppercase tracking-widest text-[#9A6B10] dark:text-[#ECC55F] font-bold block">
                      EMAIL
                    </span>
                    <a
                      href={RESTAURANT_INFO.emailHref}
                      className="text-base sm:text-lg text-[#1F1A17] hover:text-[#9A6B10] dark:text-[#F7F1E3] dark:hover:text-[#ECC55F] font-semibold transition-colors block truncate"
                    >
                      {RESTAURANT_INFO.email}
                    </a>
                  </div>
                </div>
                <a
                  href={RESTAURANT_INFO.emailHref}
                  className="self-start sm:self-auto px-4 py-2 bg-[#FAF5EA] hover:bg-[#F2E9D6] dark:bg-[#18151B] dark:hover:bg-[#322B39] border border-[#D4AF37]/45 text-[#9A6B10] dark:text-[#ECC55F] text-xs font-bold uppercase rounded-lg transition-colors shrink-0"
                >
                  Write Email
                </a>
              </div>
            </div>

            {/* Embedded Google Map Card */}
            <div className="bg-white dark:bg-[#27222C] rounded-xl p-4 shadow-xs border border-[#D4AF37]/30 flex flex-col gap-3">
              <div className="flex items-center justify-between px-1 pt-1">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#9A6B10] dark:text-[#ECC55F]" aria-hidden="true" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1F1A17] dark:text-[#F7F1E3]">
                    FIND US IN ILFORD
                  </span>
                </div>
                <span className="text-xs text-[#6B5B4E] dark:text-[#B4A89B] font-medium">
                  East London
                </span>
              </div>

              <div className="w-full h-72 rounded-lg relative overflow-hidden flex flex-col justify-between p-4 border border-[#D4AF37]/30 bg-[#1B181F]">
                <iframe
                  title="Map showing 290 Ilford Lane, Ilford, IG1 2LP"
                  src={RESTAURANT_INFO.mapsEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full border-0"
                />

                <div className="relative z-10 flex justify-end pointer-events-none">
                  <span className="bg-[#18151B]/90 text-[#F7F1E3] backdrop-blur-md px-3 py-1 rounded-md text-xs uppercase font-semibold tracking-wider flex items-center gap-1.5 shadow-sm border border-[#D4AF37]/45">
                    <Navigation className="w-3.5 h-3.5 text-[#ECC55F]" aria-hidden="true" />
                    <span>IG1 2LP</span>
                  </span>
                </div>

                <div className="relative z-10 bg-[#18151B]/95 backdrop-blur-md p-4 rounded-lg shadow-lg max-w-sm border border-[#D4AF37]/45">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#27222C] border border-[#D4AF37]/45 text-[#ECC55F] flex items-center justify-center shrink-0">
                      <Utensils className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-base font-semibold text-[#F7F1E3] leading-tight">
                        {RESTAURANT_INFO.name}
                      </h3>
                      <p className="text-xs text-[#D8CFC4] truncate mt-0.5">
                        {RESTAURANT_INFO.fullAddress}
                      </p>
                      <a
                        href={RESTAURANT_INFO.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 text-[11px] font-bold uppercase tracking-wider text-[#ECC55F] hover:text-[#F7F1E3] inline-flex items-center gap-1"
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
      <section className="w-full bg-[#F2E9D6] dark:bg-[#211D25] py-10 px-5 sm:px-6 lg:px-12 border-t border-[#D4AF37]/25 dark:border-[#D4AF37]/20 transition-colors">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white dark:bg-[#18151B] border border-[#D4AF37]/45 text-[#9A6B10] dark:text-[#ECC55F] flex items-center justify-center shrink-0 shadow-sm">
              <Flame className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#1F1A17] dark:text-[#F7F1E3]">
                Visit Hyderabadi Mehfil in Ilford
              </h3>
              <p className="text-sm sm:text-base text-[#4E4237] dark:text-[#D8CFC4]">
                Cooked slow in sealed handis with pure saffron, aged basmati rice, and fresh spices.
              </p>
            </div>
          </div>

          <a
            href={RESTAURANT_INFO.phoneHref}
            className="px-6 py-3 bg-gradient-to-r from-[#C99B35] via-[#F0C75E] to-[#D4A63B] text-[#1D1810] text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg hover:brightness-110 transition-all inline-flex items-center gap-2 shadow-sm shrink-0 whitespace-nowrap"
          >
            <Phone className="w-4 h-4 text-[#1D1810]" aria-hidden="true" />
            <span>Book a Table</span>
          </a>
        </div>
      </section>
    </div>
  );
}
