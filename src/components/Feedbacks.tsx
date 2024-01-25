import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';
import { testimonials } from '../constants';
import { useQuery } from '@apollo/client';
import { TESTIMONIAL_QUERY } from '../graphql';

interface IFeedbackCardProps {
  index: number;
  quote: string;
  origin: string;
  originPic: {
    url: string;
  };
}

const FeedbackCard = ({
  index,
  quote,
  origin,
  originPic,
}: IFeedbackCardProps) => {
  return (
    <motion.div
      variants={fadeIn('', 'spring', index * 0.5, 0.75)}
      className='bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full'
    >
      <p className='text-white font-black text-[48px]'>"</p>

      <div className='mt-1'>
        <p className='text-white tracking-wider text-[18px]'>{quote}</p>

        <div className='mt-7 flex justify-between items-center gap-1'>
          <div className='flex-1 flex flex-col'>
            <p className='text-white font-medium text-[16px]'>
              <span className='blue-text-gradient'>@</span> {origin}
            </p>
          </div>

          <img
            src={originPic.url}
            alt={`feedback_by-${origin}`}
            className='w-10 h-10 rounded-full object-cover'
          />
        </div>
      </div>
    </motion.div>
  );
};

const Feedbacks = () => {
  // This filter is used to filter the `TESTIMONIAL_QUERY` to get back
  // a list of projects
  const whereFilter = { AND: [] };
  const { loading, error, data } = useQuery(TESTIMONIAL_QUERY, {
    variables: { where: whereFilter },
  });
  const [testimonials, setTestimonials] = useState<any[]>([]);

  // TODO: Add some error handling.
  useEffect(() => {
    if (!loading && error === undefined) {
      const {
        testimonialsConnection: { edges },
      } = data;
      setTestimonials(edges);
    }
  }, [loading, error]);
  return (
    <div className='mt-12 bg-black-100 rounded-[20px]'>
      <div
        className={`${styles.padding} bg-tertiary rounded-2xl min-h-[300px]`}
      >
        <motion.div variants={textVariant(0)}>
          <p className={styles.sectionSubText}>What others say</p>
          <h2 className={styles.sectionHeadText}>Testimonials.</h2>
        </motion.div>
      </div>

      <div
        className={`sm:px-10 px-6 -mt-20 pb-14 flex justify-center flex-wrap gap-7`}
      >
        {testimonials.map((testimonial, index) => (
          <FeedbackCard
            key={testimonial.name}
            index={index}
            {...testimonial.node}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, '');
