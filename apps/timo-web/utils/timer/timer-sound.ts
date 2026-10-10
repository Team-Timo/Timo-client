let audioContext: AudioContext | undefined;
let soundBuffer: Promise<AudioBuffer> | undefined;

export const playTimerSound = async () => {
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
    const [, buffer] = await Promise.all([resume, soundBuffer]);

    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.onended = () => source.disconnect();
    source.start();
  } catch {
    return;
  }
  const context = audioContext;

  console.log("오디오 상태:", context.state);
  console.log("사용자 상호작용:", navigator.userActivation.hasBeenActive);

  const resume = context.resume();
  resume.then(() => {
    console.log("활성화 후 상태:", context.state);
  });
};
