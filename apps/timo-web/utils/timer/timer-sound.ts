let audioContext: AudioContext | undefined;
let soundBuffer: Promise<AudioBuffer> | undefined;

export const unlockTimerSound = async () => {
  try {
    audioContext ??= new AudioContext();
    if (audioContext.state !== "running") await audioContext.resume();
    return audioContext.state === "running";
  } catch {
    return false;
  }
};

export const playTimerSound = async () => {
  try {
    audioContext ??= new AudioContext();
    const context = audioContext;
    const resume = context.resume();
    soundBuffer ??= fetch("/sounds/timer-completed.mp3")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load timer sound");
        return response.arrayBuffer();
      })
      .then((data) => context.decodeAudioData(data))
      .catch((error: unknown) => {
        soundBuffer = undefined;
        throw error;
      });
    const [, buffer] = await Promise.all([resume, soundBuffer]);

    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.onended = () => source.disconnect();
    source.start();
  } catch {
    return;
  }
};
