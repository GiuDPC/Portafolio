import { useLanguage } from "../contexts/LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-lg text-sm font-semibold tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted/60 dark:hover:bg-white/5 transition-all duration-200 outline-none"
      aria-label="Toggle language"
    >
      {language.toUpperCase()}
    </button>
  );
}
