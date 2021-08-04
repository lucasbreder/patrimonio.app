import Access from '../components/Access'
import '../styles/globals.css'
import { useRouter } from 'next/router'
import Nav from '../components/Nav'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {

  const path = useRouter()

  if (path.pathname === '/login') {
    return (
      <>
        <ThemeProvider theme={theme.light}>
            <Head>
              <meta charSet="utf-8" />
              <link rel="preconnect" href="https://fonts.gstatic.com"/>
              <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;700;900&display=swap" rel="stylesheet" />
              <title>Login | {process.env.NEXT_PUBLIC_NAME}</title>
          </Head>
          <GlobalStyle/>
          <Component {...pageProps} />
          </ThemeProvider>
      </>
    )
    
  } else {
    return (
      <ThemeProvider theme={theme.light}>
        <Head>
          <meta charSet="utf-8" />
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;700;900&display=swap" rel="stylesheet" />
          <title>{process.env.NEXT_PUBLIC_NAME}</title>
        </Head>
      <Access>
        <GlobalStyle/>
        <SiteContainer>
          <Nav/>
          <Component {...pageProps} />
        </SiteContainer>
        </Access>
      </ThemeProvider>
    )

  }

  

}

export default MyApp

const theme = {
  light: {
    fontFamily: 'Roboto',
    baseColor: '#707070',
    featureColor: '#18669E',
    featureColor2: '#EB713B',
    backgroundColor: '#f2f2f2',
    fadeColor: '#c9c9c9',
    tableBackgroundColor: '#fafafa',
    mobileBreakPoint: '600px',
    gradientColor1: '#18669E',
    gradientColor2: '#467394',
  }
}

const GlobalStyle = createGlobalStyle`
  /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/
html, body {
  min-height: 100%;
  height: 100%;
}
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 15px;
	font: inherit;
	vertical-align: baseline;
  color: #707070;
  font-family: 'Roboto';
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a {
  cursor: pointer;
}
#__next {
  height: 100%;
}
`


const SiteContainer = styled.div`
  display: flex;
  min-height: 100%;

  @media (max-width: ${props => props.theme.mobileBreakPoint}) {
        flex-flow: column;
    }  

`