import { $ } from "../base"

export default function ({ className, children, onclick }) {
  return (
    <button className={className} onClick={onclick}>
      {children}
    </button>
  )
}
