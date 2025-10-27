export const linusTorvaldsResume = {
  contact: {
    name: 'Linus Torvalds',
    title: 'Software Engineer · Creator of Linux & Git',
    email: '',
    phone: '',
    location: 'Portland, Oregon, USA',
    website: 'https://github.com/torvalds',
    linkedin: '',
  },
  summary:
    'Finnish-American software engineer who created the Linux kernel in 1991 and Git in 2005. Leads Linux kernel development through distributed collaboration, patch review, and release integration. Recipient of the 2012 Millennium Technology Prize and the 2014 IEEE Computer Pioneer Award.',
  experience: [
    {
      id: 'torvalds-exp-1',
      role: 'Fellow · Linux Kernel Development',
      company: 'The Linux Foundation',
      location: 'USA',
      start: '2007',
      end: '',
      bullets: [
        'Leads mainline Linux kernel integration and release decisions, working with subsystem maintainers worldwide.',
        'Reviews proposed changes with a focus on correctness, maintainability, performance, and compatibility.',
      ],
    },
    {
      id: 'torvalds-exp-2',
      role: 'Fellow · Linux Kernel Development',
      company: 'Open Source Development Labs',
      location: 'USA',
      start: '2003',
      end: '2007',
      bullets: [
        'Worked full-time on Linux kernel development before OSDL became part of the Linux Foundation.',
        'Created Git in 2005 to support distributed Linux kernel development; maintainership later passed to Junio C Hamano.',
      ],
    },
    {
      id: 'torvalds-exp-3',
      role: 'Software Engineer',
      company: 'Transmeta',
      location: 'California, USA',
      start: '1997',
      end: '2003',
      bullets: ['Worked at the processor company while continuing to lead the Linux kernel project.'],
    },
  ],
  education: [
    {
      id: 'torvalds-edu-1',
      degree: 'M.Sc. in Computer Science',
      school: 'University of Helsinki',
      location: 'Helsinki, Finland',
      start: '1988',
      end: '1996',
      details: 'Thesis: Linux: A Portable Operating System',
    },
  ],
  skills:
    'C, Systems programming, Operating systems, Linux kernel development, Git, Distributed version control, Code review, Open-source collaboration',
  projectsLabel: 'Projects',
  projects: [
    {
      id: 'torvalds-project-1',
      name: 'Linux Kernel',
      link: 'https://github.com/torvalds/linux',
      description:
        '1991 · Created the open-source Unix-like kernel and continues to lead mainline development with a worldwide contributor community.',
    },
    {
      id: 'torvalds-project-2',
      name: 'Git',
      link: 'https://git-scm.com/',
      description:
        '2005 · Created a distributed version control system designed for speed, data integrity, and large non-linear development workflows.',
    },
    {
      id: 'torvalds-project-3',
      name: 'Subsurface',
      link: 'https://subsurface-divelog.org/',
      description:
        '2011 · Started an open-source scuba-diving log application; development later continued under Dirk Hohndel and other contributors.',
    },
  ],
}
