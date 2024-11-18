import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { CreateCard } from './pages/CreateCard';
import { Leads } from './pages/Leads';
import { Button } from './components/ui/Button';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateCard />} />
            <Route path="/leads" element={<Leads />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="relative isolate">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Digital Business Cards for Modern Professionals
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Create, share, and track your digital business cards. Connect with prospects instantly through
          NFC, QR codes, or direct links. Perfect for teams and professionals.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button size="lg" onClick={() => window.location.href = '/create'}>Create Your Card</Button>
          <Button variant="outline" size="lg">
            View Demo
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;