// Külső Strudel kód betöltése és azonnali futtatása a repódból
await import('https://raw.githubusercontent.com/tomcpu/zenek/main/c64-sid-01.js')

// Klasszikus 3 csatornás C64 SID emuláció (135 BPM)
stack(
  // 1. CSATORNA: Jellegzetes C64 basszus (fűrészfog + rezonáns szűrő)
  note("c2 c2 eb2 c2 f2 f2 g2 bb1")
    .s("sawtooth")
    .lpf(900)
    .lpq(6) // Rezonancia (a SID szűrő egyik fő jellegzetessége)
    .decay(0.18)
    .sustain(0.1)
    .gain(0.85),

  // 2. CSATORNA: Villámgyors SID arpeggio (akkordok szimulálása 1 hangon)
  note("<[c4 eb4 g4]*8 [ab3 c4 eb4]*8 [f3 ab3 c4]*8 [g3 b3 d4]*8>")
    .s("square")
    .pw(sine.range(0.15, 0.85).slow(4)) // Pulzusszélesség-moduláció (PWM)
    .decay(0.06)
    .sustain(0)
    .lpf(2800)
    .gain(0.45),

  // 3. CSATORNA: 1 csatornás C64 dob (lábdob + pergő felváltva, 8-bites bitcrush-sal)
  stack(
    s("bd ~ bd ~").s("triangle").note("c2").decay(0.12).gain(0.9),
    s("~ white ~ white").decay(0.11).sustain(0).hpf(1200).gain(0.5)
  )
)
.crush(8) // 4-bites kvantálás a nyersebb 8-bites karakterért (elhagyható, ha tisztább SID-et akarsz)
.cpm(135/4)
