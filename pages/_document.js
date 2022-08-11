import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" /> 
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> 
        <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville&family=Montserrat:ital,wght@0,300;1,300&family=Roboto&family=Roboto+Slab&family=Send+Flowers&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument