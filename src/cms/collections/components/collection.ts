import { CmsCollection } from "netlify-cms-core"
import header from "./files/header"
import footer from "./files/footer"
import attentionModal from "./files/AttentionModal"

const collection: CmsCollection = {
  label: "Components",
  name: "components",
  extension: "mdx",
  format: "frontmatter",
  media_folder: "../../static/img",
  public_folder: "/img",
  files: [header, footer, attentionModal],
}

export default collection
