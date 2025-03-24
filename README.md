# Portfolio React Personale

![Banner Portfolio](https://via.placeholder.com/1200x400/0070f3/FFFFFF?text=Portfolio+React+Interattivo)

## 📋 Descrizione

Un portfolio personale moderno e interattivo realizzato con React. Presenta un design minimalista con animazioni fluide ed effetti interattivi che migliorano l'esperienza utente. Il portfolio è completamente responsive e offre sezioni per progetti, competenze e contatti.

## ✨ Caratteristiche principali

- **Design Moderno**: Interfaccia pulita con animazioni fluide e transizioni eleganti
- **Completamente Responsive**: Ottimizzato per dispositivi mobile, tablet e desktop
- **Sezione Progetti**: Showcase dei progetti con filtri per categoria e schede interattive
- **Visualizzazione Competenze**: Grafici animati per presentare le competenze tecniche
- **Form Contatti Interattivo**: Modulo di contatto con effetti particellari animati
- **Componenti Riutilizzabili**: Architettura modulare basata su componenti

## 🖼️ Screenshot

### Home Page
![Home Page](https://i.gyazo.com/7583496e384c75cbdc92155834ac3a0e.png)

### Sezione Competenze
![Competenze](https://drive.google.com/file/d/1jeG0TWNJqwoaAzFsTLVCYYBWhj9GaUPz/view?usp=sharing)

### Sezione Contatti
![Contatti](https://i.gyazo.com/6f656df24164180ffc9fd79a7a04053b.png)

## 🛠️ Tecnologie Utilizzate

- **React**: Framework JavaScript per UI
- **React Router**: Navigazione tra le pagine
- **Styled Components**: CSS-in-JS per lo styling
- **Framer Motion**: Libreria per animazioni avanzate
- **React Icons**: Icone SVG per l'interfaccia

## 🚀 Installazione e Avvio

```bash
# Clona il repository
git clone https://github.com/yourusername/portfolio-react.git

# Entra nella directory
cd portfolio-react

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm start
```

L'applicazione sarà disponibile all'indirizzo [http://localhost:3000](http://localhost:3000).

## 📱 Funzionalità Responsive

Il portfolio si adatta automaticamente a diverse dimensioni di schermo:

- **Desktop**: Esperienza completa con tutti gli effetti visivi
- **Tablet**: Layout adattato con navigazione ottimizzata per dispositivi touch
- **Mobile**: Versione compatta con menu hamburger e design ottimizzato per schermi piccoli

## 🎨 Personalizzazione

### Temi e Colori
Il portfolio utilizza variabili CSS per facilitare la personalizzazione dei colori:

```css
:root {
  --primary: #0070f3;
  --secondary: #6d28d9;
  --dark: #111827;
  --light: #f9fafb;
  --gray: #6b7280;
  --light-gray: #e5e7eb;
}
```

### Aggiungere Nuovi Progetti
Per aggiungere un nuovo progetto, modifica l'array dei progetti nel file `Projects.jsx`:

```jsx
const projects = [
  {
    id: 1,
    title: "Nuovo Progetto",
    description: "Descrizione del progetto...",
    image: "/path/to/image.jpg",
    category: "web",
    technologies: ["React", "Node.js", "MongoDB"],
    link: "https://example.com"
  },
  // altri progetti...
];
```

## 📝 Struttura del Progetto

```
src/
  |- components/       # Componenti riutilizzabili
  |- pages/            # Pagine principali
  |- assets/           # Immagini, font, etc.
  |- styles/           # Stili globali
  |- context/          # Context API (se utilizzato)
  |- App.js            # Componente principale
  |- index.js          # Entry point
```

## 🔗 Link alla Demo

[Demo live del portfolio](https://your-portfolio-url.com)

## 📄 Licenza

[MIT](LICENSE)

---

### 👨‍💻 Sviluppato da [Il tuo nome]

Connettiti con me:
- [LinkedIn](https://linkedin.com/in/yourusername)
- [GitHub](https://github.com/yourusername)
- [Twitter](https://twitter.com/yourusername)
