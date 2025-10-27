export const sampleResume = {
  contact: {
    name: 'Aarav Mehta',
    title: 'Frontend Developer',
    email: 'aarav.mehta@example.com',
    phone: '+91 98765 43210',
    location: 'Bengaluru, India',
    website: 'aaravmehta.dev',
    linkedin: 'linkedin.com/in/aaravmehta',
  },
  summary:
    'Frontend developer with 2+ years of experience building accessible, responsive web applications in React. Comfortable owning features end to end, from UI implementation to deployment, with a focus on performance and clean component architecture.',
  experience: [
    {
      id: 'sample-exp-1',
      role: 'Frontend Developer',
      company: 'Nimbus Labs',
      location: 'Bengaluru, India',
      start: 'Jan 2024',
      end: '',
      bullets: [
        'Built and shipped 12+ React features for a customer dashboard used by 8,000+ monthly users.',
        'Reduced the initial bundle size by 34% with route-level code splitting and dependency cleanup.',
        'Introduced reusable form and table components that cut new feature delivery time by roughly 20%.',
      ],
    },
    {
      id: 'sample-exp-2',
      role: 'Web Developer Intern',
      company: 'PixelForge',
      location: 'Remote',
      start: 'Jun 2023',
      end: 'Dec 2023',
      bullets: [
        'Developed responsive marketing pages from Figma specs and raised Lighthouse accessibility scores to 95+.',
        'Automated image optimization and asset compression in the build pipeline.',
      ],
    },
  ],
  education: [
    {
      id: 'sample-edu-1',
      degree: 'B.Tech in Computer Science and Engineering',
      school: 'Vellore Institute of Technology',
      location: 'Vellore, India',
      start: '2019',
      end: '2023',
      details: 'CGPA: 8.6/10 · Web Development Club core member',
    },
  ],
  skills:
    'JavaScript (ES6+), React, TypeScript, HTML5, CSS3, REST APIs, Git, Vite, Jest, Figma',
  projects: [
    {
      id: 'sample-project-1',
      name: 'Travel Explorer',
      link: 'travel-roan-psi.vercel.app',
      description:
        'Responsive travel discovery app with tour listings, search, and booking flows. Built with React, React Router, and Bootstrap.',
    },
    {
      id: 'sample-project-2',
      name: 'Tic Tac Toe',
      link: 'sid2169.github.io/TicTac/',
      description:
        'Themeable browser game with an animated interface, score tracking, and a responsive board.',
    },
    {
      id: 'sample-project-3',
      name: 'Resume Builder',
      link: 'sid2169.github.io/resume-builder/',
      description:
        'ATS-friendly resume editor with a live A4 preview, browser autosave, and PDF export.',
    },
  ],
}
