// src/BoostCupTournament.jsx
import React, { useState, useEffect } from 'react';
import { Trophy, Calendar, Users, MapPin, Clock, Star, Zap, Target, Award, Sparkles, GamepadIcon, TrendingUp } from 'lucide-react';
import { FaDiscord, FaTwitch } from 'react-icons/fa';

// Importiere die TournamentBracket-Komponente
import TournamentBracket from './Components/TournamentBracket';
import RegistrationModal from './Components/RegistrationModal';

const BoostCupTournament = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false); // Hinzufügen

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100, 
        y: (e.clientY / window.innerHeight) * 100 
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Tournament bracket data
  const [bracketData, setBracketData] = useState({
    quarterfinals: [
      { team1: 'Auslosung', team2: 'Auslosung', score1: "-", score2: "-", winner: null },
      { team1: 'Auslosung', team2: 'Auslosung', score1: "-", score2: "-", winner: null },
      { team1: 'Auslosung', team2: 'Auslosung', score1: "-", score2: "-", winner: null },
      { team1: 'Auslosung', team2: 'Auslosung', score1: "-", score2: "-", winner: null }
    ],
    semifinals: [
      // Diese sollten dynamisch aus den Viertelfinals resultieren
      { team1: 'Sieger VF 1', team2: 'Sieger VF 2', score1: null, score2: null, winner: null },
      { team1: 'Sieger VF 3', team2: 'Sieger VF 4', score1: null, score2: null, winner: null },
    ],
    final: [
      { team1: 'Sieger HF1', team2: 'Sieger HF2', score1: null, score2: null, winner: null }
    ],
    thirdPlace: [
      { team1: 'Verlierer HF1', team2: 'Verlierer HF2', score1: null, score2: null, winner: null }
    ],
    champion: 'TBD' // Einzelner Wert für den Champion
  });

  // Example of how you might update semifinals based on quarterfinals results
  useEffect(() => {
    const newSemifinals = [...bracketData.semifinals];
    
    // Match 1 of Semifinals
    if (bracketData.quarterfinals[0].winner && bracketData.quarterfinals[1].winner) {
      newSemifinals[0] = {
        ...newSemifinals[0],
        team1: bracketData.quarterfinals[0].winner,
        team2: bracketData.quarterfinals[1].winner,
      };
    }

    // Match 2 of Semifinals
    if (bracketData.quarterfinals[2].winner && bracketData.quarterfinals[3].winner) {
      newSemifinals[1] = {
        ...newSemifinals[1],
        team1: bracketData.quarterfinals[2].winner,
        team2: bracketData.quarterfinals[3].winner,
      };
    }

    // Only update if changes occurred to prevent infinite loop
    if (JSON.stringify(newSemifinals) !== JSON.stringify(bracketData.semifinals)) {
      setBracketData(prev => ({ ...prev, semifinals: newSemifinals }));
    }

  }, [bracketData.quarterfinals]);

  useEffect(() => {
    if (isRegistrationModalOpen) {
      document.body.style.overflow = 'hidden'; // Scrollen verhindern
    } else {
      document.body.style.overflow = ''; // Scrollen wieder erlauben
    }

    // Cleanup-Funktion, um sicherzustellen, dass overflow zurückgesetzt wird
    return () => {
      document.body.style.overflow = '';
    };
  }, [isRegistrationModalOpen]); // Abhä


const teams = [
    { name: 'AREAL MC 1988', players: ['TomatoSpin', 'Nico'], rank: 'Team A', color: 'from-cyan-500 to-blue-600' },
    { name: '-', players: ["frei", "frei"], rank: 'Team B', color: 'from-purple-500 to-pink-600' }, // Adjusted
    { name: '-', players: ["frei", "frei"], rank: 'Team C', color: 'from-green-500 to-emerald-600' }, // Adjusted
    { name: '-', players: ["frei", "frei"], rank: 'Team D', color: 'from-orange-500 to-red-600' }, // Adjusted
    { name: '-', players: ["frei", "frei"], rank: 'Team E', color: 'from-yellow-500 to-orange-600' }, // Adjusted
    { name: '-', players: ["frei", "frei"], rank: 'Team F', color: 'from-indigo-500 to-purple-600' }, // Adjusted
    { name: '-', players: ["frei", "frei"], rank: 'Team G', color: 'from-teal-500 to-cyan-600' }, // Adjusted
    { name: '-', players: ["frei", "frei"], rank: 'Team H', color: 'from-rose-500 to-pink-600' } // Adjusted
  ];

const schedule = [
    // --- Qualifikationsrunde (16 Teams -> 8 Gewinner) ---
    { round: 'Qualifikation Match 1', teams: 'Auslosung vs. Auslosung', date: '26. Juni 2025', time: '17:00', result: '-', status: 'Kommend' },
    { round: 'Qualifikation Match 2', teams: 'Auslosung vs. Auslosung', date: '26. Juni 2025', time: '17:30', result: '-', status: 'Geplant' },
    { round: 'Qualifikation Match 3', teams: 'Auslosung vs. Auslosung', date: '26. Juni 2025', time: '18:00', result: '-', status: 'Geplant' },
    { round: 'Qualifikation Match 5', teams: 'Auslosung vs. Auslosung', date: '26. Juni 2025', time: '18:30', result: '-', status: 'Geplant' },
    { round: 'Qualifikation Match 6', teams: 'Auslosung vs. Auslosung', date: '26. Juni 2025', time: '19:00', result: '-', status: 'Geplant' },
    { round: 'Qualifikation Match 7', teams: 'Auslosung vs. Auslosung', date: '26. Juni 2025', time: '19:30', result: '-', status: 'Geplant' },
    { round: 'Qualifikation Match 8', teams: 'Auslosung vs. Auslosung', date: '26. Juni 2025', time: '20:00', result: '-', status: 'Geplant' },
    { round: 'Qualifikation Match 9', teams: 'Auslosung vs. Auslosung', date: '26. Juni 2025', time: '20:30', result: '-', status: 'Geplant' },

    // --- Viertelfinale (basierend auf Qualifikations-Gewinnern) ---
    { round: 'Viertelfinale 1', teams: 'Sieger Quali M1 vs. Sieger Quali M2', date: 'TBA', time: 'TBA', result: '-', status: 'Geplant' },
    { round: 'Viertelfinale 2', teams: 'Sieger Quali M3 vs. Sieger Quali M4', date: 'TBA', time: 'TBA', result: '-', status: 'Geplant' }, // Beispiel: Ergebnis noch nicht eingetragen
    { round: 'Viertelfinale 3', teams: 'Sieger Quali M5 vs. Sieger Quali M6', date: 'TBA', time: 'TBA', result: '-', status: 'Geplant' },
    { round: 'Viertelfinale 4', teams: 'Sieger Quali M7 vs. Sieger Quali M8', date: 'TBA', time: 'TBA', result: '-', status: 'Geplant' },

    // --- Halbfinale ---
    { round: 'Halbfinale 1', teams: 'Sieger VF 1 vs. Sieger VF 2', date: 'TBA', time: 'TBA', result: '-', status: 'Geplant' },
    { round: 'Halbfinale 2', teams: 'Sieger VF 3 vs. Sieger VF 4', date: 'TBA', time: 'TBA', result: '-', status: 'Geplant' },

    // --- Finale & Spiel um Platz 3 ---
    { round: 'Spiel um Platz 3', teams: 'Verlierer HF1 vs. Verlierer HF2', date: 'TBA', time: 'TBA', result: '-', status: 'Geplant' },
    { round: 'Finale', teams: 'Sieger HF1 vs. Sieger HF2', date: 'TBA', time: 'TBA', result: '-', status: 'Geplant' }
  ];

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all duration-300 overflow-hidden ${
        activeTab === id
          ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25 scale-105'
          : 'bg-white/5 backdrop-blur-sm text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
      }`}
    >
      {/* Hintergrund muss Z-Index 0 haben */}
      {activeTab === id && (
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 animate-pulse"></div>
      )}

      {/* Inhalt immer über dem Hintergrund */}
      <div className="relative z-10 flex items-center gap-3">
        <Icon size={22} />
        {label}
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Dynamic Background Effects */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`
        }}
      ></div>
      
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Header */}
      <header className="relative z-10 bg-gradient-to-r from-slate-900/80 via-purple-900/80 to-slate-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Zap className="text-white animate-pulse" size={28} />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Boost Cup
                </h1>
                <p className="text-gray-400 font-medium">Rocket League Tournament</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-sm text-gray-400 font-medium">Preis</div>
                <div className="text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Winner Reward Pack</div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur opacity-75"></div>
                <Trophy className="relative text-yellow-400" size={40} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="relative z-10 bg-gradient-to-r from-slate-900/60 via-purple-900/60 to-slate-900/60 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-6 py-6">
        <div className="w-full overflow-x-auto sm:overflow-visible">
          <div className="flex gap-6 min-w-max justify-center">
            <TabButton id="home" label="Übersicht" icon={Trophy} />
            <TabButton id="bracket" label="Turnierbaum" icon={Target} />
            <TabButton id="teams" label="Teams" icon={Users} />
            <TabButton id="schedule" label="Spielplan" icon={Calendar} />
          </div>
        </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-12">
        {activeTab === 'home' && (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="text-center py-20 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl blur-3xl"></div>
              <div className="relative">
                <h2 className="text-7xl font-black text-white mb-6 leading-tight">
                  Willkommen zum 1.{' '}
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                    Boost Cup
                  </span>
                </h2>
                <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium">
                  Das ultimative Rocket League Turnier für alle! 
                  Spektakuläre Matches, unglaubliche Plays und ein <b>Winner Reward Pack</b> warten auf die besten Teams!
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setIsRegistrationModalOpen(true)} // hier Modal oder Redirect
                    className="group relative flex items-center gap-3 mt-5 px-8 py-4 rounded-2xl font-bold transition-all duration-300 overflow-hidden
                      bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-blue-400/40 hover:scale-105
                      cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition duration-300 z-0" />
                    <div className="relative z-10 flex items-center gap-2">
                      <Users className="text-white" size={22} />
                      <span className="text-lg font-semibold">Team anmelden</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>



            {/* Tournament Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Calendar,
                  title: 'Turnierdaten',
                  color: 'from-cyan-500 to-blue-500',
                  details: [
                    { label: 'Auslosung', value: '25. Juni 2025' },
                    { label: 'Quali/Turnier', value: '26. Juni 2025' },
                    { label: 'Format', value: '2v2 Elimination' }
                  ]
                },
                {
                  icon: Users,
                  title: 'Teilnehmer',
                  color: 'from-purple-500 to-pink-500',
                  details: [
                    { label: 'Teams', value: '8 Teams' },
                    { label: 'Spieler', value: '16 Spieler' },
                    { label: 'Mindestrank', value: 'Diamond I' }
                  ]
                },
                {
                  icon: Award,
                  title: 'Preise',
                  color: 'from-yellow-500 to-orange-500',
                  details: [
                    { label: '1. Platz', value: 'Winner Reward Pack' },
                    { label: '2. Platz', value: 'Discord Rank "2. Platz"' },
                    { label: '3. Platz', value: 'Auto-Quali' }
                  ]
                },
              ].map((card, idx) => (
                <div key={idx} className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${card.color} rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500`}></div>
                  <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`p-3 bg-gradient-to-r ${card.color} rounded-2xl shadow-lg`}>
                        <card.icon className="text-white" size={28} />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{card.title}</h3>
                    </div>
                    <div className="space-y-4">
                      {card.details.map((detail, detailIdx) => (
                        <div key={detailIdx} className="flex justify-between items-center">
                          <span className="text-gray-400 font-medium">{detail.label}:</span>
                          <span className="text-white font-bold">{detail.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

      <section className="relative z-10 py-12 bg-gradient-to-r from-slate-900/60 via-purple-900/60 to-slate-900/60 backdrop-blur-xl border-t border-b border-white/5">
            <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            Folge Uns!
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Bleib immer auf dem Laufenden über Turniere, Neuigkeiten und exklusive Inhalte. Trete unserer Community bei und verpasse nichts!
          </p>
          <div className="flex justify-center gap-8">
            <a
              href="https://discord.gg/2Jzgb5Zugd" // Ersetze dies durch deinen tatsächlichen Discord-Einladungslink
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 overflow-hidden
                         bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg hover:shadow-indigo-400/40 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition duration-300 z-0" />
              <div className="relative z-10 flex items-center gap-3">
              <FaDiscord className="w-6 h-6" />
                Discord
              </div>
            </a>
            <a
              href="https://www.twitch.tv/rl_boostcup" // Ersetze dies durch deinen tatsächlichen Twitch-Kanal
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 overflow-hidden
                         bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-purple-400/40 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition duration-300 z-0" />
              <div className="relative z-10 flex items-center gap-3">
              <FaTwitch className="w-6 h-6" />    
                Twitch
              </div>
            </a>
          </div>
        </div>
        </section>

           <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-5xl font-black bg-gradient-to-r leading-tight from-green-400 via-teal-400 to-blue-400 bg-clip-text text-transparent mb-4">
                  Häufig gestellte Fragen
                </h2>
                <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    question: "Wie melde ich mein Team an?",
                    answer: "Melde dein Team einfach über unser Online-Formular an. Nach kurzer Überprüfung erhältst du deine Teilnahmebestätigung per E-Mail.",
                  },
                  {
                    question: "Gibt es eine Teilnahmegebühr?",
                    answer: "Nein, die Teilnahme am Boost Cup ist absolut kostenlos! Wir möchten, dass jeder die Chance hat, mitzumachen.",
                  },
                  {
                    question: "Welche Ränge sind für die Teilnahme erlaubt?",
                    answer: "Spieler müssen mindestens den Rang Diamond I erreicht haben, um am Turnier teilnehmen zu können.",
                  },
                  {
                    question: "Wo kann ich den Turnierbaum und die Ergebnisse einsehen?",
                    answer: "Der aktuelle Turnierbaum und alle Spielergebnisse werden live unter dem Reiter 'Turnierbaum' und 'Spielplan' aktualisiert. Schaut regelmäßig vorbei!",
                  },
                  {
                    question: "Wie wird der Preis ausgezahlt?",
                    answer: "Das 'Winner Reward Pack' wird in Form von Sachpreisen und/oder Gutscheinen an das Gewinnerteam überreicht. Details dazu werden noch bekannt gegeben.",
                  },
                  {
                    question: "Was passiert, wenn ein Team nicht antritt?",
                    answer: "Teams, die nicht zu ihren geplanten Matches erscheinen, werden disqualifiziert und für die nächsten drei Turniere gesperrt.",
                  },
                  {
                    question: "Wie sind die Preise verteilt?",
                    answer: "Der Turniersieger erhält nicht nur die Prämie für den ersten Platz, sondern zusätzlich die Prämien für den zweiten und dritten Platz. Das Team auf Platz 2 bekommt seine eigene Prämie sowie die Prämie für den dritten Platz",
                  },
                  {
                    question: "Ist man auf den ersten 3 Plätzen direkt für das nächste Turnier qualifizert?",
                    answer: "Ja die ersten 3, werden (in Boost Cup 1) automatisch qualifiziert für das nächste Turnier",
                  },
                  {
                    question: "Sind Turniere immer so kurz wie der Boost Cup 1?",
                    answer: "Nein, da wir noch nicht groß genug sind um Gruppenphasen zu spielen, wurde das auf diese Größe im Boost Cup 1 reduziert.",
                  },
                  {
                    question: "Wird das Turnier übertragen und darf man es auch streamen?",
                    answer: "Das Turnier wird auf Twitch (@rl_boostcup) übertragen. Ja, man darf Boost Cup 1 streamen.",
                  },
                ].map((faq, idx) => (
                  <div key={idx} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                    <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]">
                      <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        <Sparkles size={20} className="text-indigo-400" />
                        {faq.question}
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-lg">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Hier wird die TournamentBracket-Komponente gerendert */}
        {activeTab === 'bracket' && <TournamentBracket bracketData={bracketData} teams={teams} />}

        {activeTab === 'teams' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                Teilnehmende Teams
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {teams.map((team, idx) => (
                <div key={idx} className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${team.color} rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500`}></div>
                  <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-white">{team.name}</h3>
                      <div className={`px-4 py-2 bg-gradient-to-r ${team.color} rounded-full shadow-lg`}>
                        <span className="text-white font-bold text-sm">{team.rank}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {team.players.map((player, playerIdx) => (
                        <div key={playerIdx} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300">
                          <div className={`p-2 bg-gradient-to-r ${team.color} rounded-lg`}>
                            <Star className="text-white" size={16} />
                          </div>
                          <span className="text-gray-300 font-medium">{player}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {activeTab === 'schedule' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                Spielplan
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"></div>
            </div>

            <div className="space-y-6">
              {schedule.map((item, idx) => (
                <div key={idx} className="group relative">
                  <div className={`absolute inset-0 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500 ${
                    item.status === 'Abgeschlossen' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                    item.status === 'Kommend' ? 'bg-gradient-to-r from-orange-500 to-red-500' : item.status === 'Live' ? 'border-green-500/30 hover:border-green-500/50' :
                    'bg-gradient-to-r from-slate-500 to-gray-500'
                  }`}></div>
                  <div className={`relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border-2 transition-all duration-500 hover:scale-105 ${
                    item.status === 'Abgeschlossen' ? 'border-green-500/30 hover:border-green-500/50' :
                    item.status === 'Kommend' ? 'border-orange-500/30 hover:border-orange-500/50' : item.status === 'Live' ? 'border-green-500/30 hover:border-green-500/50':
                    'border-slate-600/30 hover:border-slate-600/50'
                    
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-3xl font-bold text-white mb-2">{item.round}</h3>
                        <p className="text-xl text-gray-200 font-semibold mb-4">{item.teams}</p>
                        <div className="flex items-center gap-6 text-gray-300">
                          <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl">
                            <Calendar size={20} className="text-cyan-400" />
                            <span className="font-medium">{item.date}</span>
                          </div>
                          <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl">
                            <Clock size={20} className="text-purple-400" />
                            <span className="font-medium">{item.time}</span>
                          </div>
                          {/* NEU: Anzeige des Ergebnisses */}
                          {item.result && (
                            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl">
                              <TrendingUp size={20} className="text-teal-400" /> {/* Oder ein anderes passendes Icon */}
                              <span className="font-medium">Ergebnis: {item.result}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="ml-6">
                        <div className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                          item.status === 'Abgeschlossen' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25' :
                          item.status === 'Kommend' ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25 animate-pulse' :  item.status === 'Live' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25' :
                          'bg-gradient-to-r from-slate-600 to-gray-600 text-gray-300'
                        }`}>
                          {item.status}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-r from-slate-900/80 via-purple-900/80 to-slate-900/80 backdrop-blur-xl border-t border-white/10">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <Zap className="text-white" size={20} />
                </div>
              </div>
              <span className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Boost Cup
              </span>
            </div>
            <p className="text-gray-400 text-lg font-medium">
              © 2025 Boost Cup Tournament. Alle Rechte vorbehalten.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-200"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-500"></div>
            </div>
          </div>
        </div>
      </footer>
        <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        />
    </div>
  );
};

export default BoostCupTournament;