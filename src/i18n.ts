import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          button: {
            reply: 'Reply',
          },
          placeholder: {
            writeReply: 'Write a reply',
            createNewPost: "What's on your mind?",
          },
          backToHome: 'Back to Home',
          subheading: 'Post Anonymously',
          createNewPost: 'Create New Post',
          offline: 'You are offline',
          backOnline: 'You are back online!',
          toast: {
            postCreated: 'Post created!',
            generalError: 'Something went wrong',
          },
        },
      },
      id: {
        translation: {
          button: {
            reply: 'Kirim',
          },
          placeholder: {
            writeReply: 'Tulis komentar',
            createNewPost: 'Apa yang sedang kamu pikirkan?',
          },
          backToHome: 'Kembali ke Beranda',
          subheading: 'Posting Secara Anonim',
          createNewPost: 'Buat Postingan Baru',
          offline: 'Kamu sedang offline',
          backOnline: 'Kamu sudah online!',
          toast: {
            postCreated: 'Postingan berhasil dibuat!',
            generalError: 'Terjadi kesalahan',
          },
        },
      },
      de: {
        translation: {
          button: {
            reply: 'Antworten',
          },
          placeholder: {
            writeReply: 'Schreibe eine Antwort',
            createNewPost: 'Was denkst du gerade?',
          },
          backToHome: 'Zurück zur Startseite',
          subheading: 'Anonym posten',
          createNewPost: 'Neuen Beitrag erstellen',
          offline: 'Du bist offline',
          backOnline: 'Du bist wieder online!',
          toast: {
            postCreated: 'Beitrag erstellt!',
            generalError: 'Etwas ist schief gelaufen',
          },
        },
      },
    },
  })

export default i18n
