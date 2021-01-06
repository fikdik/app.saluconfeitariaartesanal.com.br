import React from "react"
import { Container, DefaultLayout } from "../components"
import { graphql } from "gatsby"
import CatalogItem from "../components/CatalogItem"

interface TemplateProps {
  data: {
    products: Array<{
      id: string
      title: string
      slug: string
      loja: string
      category: string
      image: string
      price: number
    }>
    body: string
  }
}

const Template: React.FC<TemplateProps> = ({ data }) => {
  return (
    <Container>
      {data.products.map(product => (
        <CatalogItem key={product.id} product={product} />
      ))}
    </Container>
  )
}

interface QueryDataToAny {
  data: any
}

const PagesLayout: React.FC<QueryDataToAny> = ({ data }) => {
  const { body } = data.mdx
  const products = data.allMdx.edges.map((edge: any) => ({
    ...edge.node.frontmatter,
    id: edge.node.id,
  }))

  return (
    <DefaultLayout>
      <Template
        data={{
          products,
          body,
        }}
      />
    </DefaultLayout>
  )
}

const pageQuery = graphql`
  query($id: String) {
    allMdx(
      filter: { frontmatter: { templateKey: { eq: "produtos" } } }
      sort: { fields: frontmatter___category }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            slug
            loja
            category
            image
            price
          }
        }
      }
    }

    mdx(id: { eq: $id }) {
      body
      frontmatter {
        slug
        title
        metadata {
          title
          description
          dateModified
          datePublished
          image
        }
      }
    }
  }
`

export { pageQuery, Template }

export default PagesLayout
