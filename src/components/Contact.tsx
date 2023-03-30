import { useState, useRef, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

import { styles } from '../styles';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';

interface InputFieldProps {
  formValue: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  labelText: string;
  inputName: string;
  inputType?: string;
  placeholder: string;
  type: 'input' | 'textarea';
}

const InputField = ({
  formValue,
  handleChange,
  labelText,
  inputName,
  placeholder,
  inputType,
  type,
}: InputFieldProps) => {
  return (
    <label className='flex flex-col'>
      <span className='text-white font-medium mb-4'>{labelText}</span>
      {type === 'input' ? (
        <input
          type={inputType}
          name={inputName}
          value={formValue}
          onChange={handleChange}
          placeholder={placeholder}
          className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
        />
      ) : (
        <textarea
          name={inputName}
          rows={7}
          value={formValue}
          onChange={handleChange}
          placeholder={placeholder}
          className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
        />
      )}
    </label>
  );
};

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .send(
        // @ts-ignore
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        // @ts-ignore
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: 'Ryan',
          from_email: form.email,
          to_email: 'kingzoo254.2021@gmail.com',
          message: form.message,
        },
        // @ts-ignore
        import.meta.env.VITE_PUBLIC_ID
      )
      .then(
        (result) => {
          setLoading(false);
          alert('Thank you for your message! I will get back to you soon.');
          setForm({ name: '', email: '', message: '' });
        },
        (error) => {
          setLoading(false);
          alert('Sorry, something went wrong. Please try again later.');
          console.log(error);
        }
      );
  };

  return (
    <div className='xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden'>
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <InputField
            formValue={form.name}
            handleChange={handleChange}
            labelText={'Your Name'}
            inputName={'name'}
            inputType={'text'}
            placeholder={"What's your name?"}
            type={'input'}
          />
          <InputField
            formValue={form.email}
            handleChange={handleChange}
            labelText={'Your Email'}
            inputName={'email'}
            inputType={'email'}
            placeholder={"What's your email?"}
            type={'input'}
          />
          <InputField
            formValue={form.message}
            handleChange={handleChange}
            labelText={'Your Messages'}
            inputName={'message'}
            placeholder={'What do you want to say?'}
            type={'textarea'}
          />
          <button
            type='submit'
            className='bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl'
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, 'contact');
