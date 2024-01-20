import { gql } from '@apollo/client';

const PORTFOLIO_IMAGES_QUERY = gql`
  query {
    portfolioImages {
      jobImage {
        id
        url
      }
    }
  }
`;

export default PORTFOLIO_IMAGES_QUERY;
