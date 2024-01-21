import { gql } from '@apollo/client';

const WORK_EXPERIENCE_QUERY = gql`
  query FetchWorkExperience($id: ID!) {
    workExperience(where: { id: $id }) {
      workTitle
      company
      timeAtCompany
      companyIcon {
        url
      }
      workDescription
      iconBg
    }
  }
`;

export default WORK_EXPERIENCE_QUERY;
