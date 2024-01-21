import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import { motion } from 'framer-motion';

import 'react-vertical-timeline-component/style.min.css';
import { styles } from '../styles';
import { experiences } from '../constants';
import { textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { WORK_EXPERIENCE_QUERY } from '../graphql';

interface WorkExprience {
  workTitle: string;
  company: string;
  timeAtCompany: string;
  companyIcon: {
    url: string;
  };
  workDescription: string[];
  iconBg: string[];
}

interface IExperienceCardProps extends WorkExprience {
  index: number;
}

const ExperienceCard = ({
  workTitle,
  company,
  timeAtCompany,
  companyIcon,
  workDescription,
  iconBg,
  index,
}: IExperienceCardProps) => {
  return (
    <VerticalTimelineElement
      contentStyle={{ background: '#1d1836', color: '#fff' }}
      contentArrowStyle={{ borderRight: '7px solid #232631' }}
      date={timeAtCompany}
      iconSytle={{
        background: iconBg[index],
      }}
      icon={
        <div className='flex justify-center items-center w-full h-full bg-slate-100 rounded-full'>
          <img
            src={companyIcon.url}
            alt={company}
            className='w-[60%] h-[60%] object-contain'
          />
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[24px] font-bold'>{workTitle}</h3>
        <p
          className='text-secondary text-[16px] font-semibold'
          style={{ margin: 0 }}
        >
          {company}
        </p>
      </div>
      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {workDescription.map((desc, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-white-100 text-[14px] pl-1 tracking-wider'
          >
            {desc}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const { loading, error, data } = useQuery(WORK_EXPERIENCE_QUERY, {
    variables: { id: 'clrnlt2c4moo60blc3uus2b5m' },
  });
  const [workExperience, setWorkExperience] = useState<WorkExprience[]>();

  // TODO: Add some error handling.
  useEffect(() => {
    if (!loading && error === undefined) {
      setWorkExperience(data.workExperience);
    }
  }, [loading, error]);
  console.log(workExperience);
  return (
    <>
      <motion.div variants={textVariant(0)}>
        <p className={styles.sectionSubText}>What I have done so far</p>
        <h2 className={styles.sectionHeadText}>Work Experience.</h2>
      </motion.div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline>
          {workExperience?.length ? (
            workExperience.map((experience, index) => (
              <ExperienceCard key={index} index={index} {...experience} />
            ))
          ) : (
            <></>
          )}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, 'work');
