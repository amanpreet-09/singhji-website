export default function WhatsAppFloatButton({
  whatsapp
}: {
  whatsapp: string;
}) {
  return (
    <a
      href={`https://wa.me/${whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-maroon text-cream px-5 py-3 shadow-lg shadow-ink/20 transition-transform hover:scale-105"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5 fill-current"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.41-1.34a9.86 9.86 0 0 0 4.63 1.15h.01c5.46 0 9.9-4.45 9.9-9.9 0-2.65-1.03-5.13-2.9-7-1.87-1.87-4.35-2.91-7.01-2.91zm0 18.06h-.01a8.19 8.19 0 0 1-4.17-1.14l-.3-.18-3.09.81.82-3.02-.2-.31a8.14 8.14 0 0 1-1.25-4.31c0-4.51 3.67-8.18 8.2-8.18 2.19 0 4.25.85 5.8 2.4a8.14 8.14 0 0 1 2.4 5.79c0 4.51-3.68 8.14-8.2 8.14zm4.49-6.13c-.25-.12-1.45-.72-1.68-.8-.22-.08-.38-.12-.55.12-.16.25-.63.8-.77.96-.14.16-.28.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.46-1.37-1.71-.14-.25-.02-.38.11-.5.11-.11.25-.28.37-.42.12-.14.16-.25.25-.4.08-.16.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31s-.86.84-.86 2.05.88 2.38 1 2.55c.12.16 1.73 2.64 4.2 3.7.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.45-.59 1.66-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.47-.28z" />
      </svg>
      <span className="text-sm font-medium hidden sm:inline">Chat with us</span>
    </a>
  );
}
