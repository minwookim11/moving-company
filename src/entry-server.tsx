import { renderToString } from 'react-dom/server'
import App from './App'

export const render = (pathname: string) => renderToString(<App pathname={pathname} />)
