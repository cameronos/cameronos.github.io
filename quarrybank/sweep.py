import numpy as np
import scipy.io.wavfile as wav

# Sweep parameters
sample_rate = 44100  # Standard audio sample rate
duration = 3  # Sweep duration in seconds
start_freq = 30  # Start frequency (Hz)
end_freq = 22000  # End frequency (Hz)

# Generate time array
t = np.linspace(0, duration, int(sample_rate * duration))

# Generate logarithmic sine sweep
sweep = np.sin(2 * np.pi * start_freq * ((end_freq/start_freq) ** (t/duration) - 1) / np.log(end_freq/start_freq) * t)

# Normalize to 16-bit PCM range
sweep = (sweep * 32767).astype(np.int16)

# Save as WAV file
wav.write("sine_sweep.wav", sample_rate, sweep)

print("Sine sweep generated: sine_sweep.wav")
