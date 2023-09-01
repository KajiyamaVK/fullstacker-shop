import { globalCss } from '.'

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    fontFamily: 'Roboto',
  },

  body: {
    '--webkit-antialiased-smoothing': 'antialiased',
    backgroundColor: '$gray900',
    color: '$gray100',
    fontSize: '1rem',
    fontWeight: '400',
  },
})
