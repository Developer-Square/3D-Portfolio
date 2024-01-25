import { gql } from '@apollo/client';

const PORTFOLIO_QUERY = gql`
  query FetchProjects($where: ProjectWhereInput) {
    projectsConnection(where: $where) {
      edges {
        node {
          githubLink
          projectPic {
            url
          }
          projectTitle
          projectDescription
          tag
          tagColor
        }
      }
    }
  }
`;

export default PORTFOLIO_QUERY;
