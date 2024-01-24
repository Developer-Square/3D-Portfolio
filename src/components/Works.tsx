import Tilt from 'react-tilt';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { github } from '../assets';
import { SectionWrapper } from '../hoc';
import { projects } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { PORTFOLIO_QUERY } from '../graphql';

interface IProjectCardProps {
  index: number;
  projectTitle: string;
  projectDescription: string;
  projectPic: {
    url: string;
  };
  tag: string[];
  tagColor: string[];
  githubLink: string;
}

const ProjectCard = ({
  index,
  projectTitle,
  projectDescription,
  tag,
  tagColor,
  githubLink,
  projectPic,
}: IProjectCardProps) => {
  console.log(projectPic);
  return (
    <motion.div variants={fadeIn('up', 'spring', index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
      >
        <div className='relative w-full h-[230px]'>
          <img
            src={projectPic?.url}
            alt={projectTitle}
            className='w-full h-full object-cover rounded-2xl'
          />

          <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
            <div
              onClick={() => window.open(githubLink, '_blank')}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
            >
              <img
                src={github}
                alt='github'
                className='w-1/2 h-1/2 object-contain'
              />
            </div>
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{projectTitle}</h3>
          <p className='mt-2 text-secondary text-[14px]'>
            {projectDescription}
          </p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {tag.map((name, index) => (
            <p key={name} className={`text-[14px] ${tagColor[index]}`}>
              #{name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  // This filter is used to filter the `PORTFOLIO_QUERY` to get back
  // a list of projects
  const whereFilter = { AND: [] };
  const { loading, error, data } = useQuery(PORTFOLIO_QUERY, {
    variables: { where: whereFilter },
  });
  const [projects, setProjects] = useState<any[]>([]);

  // TODO: Add some error handling.
  useEffect(() => {
    if (!loading && error === undefined) {
      const {
        projectsConnection: { edges },
      } = data;
      setProjects(edges);
    }
  }, [loading, error]);
  console.log(projects);
  return (
    <>
      <motion.div variants={textVariant(0)}>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          The Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {projects.map((project, index) => (
          <ProjectCard
            key={`project-${index}`}
            index={index}
            {...project.node}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, 'projects');
