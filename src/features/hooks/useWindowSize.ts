import { useEffect, useState } from 'react'

interface WindowSize {
  width: number
  height: number
}

const useWindowSize = (): [number, number] => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)

    // Удаление слушателя событий при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []) // Пустой массив зависимостей означает, что эффект выполнится только при монтировании компонента

  return [windowSize.width, windowSize.height]
}

export { useWindowSize }
