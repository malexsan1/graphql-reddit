import normalize from 'styled-normalize'
import { injectGlobal } from 'styled-components'

export default () => injectGlobal`
  ${normalize}

  body {
    padding: 0;
  }

  #root {
    height: 100vh;
  }
`
