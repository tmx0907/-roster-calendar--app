import Uploader from './components/Uploader'

export default function Home() {
  return (
    <main style={{
      padding: '4rem',
      fontFamily: 'Georgia, serif',
      backgroundColor: '#fff',
      color: '#111',
      maxWidth: '700px',
      margin: 'auto',
      lineHeight: 1.6,
    }}>
      <h1 style={{
        fontSize: '3rem',
        fontWeight: 'normal',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        borderBottom: '1px solid #ccc',
        paddingBottom: '0.5rem',
        marginBottom: '2rem'
      }}>
        Roster to Calendar
      </h1>
      <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
        Upload a roster image to automatically create an iPhone calendar file (.ics).
      </p>
      <Uploader />
    </main>
  )
}
