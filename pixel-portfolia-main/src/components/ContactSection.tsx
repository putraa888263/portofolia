import { useState, FormEvent } from 'react';
import { contactConfig, contactInfo } from '@/data/contact';
import { profileData } from '@/data/profile';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import PixelCard from './PixelCard';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch(contactConfig.formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const contactItems = [
    { icon: Mail, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
    { icon: Phone, label: 'Telepon', value: contactInfo.phone, href: `tel:${contactInfo.phone}` },
    { icon: MapPin, label: 'Lokasi', value: contactInfo.location },
    { icon: Clock, label: 'Jam Kerja', value: contactInfo.availability },
  ];

  return (
    <section id="contact" className="py-20 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-card via-background to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="font-pixel text-pixel-xs text-muted-foreground block mb-2">
            {'// HUBUNGI SAYA'}
          </span>
          <h2 className="font-pixel text-pixel-lg md:text-pixel-xl text-primary text-glow mb-4">
            GET IN TOUCH
          </h2>
          <p className="font-silkscreen text-muted-foreground max-w-2xl mx-auto">
            Tertarik untuk bekerjasama atau memiliki pertanyaan? Silakan hubungi saya!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div>
            <h3 className="font-pixel text-pixel-sm text-accent mb-6">
              {'>'} INFO KONTAK
            </h3>
            
            <div className="space-y-4 mb-8">
              {contactItems.map(({ icon: Icon, label, value, href }) => (
                <PixelCard key={label} className="flex items-center gap-4 p-4" hoverable={!!href}>
                  <div className="w-12 h-12 flex items-center justify-center border-2 border-primary bg-primary/10">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <div>
                    <span className="font-pixel text-pixel-xs text-muted-foreground block">
                      {label}
                    </span>
                    {href ? (
                      <a 
                        href={href} 
                        className="font-silkscreen text-foreground hover:text-primary transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="font-silkscreen text-foreground">{value}</span>
                    )}
                  </div>
                </PixelCard>
              ))}
            </div>

            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/${contactInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-btn w-full text-center block"
            >
              💬 CHAT WHATSAPP
            </a>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="font-pixel text-pixel-sm text-accent mb-6">
              {'>'} KIRIM PESAN
            </h3>

            <PixelCard hoverable={false}>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="font-pixel text-pixel-xs text-muted-foreground block mb-2">
                    NAMA *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-input border-2 border-border font-silkscreen text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                    placeholder="Nama Anda"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="font-pixel text-pixel-xs text-muted-foreground block mb-2">
                    EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-input border-2 border-border font-silkscreen text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                    placeholder="email@anda.com"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="font-pixel text-pixel-xs text-muted-foreground block mb-2">
                    SUBJEK
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-input border-2 border-border font-silkscreen text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                    placeholder="Subjek pesan"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="font-pixel text-pixel-xs text-muted-foreground block mb-2">
                    PESAN *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-input border-2 border-border font-silkscreen text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                    placeholder="Tulis pesan Anda..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="pixel-btn w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="animate-pulse">SENDING...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      KIRIM PESAN
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {status === 'success' && (
                  <div className="flex items-center gap-2 p-4 bg-primary/10 border-2 border-primary text-primary">
                    <CheckCircle size={20} />
                    <span className="font-silkscreen text-sm">{contactConfig.successMessage}</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="flex items-center gap-2 p-4 bg-destructive/10 border-2 border-destructive text-destructive">
                    <AlertCircle size={20} />
                    <span className="font-silkscreen text-sm">{contactConfig.errorMessage}</span>
                  </div>
                )}
              </form>
            </PixelCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
