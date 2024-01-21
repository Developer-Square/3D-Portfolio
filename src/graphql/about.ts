import { gql } from '@apollo/client';

const ABOUT_INFO_QUERY = gql`
  query FetchAboutInfo($id: ID!) {
    aboutInfo(where: { id: $id }) {
      info
      mainSkills
      skillIcons {
        url
      }
    }
  }
`;

export default ABOUT_INFO_QUERY;
