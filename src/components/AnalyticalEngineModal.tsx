import { useState, useEffect, useMemo } from 'react';
import { X, Play, Pause, Download, Sliders, Activity, Database, Check } from 'lucide-react';

interface AnalyticalEngineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DataPoint {
  timestamp: string;
  value: number;
  baseline: number;
  anomaly: boolean;
}

export function AnalyticalEngineModal({ isOpen, onClose }: AnalyticalEngineModalProps) {
  const [dataset, setDataset] = useState<'telemetry' | 'logistics' | 'health'>('telemetry');
  const [timeWindow, setTimeWindow] = useState<'7d' | '30d' | '90d'>('30d');
  const [smoothing, setSmoothing] = useState<number>(30);
  const [isLiveStreaming, setIsLiveStreaming] = useState<boolean>(false);
  const [filterAnomaliesOnly, setFilterAnomaliesOnly] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  // Generate initial simulated data based on dataset and time window
  const pointCount = timeWindow === '7d' ? 14 : timeWindow === '30d' ? 30 : 60;

  const [points, setPoints] = useState<DataPoint[]>([]);

  useEffect(() => {
    const newPoints: DataPoint[] = [];
    const baseValue = dataset === 'telemetry' ? 140 : dataset === 'logistics' ? 85 : 42;
    const variance = dataset === 'telemetry' ? 35 : dataset === 'logistics' ? 18 : 12;

    for (let i = 0; i < pointCount; i++) {
      const dayOffset = pointCount - i;
      const date = new Date(Date.now() - dayOffset * 24 * 60 * 60 * 1000);
      const isAnomaly = i % 11 === 0 && i !== 0;
      const noise = (Math.sin(i * 0.4) * variance) + (Math.random() * 10 - 5);
      const val = isAnomaly ? Math.round(baseValue + variance * 2.2) : Math.round(baseValue + noise);
      
      newPoints.push({
        timestamp: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: Math.max(10, val),
        baseline: baseValue,
        anomaly: isAnomaly
      });
    }
    setPoints(newPoints);
  }, [dataset, pointCount]);

  // Live streaming effect
  useEffect(() => {
    if (!isLiveStreaming) return;

    const interval = setInterval(() => {
      setPoints((prev) => {
        if (prev.length === 0) return prev;
        const last = prev[prev.length - 1];
        const nextDate = new Date();
        const noise = (Math.random() * 20 - 10);
        const isAnomaly = Math.random() > 0.88;
        const val = Math.round(last.baseline + (isAnomaly ? 55 : noise));

        const updated = [...prev.slice(1), {
          timestamp: nextDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          value: Math.max(10, val),
          baseline: last.baseline,
          anomaly: isAnomaly
        }];
        return updated;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [isLiveStreaming]);

  // Process data with smoothing
  const processedPoints = useMemo(() => {
    let result = [...points];

    if (filterAnomaliesOnly) {
      result = result.filter(p => p.anomaly);
      if (result.length === 0) result = points; // fallback
    }

    if (smoothing > 0 && result.length > 2) {
      const alpha = 1 - (smoothing / 100) * 0.85;
      let smoothedVal = result[0].value;
      result = result.map((p) => {
        smoothedVal = alpha * p.value + (1 - alpha) * smoothedVal;
        return {
          ...p,
          value: Math.round(smoothedVal)
        };
      });
    }

    return result;
  }, [points, smoothing, filterAnomaliesOnly]);

  // Statistical calculations
  const stats = useMemo(() => {
    if (processedPoints.length === 0) return { avg: 0, min: 0, max: 0, anomalies: 0, throughput: 0 };
    const vals = processedPoints.map(p => p.value);
    const sum = vals.reduce((a, b) => a + b, 0);
    const avg = Math.round(sum / vals.length);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const anomalies = points.filter(p => p.anomaly).length;
    const throughput = Math.round(sum * 1.4);

    return { avg, min, max, anomalies, throughput };
  }, [processedPoints, points]);

  // SVG Chart path calculation
  const chartHeight = 200;
  const chartWidth = 640;
  const padding = 24;

  const chartPaths = useMemo(() => {
    if (processedPoints.length === 0) return { linePath: '', areaPath: '', coords: [] };

    const minVal = Math.min(...processedPoints.map(p => p.value), 0);
    const maxVal = Math.max(...processedPoints.map(p => p.value)) * 1.15;
    const valRange = maxVal - minVal || 1;

    const coords = processedPoints.map((p, idx) => {
      const x = padding + (idx / (processedPoints.length - 1 || 1)) * (chartWidth - padding * 2);
      const y = chartHeight - padding - ((p.value - minVal) / valRange) * (chartHeight - padding * 2);
      return { x, y, ...p };
    });

    const linePath = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(' ');
    const areaPath = `${linePath} L ${coords[coords.length - 1].x.toFixed(1)} ${chartHeight - padding} L ${coords[0].x.toFixed(1)} ${chartHeight - padding} Z`;

    return { linePath, areaPath, coords };
  }, [processedPoints]);

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(processedPoints, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `analytical_engine_${dataset}_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setCopiedNotification('Exported JSON dataset');
    setTimeout(() => setCopiedNotification(null), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E252B]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#F6F2EC] border border-[#D5CCC0] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2DAD0] bg-[#FAF7F3]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#2D6A4F]/10 border border-[#2D6A4F]/30 flex items-center justify-center text-[#2D6A4F]">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 id="modal-title" className="text-base font-semibold text-[#1E252B] flex items-center gap-2">
                Dynamic Analytical Engine <span className="text-xs font-mono text-[#2D6A4F] font-semibold">v3.4 Analytics Workbench</span>
              </h3>
              <p className="text-xs text-[#5C6773]">Python, Streamlit, SQL &amp; React Client-Side Telemetry Demonstration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#7C8794] hover:text-[#1E252B] rounded-lg hover:bg-[#EFEAE1] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white/85 p-4 rounded-xl border border-[#E2DAD0] shadow-xs">
            {/* Dataset Picker */}
            <div>
              <label className="block text-xs font-mono uppercase text-[#5C6773] mb-1.5 flex items-center gap-1.5 font-semibold">
                <Database className="w-3.5 h-3.5 text-[#2D6A4F]" /> Dataset
              </label>
              <select
                value={dataset}
                onChange={(e) => setDataset(e.target.value as any)}
                className="w-full bg-[#FAF7F3] border border-[#D5CCC0] rounded-lg px-3 py-1.5 text-xs text-[#1E252B] focus:outline-none focus:border-[#2D6A4F]"
              >
                <option value="telemetry">LA Systems Telemetry (I/O, SQL, Load)</option>
                <option value="logistics">Server Environments &amp; Cloud (LAMP, cPanel, Vercel)</option>
                <option value="health">Behavioral Health Outreach Events (CalAIM / ECM)</option>
              </select>
            </div>

            {/* Time Window */}
            <div>
              <label className="block text-xs font-mono uppercase text-[#5C6773] mb-1.5 font-semibold">
                Window Span
              </label>
              <div className="flex bg-[#FAF7F3] p-1 rounded-lg border border-[#D5CCC0]">
                {(['7d', '30d', '90d'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeWindow(t)}
                    className={`flex-1 py-1 text-xs font-mono rounded transition-colors ${
                      timeWindow === t ? 'bg-[#2D6A4F] text-white font-medium shadow-xs' : 'text-[#5C6773] hover:text-[#1E252B]'
                    }`}
                  >
                    {t.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Smoothing Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono uppercase text-[#5C6773] mb-1.5 font-semibold">
                <span className="flex items-center gap-1"><Sliders className="w-3.5 h-3.5 text-[#2D6A4F]" /> Smoothing</span>
                <span className="text-[#2D6A4F] tabular-nums font-bold">{smoothing}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                value={smoothing}
                onChange={(e) => setSmoothing(Number(e.target.value))}
                className="w-full h-1.5 bg-[#E2DAD0] rounded-lg appearance-none cursor-pointer accent-[#2D6A4F] mt-2"
              />
            </div>

            {/* Live Streaming Toggle */}
            <div className="flex flex-col justify-end">
              <button
                onClick={() => setIsLiveStreaming(!isLiveStreaming)}
                className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isLiveStreaming
                    ? 'bg-[#B85D19]/15 text-[#B85D19] border border-[#B85D19]/40 font-semibold'
                    : 'bg-[#2D6A4F] hover:bg-[#245841] text-white shadow-xs shadow-[#2D6A4F]/20'
                }`}
              >
                {isLiveStreaming ? (
                  <>
                    <Pause className="w-3.5 h-3.5" /> Pause Feed
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" /> Stream Packets
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white/90 border border-[#E2DAD0] p-3 rounded-xl shadow-xs">
              <span className="block text-xs font-mono text-[#7C8794] uppercase font-semibold">Mean Metric</span>
              <span className="text-xl font-bold text-[#1E252B] font-mono tabular-nums">{stats.avg}</span>
              <span className="text-[11px] text-[#5C6773] block">Rolling baseline normalized</span>
            </div>
            <div className="bg-white/90 border border-[#E2DAD0] p-3 rounded-xl shadow-xs">
              <span className="block text-xs font-mono text-[#7C8794] uppercase font-semibold">Peak Extremum</span>
              <span className="text-xl font-bold text-[#2D6A4F] font-mono tabular-nums">{stats.max}</span>
              <span className="text-[11px] text-[#5C6773] block">Floor minimum: {stats.min}</span>
            </div>
            <div className="bg-white/90 border border-[#E2DAD0] p-3 rounded-xl shadow-xs">
              <span className="block text-xs font-mono text-[#7C8794] uppercase font-semibold">Detected Anomalies</span>
              <span className="text-xl font-bold text-[#B85D19] font-mono tabular-nums">{stats.anomalies}</span>
              <span className="text-[11px] text-[#5C6773] block">&gt;2.2σ deviation trigger</span>
            </div>
            <div className="bg-white/90 border border-[#E2DAD0] p-3 rounded-xl shadow-xs">
              <span className="block text-xs font-mono text-[#7C8794] uppercase font-semibold">Execution Latency</span>
              <span className="text-xl font-bold text-[#2D6A4F] font-mono tabular-nums">42ms</span>
              <span className="text-[11px] text-[#5C6773] block">Vercel Edge compute</span>
            </div>
          </div>

          {/* High-Contrast Charcoal Visual Canvas */}
          <div className="bg-[#1A2127] border border-[#2E3942] rounded-xl p-4 shadow-inner">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <span className="w-2 h-2 rounded-full bg-[#52B788]"></span>
                <span>Time-Series Trajectory</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-400">{processedPoints.length} points plotted</span>
              </div>
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer hover:text-white">
                <input
                  type="checkbox"
                  checked={filterAnomaliesOnly}
                  onChange={(e) => setFilterAnomaliesOnly(e.target.checked)}
                  className="rounded border-slate-700 text-[#2D6A4F] focus:ring-0 bg-slate-900"
                />
                Isolate Anomalies
              </label>
            </div>

            <div className="w-full overflow-x-auto">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full h-56 overflow-visible select-none"
              >
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#40916C" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#40916C" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                <line x1={padding} y1={padding} x2={chartWidth - padding} y2={padding} stroke="#28353E" strokeDasharray="3 3" />
                <line x1={padding} y1={chartHeight / 2} x2={chartWidth - padding} y2={chartHeight / 2} stroke="#28353E" strokeDasharray="3 3" />
                <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="#394854" />

                {/* Area fill */}
                {chartPaths.areaPath && (
                  <path d={chartPaths.areaPath} fill="url(#areaGradient)" />
                )}

                {/* Line path */}
                {chartPaths.linePath && (
                  <path
                    d={chartPaths.linePath}
                    fill="none"
                    stroke="#52B788"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Data Points */}
                {chartPaths.coords.map((c, i) => (
                  <g key={i} className="group cursor-pointer">
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r={c.anomaly ? 5 : 3}
                      fill={c.anomaly ? '#E07A5F' : '#74C69D'}
                      stroke="#1A2127"
                      strokeWidth="1.5"
                    />
                    <title>{`${c.timestamp}: ${c.value} units ${c.anomaly ? '(ANOMALY)' : ''}`}</title>
                  </g>
                ))}
              </svg>
            </div>

            <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 pt-2 border-t border-[#28353E]">
              <span>{processedPoints[0]?.timestamp || 'Start'}</span>
              <span>Vector Rendering: Zero UI Frame Jitter</span>
              <span>{processedPoints[processedPoints.length - 1]?.timestamp || 'End'}</span>
            </div>
          </div>

          {/* Architecture Insights */}
          <div className="text-xs text-[#48535E] bg-white/70 p-4 rounded-xl border border-[#E2DAD0] leading-relaxed">
            <span className="font-semibold text-[#1E252B]">Architectural Note:</span> This analytical tool models client-side data streaming strategies developed for single-page applications. Parameter updates re-index dataset arrays with sub-millisecond overhead, avoiding redundant round-trips to Python Streamlit microservices while preserving real-time exploratory freedom.
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3 border-t border-[#E2DAD0] bg-[#FAF7F3] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {copiedNotification && (
              <span className="text-xs font-mono text-[#2D6A4F] flex items-center gap-1.5 animate-in fade-in font-semibold">
                <Check className="w-3.5 h-3.5" /> {copiedNotification}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportJson}
              className="px-3 py-1.5 bg-[#EFEAE1] hover:bg-[#E4DCCE] text-[#2C353D] border border-[#D5CCC0] rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Export Clean JSON
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#2D6A4F] hover:bg-[#245841] text-white rounded-lg text-xs font-medium transition-colors shadow-xs"
            >
              Done Exploring
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
