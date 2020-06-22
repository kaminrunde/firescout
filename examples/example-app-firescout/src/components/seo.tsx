/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */


type Props = {
  description?: string,
  lang?:string,
  meta?:string,
  title?:string
}

function SEO(p:Props): JSX.Element {
  console.log(p)
  return null
}

export default SEO
