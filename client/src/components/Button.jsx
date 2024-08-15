export default function ({ className, children, onclick, onMouseEnter = () => {}, onMouseLeave = () => {} }) {
  return (
    <button className={className} onClick={onclick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
    </button>
  )
}
