import "./MetricBadge.scss"


interface MetricBadgeProps {
  label: string
  value: string
}

function MetricBadge({ label, value }: MetricBadgeProps) {
  return (
    <article className="metric-badge">
      <strong className="metric-badge__value">{value}</strong>
      <p className="metric-badge__label">{label}</p>
    </article>
  )
}

export default MetricBadge
