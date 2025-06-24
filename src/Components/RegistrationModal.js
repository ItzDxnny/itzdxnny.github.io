import React, { useState } from 'react';
import { X, Users, Mail, Gamepad2, Info, Sparkles } from 'lucide-react'; // Sparkles ist jetzt importiert!

const RegistrationModal = ({ isOpen, onClose }) => {
  const [teamName, setTeamName] = useState('');
  const [player1IGN, setPlayer1IGN] = useState('');
  const [player1Rank, setPlayer1Rank] = useState('');
  const [player2IGN, setPlayer2IGN] = useState('');
  const [player2Rank, setPlayer2Rank] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!teamName.trim()) newErrors.teamName = 'Teamname ist erforderlich.';
    if (!player1IGN.trim()) newErrors.player1IGN = 'Ingame-Name (Spieler 1) ist erforderlich.';
    if (!player1Rank.trim()) newErrors.player1Rank = 'Rang (Spieler 1) ist erforderlich.';
    if (!player2IGN.trim()) newErrors.player2IGN = 'Ingame-Name (Spieler 2) ist erforderlich.';
    if (!player2Rank.trim()) newErrors.player2Rank = 'Rang (Spieler 2) ist erforderlich.';
    if (!contactEmail.trim()) {
      newErrors.contactEmail = 'Kontakt-E-Mail ist erforderlich.';
    } else if (!/\S+@\S+\.\S+/.test(contactEmail)) {
      newErrors.contactEmail = 'Ungültiges E-Mail-Format.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitMessage('');

    if (validate()) {
      setIsSubmitting(true);
      try {
        // Simulieren Sie einen API-Aufruf oder eine Formularübermittlung
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simuliert Netzwerklatenz

        // Hier würden Sie diese Daten normalerweise an Ihr Backend senden
        console.log({
          teamName,
          player1IGN,
          player1Rank,
          player2IGN,
          player2Rank,
          contactEmail
        });

        setSubmitMessage('Anmeldung erfolgreich! Du erhältst eine Bestätigung per E-Mail.');
        // Optional Formular leeren oder Modal nach erfolgreicher Übermittlung schließen
        setTeamName('');
        setPlayer1IGN('');
        setPlayer1Rank('');
        setPlayer2IGN('');
        setPlayer2Rank('');
        setContactEmail('');
        // onClose(); // Auskommentieren, um das Modal bei Erfolg automatisch zu schließen
      } catch (error) {
        setSubmitMessage('Fehler bei der Anmeldung. Bitte versuche es später erneut.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    // Dieses Div ist das Overlay des Modals
    // 'overflow-y-auto' am Overlay ist ein Fallback, falls das Modal in extremen Fällen den Viewport überragt
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in overflow-y-auto">
      {/* Dieses Div ist der tatsächliche Modal-Inhalt */}
      {/* 'max-h-[90vh]' und 'overflow-y-auto' für das Scrollen des Inhalts bei Bedarf */}
      <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-lg rounded-3xl p-8 md:p-10 shadow-2xl border border-white/10 w-full max-w-2xl relative animate-scale-in max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-300 p-2 rounded-full bg-white/5 hover:bg-white/10"
          aria-label="Modal schließen"
        >
          <X size={24} />
        </button>

        <h2 className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 text-center">
          Team anmelden
        </h2>
        <p className="text-gray-300 text-center mb-8 max-w-md mx-auto">
          Melde dein 2er-Team für den Boost Cup an. Fülle alle Felder aus, um deine Teilnahme zu sichern!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Team Name */}
          <div>
            <label htmlFor="teamName" className="block text-gray-300 text-sm font-semibold mb-2 flex items-center gap-2">
              <Users size={18} className="text-purple-400" /> Teamname
            </label>
            <input
              type="text"
              id="teamName"
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Z.B. Rocket Riders"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
            {errors.teamName && <p className="text-red-400 text-sm mt-1">{errors.teamName}</p>}
          </div>

          {/* Player 1 */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Gamepad2 size={20} className="text-green-400" /> Spieler 1
            </h3>
            <div>
              <label htmlFor="player1IGN" className="block text-gray-300 text-sm font-semibold mb-2">Ingame-Name</label>
              <input
                type="text"
                id="player1IGN"
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="RocketMan42"
                value={player1IGN}
                onChange={(e) => setPlayer1IGN(e.target.value)}
              />
              {errors.player1IGN && <p className="text-red-400 text-sm mt-1">{errors.player1IGN}</p>}
            </div>
            <div className="mt-4">
              <label htmlFor="player1Rank" className="block text-gray-300 text-sm font-semibold mb-2">Rang</label>
              <select
                id="player1Rank"
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 appearance-none bg-no-repeat bg-right-center pr-10"
                value={player1Rank}
                onChange={(e) => setPlayer1Rank(e.target.value)}
              >
                <option value="" disabled hidden className="text-gray-900">Wähle Rang</option>
                <option value="Diamond II" className="text-gray-900">Diamond II</option>
                <option value="Diamond III" className="text-gray-900">Diamond III</option>
                <option value="Champion I" className="text-gray-900">Champion I</option>
                <option value="Champion II" className="text-gray-900">Champion II</option>
                <option value="Champion III" className="text-gray-900">Champion III</option>
                <option value="Grand Champion" className="text-gray-900">Grand Champion</option>
              </select>
              {errors.player1Rank && <p className="text-red-400 text-sm mt-1">{errors.player1Rank}</p>}
            </div>
          </div>

          {/* Player 2 */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Gamepad2 size={20} className="text-red-400" /> Spieler 2
            </h3>
            <div>
              <label htmlFor="player2IGN" className="block text-gray-300 text-sm font-semibold mb-2">Ingame-Name</label>
              <input
                type="text"
                id="player2IGN"
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                placeholder="AerialAce"
                value={player2IGN}
                onChange={(e) => setPlayer2IGN(e.target.value)}
              />
              {errors.player2IGN && <p className="text-red-400 text-sm mt-1">{errors.player2IGN}</p>}
            </div>
            <div className="mt-4">
              <label htmlFor="player2Rank" className="block text-gray-300 text-sm font-semibold mb-2">Rang</label>
              <select
                id="player2Rank"
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 appearance-none bg-no-repeat bg-right-center pr-10"
                value={player2Rank}
                onChange={(e) => setPlayer2Rank(e.target.value)}
              >
                <option value="" disabled hidden className="text-gray-900">Wähle Rang</option>
                <option value="Diamond II" className="text-gray-900">Diamond II</option>
                <option value="Diamond III" className="text-gray-900">Diamond III</option>
                <option value="Champion I" className="text-gray-900">Champion I</option>
                <option value="Champion II" className="text-gray-900">Champion II</option>
                <option value="Champion III" className="text-gray-900">Champion III</option>
                <option value="Grand Champion" className="text-gray-900">Grand Champion</option>
              </select>
              {errors.player2Rank && <p className="text-red-400 text-sm mt-1">{errors.player2Rank}</p>}
            </div>
          </div>

          {/* Contact Email */}
          <div>
            <label htmlFor="contactEmail" className="block text-gray-300 text-sm font-semibold mb-2 flex items-center gap-2">
              <Mail size={18} className="text-blue-400" /> Kontakt-E-Mail
            </label>
            <input
              type="email"
              id="contactEmail"
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="deine.email@example.com"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
            {errors.contactEmail && <p className="text-red-400 text-sm mt-1">{errors.contactEmail}</p>}
            <p className="text-gray-400 text-sm mt-2 flex items-center gap-1">
                <Info size={14} className="text-gray-500" /> Du erhältst hier deine Teilnahmebestätigung.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full group relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 overflow-hidden
                       bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-blue-400/40 hover:scale-[1.02]
                       disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition duration-300 z-0" />
            <div className="relative z-10 flex items-center gap-2">
              <Sparkles size={22} />
              {isSubmitting ? 'Anmeldung läuft...' : 'Jetzt anmelden!'}
            </div>
          </button>

          {submitMessage && (
            <p className={`text-center mt-4 font-semibold ${submitMessage.includes('erfolgreich') ? 'text-green-400' : 'text-red-400'}`}>
              {submitMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;