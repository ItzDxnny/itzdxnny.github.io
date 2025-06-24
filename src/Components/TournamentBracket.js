// src/components/TournamentBracket.jsx
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Trophy, Sparkles } from 'lucide-react';

const TournamentBracket = ({ bracketData, teams }) => {
  const bracketRef = useRef(null);
  const matchRefs = useRef({});
  const championBlockRef = useRef(null);
  const [svgPaths, setSvgPaths] = useState([]);

  const setMatchRef = useCallback((el, roundType, idx) => {
    if (el) {
      matchRefs.current[`${roundType}-${idx}`] = el;
    } else {
      delete matchRefs.current[`${roundType}-${idx}`];
    }
  }, []);

  const generatePaths = useCallback(() => {
    if (!bracketRef.current) {
      console.warn("bracketRef.current is null. Cannot generate paths.");
      return;
    }

    const paths = [];
    const bracketRect = bracketRef.current.getBoundingClientRect();
    console.log("Bracket Container Rect:", bracketRect); // Debugging: Check main container rect

    const getRelativeCoords = (element) => {
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      // Ensure we're calculating relative to the bracketRef
      return {
        x: rect.left - bracketRect.left,
        y: rect.top - bracketRect.top,
        width: rect.width,
        height: rect.height,
      };
    };

    // --- Quarterfinals to Semifinals ---
    bracketData.quarterfinals.forEach((match, idx) => {
      const qfMatchElement = matchRefs.current[`quarterfinals-${idx}`];
      if (qfMatchElement) {
        const qfRect = getRelativeCoords(qfMatchElement);
        const semiMatchIdx = Math.floor(idx / 2);
        const semiMatchElement = matchRefs.current[`semifinals-${semiMatchIdx}`];

        if (qfRect && semiMatchElement) { // Check both elements before getting semiRect
          const semiRect = getRelativeCoords(semiMatchElement);
          if (semiRect) {
            const startX = qfRect.x + qfRect.width;
            const startY = qfRect.y + qfRect.height / 2;
            const midX = qfRect.x + qfRect.width + 40;
            const endY = semiRect.y + (idx % 2 === 0 ? semiRect.height / 4 : semiRect.height * 3 / 4);

            paths.push({
              d: `M ${startX} ${startY} H ${midX} V ${endY} H ${semiRect.x}`,
              stroke: 'url(#gradientCyanPurple)',
              strokeWidth: 2
            });
          }
        }
      }
    });

    // --- Semifinals to Final ---
    bracketData.semifinals.forEach((match, idx) => {
      const sfMatchElement = matchRefs.current[`semifinals-${idx}`];
      if (sfMatchElement) {
        const sfRect = getRelativeCoords(sfMatchElement);
        const finalMatchElement = matchRefs.current['final-0'];

        if (sfRect && finalMatchElement) { // Check both elements
          const finalRect = getRelativeCoords(finalMatchElement);
          if (finalRect) {
            const startX = sfRect.x + sfRect.width;
            const startY = sfRect.y + sfRect.height / 2;
            const midX = sfRect.x + sfRect.width + 40;
            const endY = finalRect.y + (idx === 0 ? finalRect.height / 4 : finalRect.height * 3 / 4);

            paths.push({
              d: `M ${startX} ${startY} H ${midX} V ${endY} H ${finalRect.x}`,
              stroke: 'url(#gradientPurplePink)',
              strokeWidth: 2
            });
          }
        }
      }
    });

    // --- Final to Champion ---
    const finalMatchElement = matchRefs.current['final-0'];
    const championElement = championBlockRef.current; // Use the dedicated ref

    console.log("Debugging Final to Champion Line:"); // Debugging header
    console.log("  Final Match Element:", finalMatchElement);
    console.log("  Champion Element:", championElement);

    if (finalMatchElement && championElement) {
      const finalRect = getRelativeCoords(finalMatchElement);
      const champRect = getRelativeCoords(championElement);

      console.log("  Relative Final Rect:", finalRect);
      console.log("  Relative Champion Rect:", champRect);

      if (finalRect && champRect) {
        const startX = finalRect.x + finalRect.width;
        const startY = finalRect.y + finalRect.height / 2;
        const endX = champRect.x;
        const endY = champRect.y + champRect.height / 2;

        console.log(`  Path coordinates: M ${startX} ${startY} H ${endX}`); // Debugging path string

        paths.push({
          d: `M ${startX} ${startY} H ${endX}`,
          stroke: 'url(#gradientYellowOrange)',
          strokeWidth: 2
        });
      } else {
        console.warn("  Could not get relative bounding client rects for final or champion block. This means their calculated position is somehow invalid.", { finalRect, champRect });
      }
    } else {
      console.warn("  Final match element or champion block element not found in DOM when generating paths. This is usually a timing issue.", { finalMatchElement, championElement });
    }

    setSvgPaths(paths);
  }, [bracketData]);

  useEffect(() => {
    generatePaths();

    const observer = new ResizeObserver(generatePaths);
    if (bracketRef.current) {
      observer.observe(bracketRef.current);
    }
    // Also observe the champion block for layout changes
    if (championBlockRef.current) {
      observer.observe(championBlockRef.current);
    }

    return () => {
      if (bracketRef.current) {
        observer.unobserve(bracketRef.current);
      }
      if (championBlockRef.current) {
        observer.unobserve(championBlockRef.current);
      }
    };
  }, [generatePaths]);

  return (
    <div className="relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20 rounded-3xl"></div>
      <div className="absolute inset-0 backdrop-blur-sm bg-white/5 rounded-3xl border border-white/10"></div>

      <div className="relative p-8 overflow-x-auto">
        <div className="text-center mb-8">
          <h3 className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Turnierbaum
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Tournament Bracket Container - this is where the SVG coordinates are relative to */}
        <div ref={bracketRef} className="min-w-[900px] mx-auto relative">
          {/* SVG overlay for lines - MUST be absolutely positioned and cover the bracket area */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
            <defs>
              <linearGradient id="gradientCyanPurple" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22D3EE" /> {/* Cyan-400 */}
                <stop offset="100%" stopColor="#A78BFA" /> {/* Purple-400 */}
              </linearGradient>
              <linearGradient id="gradientPurplePink" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#A78BFA" /> {/* Purple-400 */}
                <stop offset="100%" stopColor="#EC4899" /> {/* Pink-400 */}
              </linearGradient>
              <linearGradient id="gradientYellowOrange" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FACC15" /> {/* Yellow-400 */}
                <stop offset="100%" stopColor="#FB923C" /> {/* Orange-400 */}
              </linearGradient>
            </defs>
            {svgPaths.map((path, index) => (
              <path
                key={index}
                d={path.d}
                stroke={path.stroke}
                strokeWidth={path.strokeWidth}
                fill="none"
                className="transition-all duration-300"
              />
            ))}
          </svg>

          {/* New Container for Titles */}
          <div className="flex justify-between items-center mb-6 px-4 relative z-20">
            <div className="text-center w-56">
              <div className="inline-block px-6 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-full border border-cyan-500/30">
                <h4 className="text-lg font-bold text-cyan-300">Viertelfinale</h4>
              </div>
            </div>
            <div className="text-center w-56">
              <div className="inline-block px-6 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full border border-purple-500/30">
                <h4 className="text-lg font-bold text-purple-300">Halbfinale</h4>
              </div>
            </div>
            <div className="text-center w-56">
              <div className="inline-block px-6 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-full border border-yellow-500/30">
                <h4 className="text-lg font-bold text-yellow-300">Finale</h4>
              </div>
            </div>
            <div className="text-center w-56">
              <div className="inline-block px-6 py-2 bg-gradient-to-r from-yellow-500/30 to-orange-500/30 backdrop-blur-sm rounded-full border border-yellow-500/50">
                <h4 className="text-lg font-bold text-yellow-300">Champion</h4>
              </div>
            </div>
          </div>

          {/* Tournament Rounds - height adjusted for titles above */}
          <div className="flex justify-between items-center h-[600px] relative z-20">

            {/* Round 1 - Quarterfinals */}
            <div className="flex flex-col justify-around h-full">
              {bracketData.quarterfinals.map((match, idx) => (
                <div key={idx} ref={el => setMatchRef(el, 'quarterfinals', idx)} className="relative group">
                  <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md rounded-2xl border border-white/10 w-56 overflow-hidden shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-105">
                    <div className={`p-4 border-b border-white/10 transition-all duration-300 ${match.winner === match.team1 ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/30' : 'hover:bg-white/5'}`}>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white font-medium truncate">{match.team1}</span>
                        <span className="text-cyan-400 font-black text-lg">{match.score1}</span>
                      </div>
                    </div>
                    <div className={`p-4 transition-all duration-300 ${match.winner === match.team2 ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/30' : 'hover:bg-white/5'}`}>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white font-medium truncate">{match.team2}</span>
                        <span className="text-cyan-400 font-black text-lg">{match.score2}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Round 2 - Semifinals */}
            <div className="flex flex-col justify-around h-full">
              {bracketData.semifinals.map((match, idx) => (
                <div key={idx} ref={el => setMatchRef(el, 'semifinals', idx)} className="relative group">
                  <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md rounded-2xl border border-white/10 w-56 overflow-hidden shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105">
                    <div className="p-4 border-b border-white/10 hover:bg-white/5 transition-all duration-300">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white font-medium truncate">{match.team1}</span>
                        <span className="text-purple-400 font-black text-lg">{match.score1 ?? '-'}</span>
                      </div>
                    </div>
                    <div className="p-4 hover:bg-white/5 transition-all duration-300">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white font-medium truncate">{match.team2}</span>
                        <span className="text-purple-400 font-black text-lg">{match.score2 ?? '-'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Round 3 - Final */}
            <div className="flex flex-col justify-center h-full">
              <div ref={el => setMatchRef(el, 'final', 0)} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md rounded-2xl border border-yellow-500/30 w-56 overflow-hidden shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 hover:scale-105">
                <div className="p-4 border-b border-white/10 hover:bg-white/5 transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white font-medium">{bracketData.final[0].team1}</span>
                    <span className="text-yellow-400 font-black text-lg">{bracketData.final[0].score1 ?? '-'}</span>
                  </div>
                </div>
                <div className="p-4 hover:bg-white/5 transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white font-medium">{bracketData.final[0].team2}</span>
                    <span className="text-yellow-400 font-black text-lg">{bracketData.final[0].score2 ?? '-'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Champion */}
            <div className="flex flex-col justify-center h-full">
              {/* Assign the ref directly here */}
              <div ref={championBlockRef} id="champion-block" className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl w-56 p-8 text-center shadow-2xl hover:shadow-yellow-500/50 transition-all duration-500 hover:scale-105">
                  <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Trophy className="text-white" size={32} />
                  </div>
                  <div className="text-white font-black text-xl mb-2">{bracketData.champion || 'TBD'}</div>
                  <div className="absolute -top-2 -right-2">
                    <Sparkles className="text-yellow-300 animate-pulse" size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Third Place Match */}
          <div className="mt-12 flex justify-center">
            <div className="text-center">
              <div className="inline-block px-6 py-2 bg-gradient-to-r from-amber-600/20 to-orange-600/20 backdrop-blur-sm rounded-full border border-amber-600/30 mb-6">
                <h4 className="text-lg font-bold text-amber-300">Spiel um Platz 3</h4>
              </div>
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md rounded-2xl border border-amber-600/30 w-56 overflow-hidden shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 hover:scale-105">
                <div className="p-4 border-b border-white/10 hover:bg-white/5 transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white font-medium">{bracketData.thirdPlace[0].team1}</span>
                    <span className="text-amber-400 font-black text-lg">{bracketData.thirdPlace[0].score1 ?? '-'}</span>
                  </div>
                </div>
                <div className="p-4 hover:bg-white/5 transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white font-medium">{bracketData.thirdPlace[0].team2}</span>
                    <span className="text-amber-400 font-black text-lg">{bracketData.thirdPlace[0].score2 ?? '-'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentBracket;