import React, { useEffect, useState } from 'react';
import Tilt from 'react-tilt';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { services } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import { useQuery } from '@apollo/client';
import { ABOUT_INFO_QUERY } from '../graphql';

interface IServiceCardProps {
  title: string;
  icon: string;
  index: number;
}

interface AboutInfo {
  info: string;
  mainSkills: string[];
  skillIcons: {
    url: string;
  }[];
}

const ServiceCard = ({ title, icon, index }: IServiceCardProps) => {
  return (
    <Tilt className='xs:w-[250px] w-full'>
      <motion.div
        variants={fadeIn('right', 'spring', 0.5 * index, 0.75)}
        className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
      >
        <div
          // @ts-ignore
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
        >
          <img src={icon} alt={title} className='w-16 h-16 object-contain' />
          <h3 className='text-white text-[20px] font-bold text-center'>
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

const About = () => {
  const { loading, error, data } = useQuery(ABOUT_INFO_QUERY, {
    variables: { id: 'clrnj7wbhmi6c0blcmwioks9u' },
  });
  const [aboutInfo, setAboutInfo] = useState<AboutInfo>();

  // TODO: Add some error handling.
  useEffect(() => {
    if (!loading && error === undefined) {
      setAboutInfo(data.aboutInfo);
    }
  }, [loading, error]);
  return (
    <>
      <motion.div variants={textVariant(0)}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className='mt-4 text-secondary text-[19px] max-w-3xl leading-[30px]'
      >
        {aboutInfo?.info}
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10'>
        {aboutInfo?.mainSkills.map((skill, index) => (
          <ServiceCard
            key={skill}
            index={index}
            title={skill}
            icon={aboutInfo.skillIcons[index].url}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, 'about');
