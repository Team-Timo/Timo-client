let audioContext: AudioContext | undefined;
let soundBuffer: Promise<AudioBuffer> | undefined;

export const prepareTimerSound = async () => {
  try {
    audioContext ??= new AudioContext();
    const context = audioContext;
    const resume = context.resume();
    soundBuffer ??= fetch("/sounds/timer-completed.wav")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load timer sound");
        return response.arrayBuffer();
      })
      .then((data) => context.decodeAudioData(data))
      .catch((error: unknown) => {
        soundBuffer = undefined;
        throw error;
      });
    await Promise.all([resume, soundBuffer]);
  } catch {
    return;
  }
};

export const playTimerSound = async () => {
  if (!audioContext || !soundBuffer) return;

  try {
    const source = audioContext.createBufferSource();
    source.buffer = await soundBuffer;
    source.connect(audioContext.destination);
    source.onended = () => source.disconnect();
    source.start();
  } catch {
    return;
  }
};
