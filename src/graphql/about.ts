import { gql } from '@apollo/client';

const ABOUT_QUERY = gql`
	query {
		workAndEducations {
			title
			subtitle
			body
		}
		eventsAndAchievements {
			title
			subtitle
			body
		}
	}
`;

export default ABOUT_QUERY;
