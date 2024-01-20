import { gql } from '@apollo/client';

const JOBS_QUERY = gql`
  query {
    portfolioJobs(orderBy: createdAt_DESC) {
      id
      netlifyLink
      githubLink
      title
      description
      solution
      languages
      usage
      noteableFeatures
      jobImage {
        id
        url
      }
    }
  }
`;

export default JOBS_QUERY;
