import { gql } from '@apollo/client';

const INTRO_SECTION_QUERY = gql`
  query FetchIntroSection($id: ID!) {
    introSection(where: { id: $id }) {
      heroTitle
      tagline
      headerTitle
      heroImage {
        url
      }
    }
  }
`;

export default INTRO_SECTION_QUERY;
