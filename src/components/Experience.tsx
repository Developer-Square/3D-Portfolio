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
  iconBg: string;
}

const ExperienceCard = ({
  workTitle,
  company,
  timeAtCompany,
  companyIcon,
  workDescription,
  iconBg,
}: WorkExprience) => {
  return (
    <VerticalTimelineElement
      contentStyle={{ background: '#1d1836', color: '#fff' }}
      contentArrowStyle={{ borderRight: '7px solid #232631' }}
      date={timeAtCompany}
      iconSytle={{
        background: iconBg,
      }}
      icon={
        <div className='flex justify-center items-center w-full h-full bg-slate-100 rounded-full'>
          <img
            src={companyIcon?.url || ''}
            alt={companyIcon?.url ? company : ''}
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
  const listOfJobIDs = [
    'clrnlt2c4moo60blc3uus2b5m',
    'clrnn5en1myj60bl9zetk81rz',
    'clrrrefma1fo70bl6cg238zpy',
    'clrrrn6xa1hxg0bl6i2figudq',
    'clrrsjitr1rta0blb8ryxbhr0',
  ];

  // This filter is used to filter the `WORK_EXPERIENCE_QUERY` to get back
  // a list of jobs
  const whereFilter = { AND: [{ id_in: listOfJobIDs }] };
  const { loading, error, data } = useQuery(WORK_EXPERIENCE_QUERY, {
    variables: { where: whereFilter },
  });
  const [workExperience, setWorkExperience] = useState<any[]>([]);

  // TODO: Add some error handling.
  useEffect(() => {
    if (!loading && error === undefined) {
      const {
        workExperiencesConnection: { edges },
      } = data;
      setWorkExperience(edges);
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
              <ExperienceCard key={index} {...experience.node} />
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
