import React from 'react'
import PropTypes from 'prop-types'
import Link from '../components/Link'
import { fontFace, injectGlobal } from 'react-emotion'
import Box from '../components/Box'
import prismStyles from 'react-live/lib/constants/css'
import Helmet from 'react-helmet'
import 'normalize.css/normalize.css'
import DocWrapper from '../components/DocWrapper'

injectGlobal(
  prismStyles.replace('prism-code', 'prism-code,pre[class*="language-"]')
)

injectGlobal`
html, body, #___gatsby, #___gatsby > div {
  font-family: -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    "Roboto",
    "Roboto Light",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    "Fira Sans",
    "Droid Sans",
    "Helvetica Neue",
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol";
  color: #495057;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  background-color: #f8f9fa;
}
pre[class*="language-"] {
  border-radius: 8px;
  overflow: scroll; 
}
.gatsy-highlight {
  overflow: hidden;
}
* {
  box-sizing: border-box;
}
`

fontFace`
  font-family: 'Oxygen';
  font-style: normal;
  font-weight: 400;
  src: local('Oxygen Regular'), local('Oxygen-Regular'), url(https://fonts.gstatic.com/s/oxygen/v6/qBSyz106i5ud7wkBU-FrPevvDin1pK8aKteLpeZ5c0A.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
`

const StyledLink = Box.withComponent(Link)

const Header = () => (
  <Box bg="#9932CC" p={1}>
    <Box display="flex" flex={1} justify="space-between">
      <Box flex={1}>
        <h1 css={`margin: 0;`}>
          <StyledLink
            to="/"
            color="white"
            p={1}
            css={{
              fontFamily: "'Oxygen', sans-serif"
            }}
          >
            emotion
          </StyledLink>
        </h1>
      </Box>
      <Box flex={1} display="flex" justify="flex-end" css={`overflow: auto;`}>
        <StyledLink p={1} color="white" fontSize={3} to="/try">
          Try
        </StyledLink>
        <StyledLink p={1} color="white" fontSize={3} to="/docs">
          Documentation
        </StyledLink>
        <StyledLink
          p={1}
          color="white"
          fontSize={3}
          to="https://github.com/emotion-js/emotion"
        >
          GitHub
        </StyledLink>
        <StyledLink
          p={1}
          color="white"
          fontSize={3}
          to="https://emotion.now.sh"
        >
          Slack
        </StyledLink>
      </Box>
    </Box>
  </Box>
)

const BaseWrapper = props => (
  <Box flex={1}>
    <Helmet title="emotion" />
    <Header />
    <Box m={[1, 2]}>{props.children}</Box>
  </Box>
)

const TemplateWrapper = props => {
  if (props.location.pathname.match(/\/docs\/.+/)) {
    return (
      <BaseWrapper>
        <DocWrapper sidebarNodes={props.data.allFile.edges}>
          {props.children()}
        </DocWrapper>
      </BaseWrapper>
    )
  }
  return <BaseWrapper>{props.children()}</BaseWrapper>
}

TemplateWrapper.propTypes = {
  children: PropTypes.func
}

export const pageQuery = graphql`
  query TemplateQuery {
    allFile(filter: { extension: { eq: "md" } }) {
      edges {
        node {
          name
          childMarkdownRemark {
            frontmatter {
              title
            }
          }
        }
      }
    }
  }
`

export default TemplateWrapper