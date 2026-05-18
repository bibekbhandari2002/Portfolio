import { useState, useRef, FormEvent, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Lock, MapPin, Mail, Linkedin, Github, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

const RATE_LIMIT_KEY = 'contact_last_submit';
const RATE_LIMIT_MS = 60_000; // 1 minute


export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  



  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  const lastSubmit = Number(localStorage.getItem(RATE_LIMIT_KEY));
if (lastSubmit && Date.now() - lastSubmit < RATE_LIMIT_MS) {
  setSubmitStatus('error');
  setIsSubmitting(false);
  return;
}
  setIsSubmitting(true);
  setSubmitStatus('idle');

  const form = formRef.current;
  if (!form) {
    setIsSubmitting(false);
    return;
  }

  const formData = new FormData(form);

  // (3) Honeypot check
  const company = formData.get('company') as string;
  if (company) {
    // Bot detected – silently exit
    setIsSubmitting(false);
    return;
  }

  try {
    // (Optional) Fetch IP + location (unchanged)
    let ip = '', city = '', country = '';
    try {
      const res = await fetch('https://ipapi.co/json/');
      const data = await res.json();
      ip = data.ip;
      city = data.city;
      country = data.country_name;
    } catch {}

    // Attach extra fields to form for EmailJS
    formData.append('ip', ip);
    formData.append('location', `${city}, ${country}`);

    await emailjs.sendForm(
  SERVICE_ID,
  TEMPLATE_ID,
  form,
  PUBLIC_KEY
);


    setSubmitStatus('success');
    localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
    form.reset();
  } catch (error) {
    console.error('Form submission error:', error);
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
  }
};



  return (
    <section id="contact" className="relative py-24">
      <div className="absolute inset-0 hex-pattern opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded border border-primary/30 bg-primary/5 mb-4">
            <Lock className="w-4 h-4 text-primary" />
            <span className="font-terminal text-sm text-primary">ENCRYPTED CHANNEL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-2">
            TRANSMISSION <span className="text-primary">CONSOLE</span>
          </h2>
          <p className="font-terminal text-muted-foreground">Deploy your thoughts here</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-6 rounded-lg cyber-border bg-card/50 backdrop-blur-sm">
              <h3 className="font-orbitron font-bold text-foreground mb-2">
                Ping me <span className="text-primary">with a message</span>
              </h3>
              
              <form 
                ref={formRef}
                onSubmit={handleSubmit}
                name="contactus"
                method="POST"
                data-netlify="true"
                className="space-y-4 mt-6"
                
              >
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                />
                <input type="hidden" name="form-name" value="contactus" />
                
                <div>
                  <label htmlFor="name" className="block font-terminal text-sm text-muted-foreground mb-2">
                    Your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-3 rounded bg-input border border-border font-terminal text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-terminal text-sm text-muted-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    className="w-full px-4 py-3 rounded bg-input border border-border font-terminal text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-terminal text-sm text-muted-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded bg-input border border-border font-terminal text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded bg-primary text-primary-foreground font-terminal font-bold hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      TRANSMITTING...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      &gt; Send
                    </>
                  )}
                </motion.button>

                {/* Status messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-accent font-terminal text-sm"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Submitted Successfully!
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-destructive font-terminal text-sm"
                  >
                    <XCircle className="w-4 h-4" />
                    Transmission failed. Please try again.
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Information */}
            <div className="p-6 rounded-lg cyber-border bg-card/50 backdrop-blur-sm">
              <h4 className="font-orbitron font-bold text-foreground mb-4">Information</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 font-terminal text-sm text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  Andhra Pradesh, India
                </li>
                <li className="flex items-center gap-3 font-terminal text-sm">
                  <Mail className="w-5 h-5 text-primary" />
                  <a 
                    href="mailto:bibekavi22@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    bibekavi22@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick links */}
            <div className="p-6 rounded-lg cyber-border bg-card/50 backdrop-blur-sm">
              <h4 className="font-orbitron font-bold text-foreground mb-4">Quick Navigation</h4>
              <div className="grid grid-cols-2 gap-2">
                {['About', 'Research', 'Projects', 'Skills', 'Certifications', 'Achievements'].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="font-terminal text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    &gt; {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="p-6 rounded-lg cyber-border bg-card/50 backdrop-blur-sm">
              <h4 className="font-orbitron font-bold text-foreground mb-4">Connect</h4>
              <div className="flex gap-4">
                <motion.a
                  href="https://www.linkedin.com/in/bibek-bhandari/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded border border-border bg-input hover:border-primary hover:text-primary transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://github.com/abhinavbibek"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded border border-border bg-input hover:border-primary hover:text-primary transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-8 border-t border-border text-center"
        >
          <p className="font-terminal text-sm text-muted-foreground">
            <span className="text-primary">©</span> {new Date().getFullYear()} Bibek Bhandari. All systems secured.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
