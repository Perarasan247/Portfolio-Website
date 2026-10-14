const EPOCHS = 7;
const SPARK_W = 56;
const SPARK_H = 18;

/** Simulated training loss: an exponential decay toward a small floor. */
const lossAt = (t: number) => 0.04 + 2.26 * Math.exp(-5 * t);

function sparkPath(progress: number): string {
  const steps = Math.max(2, Math.round(progress * 28));
  const top = lossAt(0);
  let d = '';
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * progress;
    const x = (t * SPARK_W).toFixed(1);
    // High loss plots near the top; it falls toward the baseline as training progresses.
    const y = (2 + (1 - lossAt(t) / top) * (SPARK_H - 4)).toFixed(1);
    d += (i === 0 ? 'M' : 'L') + x + ' ' + y;
  }
  return d;
}

const FULL_CURVE = sparkPath(1);

interface RunMeterProps {
  progress: number;
}

/**
 * A "training run" readout that tracks page scroll: the epoch advances and the
 * loss falls as the visitor reads, reaching "converged" at the end of the page.
 */
export function RunMeter({ progress }: RunMeterProps) {
  const epoch = Math.min(EPOCHS, 1 + Math.floor(progress * EPOCHS));
  const converged = progress > 0.985;

  return (
    <div className="run-meter mono tabular" aria-hidden="true">
      <svg
        className="run-spark"
        width={SPARK_W}
        height={SPARK_H}
        viewBox={'0 0 ' + SPARK_W + ' ' + SPARK_H}
      >
        <path className="run-spark-target" d={FULL_CURVE} />
        <path d={sparkPath(progress)} />
      </svg>
      <span className="run-epoch">
        ep {epoch}/{EPOCHS}
      </span>
      <span className={converged ? 'run-loss done' : 'run-loss'}>
        {converged ? 'converged' : 'loss ' + lossAt(progress).toFixed(3)}
      </span>
    </div>
  );
}
