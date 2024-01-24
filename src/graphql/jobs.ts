import { gql } from '@apollo/client';

const WORK_EXPERIENCE_QUERY = gql`
  query FetchWorkExperience($where: WorkExperienceWhereInput) {
    workExperiencesConnection(where: $where) {
      edges {
        node {
          company
          companyIcon {
            url
          }
          iconBg
          timeAtCompany
          workDescription
          workTitle
        }
      }
    }
  }
`;

export default WORK_EXPERIENCE_QUERY;
