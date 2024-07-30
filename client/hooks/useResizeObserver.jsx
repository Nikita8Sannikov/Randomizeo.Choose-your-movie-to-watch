import React, { useRef, useEffect }  from 'react'

export default function useResizeObserver(callback) {
    const ref = useRef()

    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            if (ref.current) {
              callback(ref.current);
            }
          })

    if (ref.current) {
      resizeObserver.observe(ref.current)
    }

    return () => {
        resizeObserver.disconnect()
      }
    }, [callback])

  return ref
}
