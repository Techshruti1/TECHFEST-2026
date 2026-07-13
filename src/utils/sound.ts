// Procedural Space Synth Sound Generator using Web Audio API

class SoundSystem {
  private ctx: AudioContext | null = null;
  private ambientOscs: { osc: OscillatorNode; gain: GainNode }[] = [];
  private ambientFilter: BiquadFilterNode | null = null;
  private mainGain: GainNode | null = null;
  private isAmbientPlaying = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.mainGain = this.ctx.createGain();
      this.mainGain.gain.setValueAtTime(0.0, this.ctx.currentTime);
      this.mainGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggleAmbient(force?: boolean): boolean {
    this.initCtx();
    if (!this.ctx || !this.mainGain) return false;

    const targetPlayState = force !== undefined ? force : !this.isAmbientPlaying;

    if (targetPlayState === this.isAmbientPlaying) return this.isAmbientPlaying;

    if (targetPlayState) {
      // Start ambient pad synth
      try {
        // Master filter for warm space drone
        this.ambientFilter = this.ctx.createBiquadFilter();
        this.ambientFilter.type = "lowpass";
        this.ambientFilter.frequency.setValueAtTime(180, this.ctx.currentTime);
        this.ambientFilter.Q.setValueAtTime(4, this.ctx.currentTime);
        this.ambientFilter.connect(this.mainGain);

        // Warm sub bass oscillator (60Hz)
        const subOsc = this.ctx.createOscillator();
        const subGain = this.ctx.createGain();
        subOsc.type = "sawtooth";
        subOsc.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note
        subGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        subOsc.connect(subGain);
        subGain.connect(this.ambientFilter);
        subOsc.start();
        this.ambientOscs.push({ osc: subOsc, gain: subGain });

        // Outer Space Pad (110Hz - A2 note, slightly detuned)
        const pad1Osc = this.ctx.createOscillator();
        const pad1Gain = this.ctx.createGain();
        pad1Osc.type = "triangle";
        pad1Osc.frequency.setValueAtTime(110.2, this.ctx.currentTime);
        pad1Gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        pad1Osc.connect(pad1Gain);
        pad1Gain.connect(this.ambientFilter);
        pad1Osc.start();
        this.ambientOscs.push({ osc: pad1Osc, gain: pad1Gain });

        // Third harmonic pad (165Hz - E3 note, slightly detuned)
        const pad2Osc = this.ctx.createOscillator();
        const pad2Gain = this.ctx.createGain();
        pad2Osc.type = "sine";
        pad2Osc.frequency.setValueAtTime(164.8, this.ctx.currentTime);
        pad2Gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        pad2Osc.connect(pad2Gain);
        pad2Gain.connect(this.ambientFilter);
        pad2Osc.start();
        this.ambientOscs.push({ osc: pad2Osc, gain: pad2Gain });

        // LFO for filter sweep
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.type = "sine";
        lfo.frequency.setValueAtTime(0.08, this.ctx.currentTime); // very slow sweep
        lfoGain.gain.setValueAtTime(80, this.ctx.currentTime); // sweep range
        lfo.connect(lfoGain);
        lfoGain.connect(this.ambientFilter.frequency);
        lfo.start();
        this.ambientOscs.push({ osc: lfo, gain: lfoGain });

        // Fade in main volume
        this.mainGain.gain.linearRampToValueAtTime(0.35, this.ctx.currentTime + 3.0);
        this.isAmbientPlaying = true;
      } catch (err) {
        console.error("Ambient audio play failure:", err);
        return false;
      }
    } else {
      // Fade out
      this.mainGain.gain.linearRampToValueAtTime(0.0, this.ctx.currentTime + 1.5);
      setTimeout(() => {
        this.ambientOscs.forEach(({ osc }) => {
          try {
            osc.stop();
          } catch (e) {}
        });
        this.ambientOscs = [];
        this.isAmbientPlaying = false;
      }, 1600);
    }

    return targetPlayState;
  }

  playClick() {
    this.initCtx();
    if (!this.ctx || !this.mainGain || !this.isAmbientPlaying) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.mainGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch (e) {}
  }

  playGlitch() {
    this.initCtx();
    if (!this.ctx || !this.mainGain) return;

    try {
      const bufferSize = this.ctx.sampleRate * 0.15; // 150ms buffer
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Fill buffer with noise + sine glitches
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.1 * Math.sin(i * 0.05);
      }

      const noiseNode = this.ctx.createBufferSource();
      noiseNode.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      noiseNode.connect(filter);
      filter.connect(gain);
      gain.connect(this.mainGain);

      noiseNode.start();
    } catch (e) {}
  }

  playSuccess() {
    this.initCtx();
    if (!this.ctx || !this.mainGain) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5 arpeggio
      notes.forEach((freq, index) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + index * 0.08);

        gain.gain.setValueAtTime(0, now + index * 0.08);
        gain.gain.linearRampToValueAtTime(0.08, now + index * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.25);

        osc.connect(gain);
        gain.connect(this.mainGain!);

        osc.start(now + index * 0.08);
        osc.stop(now + index * 0.08 + 0.3);
      });
    } catch (e) {}
  }
}

export const sound = new SoundSystem();
