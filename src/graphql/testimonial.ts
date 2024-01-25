import { gql } from '@apollo/client';

const TESTIMONIAL_QUERY = gql`
  query FetchTestimonials($where: TestimonialWhereInput) {
    testimonialsConnection(where: $where) {
      edges {
        node {
          quote
          origin
          originPic {
            url
          }
        }
      }
    }
  }
`;

export default TESTIMONIAL_QUERY;
