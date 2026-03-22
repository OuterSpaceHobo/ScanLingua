import './i18n'
import './tailwind.css'
import ReactDOM from 'react-dom/client'
import { Support } from './Support'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <div style={{ padding: '1rem' }}>
      <Support window={true} />
    </div>
  </>
)
